export interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type AIProvider = 'auto' | 'github_models' | 'deepseek';

// ----------------------------------------------------
// 每日一角钱（¥0.10）与安全硬限额标准
// ----------------------------------------------------
export const DAILY_BUDGET_CAP_CNY = 0.10; // 每日消耗绝对上限：一角钱（¥0.10）
export const DAILY_MAX_CALLS = 50;        // 每日最多调用次数：50次
export const COOLDOWN_SECONDS = 5;        // 连续调用防抖冷却时间：5秒
export const MAX_OUTPUT_TOKENS = 500;     // 单次回答严格截断上限：500 Tokens

export interface DeepSeekDailyUsage {
  date: string;              // 日期: YYYY-MM-DD
  callCount: number;         // 今日已调用次数
  promptTokens: number;      // 累计输入 Tokens
  completionTokens: number;  // 累计输出 Tokens
  estimatedCostCNY: number;  // 累计消耗金额（元）
  remainingCostCNY: number;  // 剩余可用额度（元）
  isCircuitBroken: boolean;  // 是否已触发硬熔断保护
}

const USAGE_STORAGE_KEY = 'ratevibe_deepseek_daily_usage';
let lastCallTimestamp = 0;

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * 获取今日 DeepSeek 实时用量与花费统计（跨天自动重置）
 */
export function getDailyUsage(): DeepSeekDailyUsage {
  const today = getTodayDateString();
  try {
    const saved = localStorage.getItem(USAGE_STORAGE_KEY);
    if (saved) {
      const parsed: DeepSeekDailyUsage = JSON.parse(saved);
      if (parsed.date === today) {
        return parsed;
      }
    }
  } catch (e) {}

  const initial: DeepSeekDailyUsage = {
    date: today,
    callCount: 0,
    promptTokens: 0,
    completionTokens: 0,
    estimatedCostCNY: 0,
    remainingCostCNY: DAILY_BUDGET_CAP_CNY,
    isCircuitBroken: false,
  };

  try {
    localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {}
  return initial;
}

/**
 * 记录单次调用的真实 Token 消耗并精确换算人民币扣费
 * DeepSeek-V3 计费标准：输入 ¥1.00 / 百万 Tokens，输出 ¥2.00 / 百万 Tokens
 */
export function recordDeepSeekUsage(promptTokens: number, completionTokens: number): DeepSeekDailyUsage {
  const usage = getDailyUsage();
  const costDelta = (promptTokens * 1.0) / 1000000 + (completionTokens * 2.0) / 1000000;
  const newTotalCost = Number((usage.estimatedCostCNY + costDelta).toFixed(5));
  const newCallCount = usage.callCount + 1;
  const isBroken = newTotalCost >= DAILY_BUDGET_CAP_CNY || newCallCount >= DAILY_MAX_CALLS;

  const updated: DeepSeekDailyUsage = {
    date: usage.date,
    callCount: newCallCount,
    promptTokens: usage.promptTokens + promptTokens,
    completionTokens: usage.completionTokens + completionTokens,
    estimatedCostCNY: newTotalCost,
    remainingCostCNY: Number(Math.max(0, DAILY_BUDGET_CAP_CNY - newTotalCost).toFixed(5)),
    isCircuitBroken: isBroken,
  };

  try {
    localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}

  return updated;
}

/**
 * 重置今日用量统计（供用户测试使用）
 */
export function resetDailyUsage(): void {
  const today = getTodayDateString();
  const reset: DeepSeekDailyUsage = {
    date: today,
    callCount: 0,
    promptTokens: 0,
    completionTokens: 0,
    estimatedCostCNY: 0,
    remainingCostCNY: DAILY_BUDGET_CAP_CNY,
    isCircuitBroken: false,
  };
  localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(reset));
}

// ----------------------------------------------------
// 0 消耗硬保护锁 (彻底暂停 DeepSeek API 扣费)
// ----------------------------------------------------
let DEEPSEEK_PAUSED = false;

export function isDeepSeekPaused(): boolean {
  const saved = localStorage.getItem('ratevibe_deepseek_paused');
  if (saved !== null) {
    return saved === 'true';
  }
  return DEEPSEEK_PAUSED;
}

export function setDeepSeekPaused(paused: boolean): void {
  DEEPSEEK_PAUSED = paused;
  localStorage.setItem('ratevibe_deepseek_paused', String(paused));
}

// ----------------------------------------------------
// 检查当前是否允许发起 DeepSeek 远程扣费调用（熔断 + 冷却）
// ----------------------------------------------------
export function checkCanCallDeepSeek(): { allowed: boolean; reason?: string } {
  if (isDeepSeekPaused()) {
    return {
      allowed: false,
      reason: '🛡️ 已开启 DeepSeek 暂停保护锁，当前不会发生任何远程扣费。',
    };
  }

  const usage = getDailyUsage();
  if (usage.estimatedCostCNY >= DAILY_BUDGET_CAP_CNY) {
    return {
      allowed: false,
      reason: `🛑 【一角钱硬熔断已触发】今日已累计消耗 ¥${usage.estimatedCostCNY.toFixed(3)}（已达每日一角钱 ¥0.10 上限），已物理切断 API 连接以绝对保护您的钱包！明日 00:00 自动恢复。`,
    };
  }

  if (usage.callCount >= DAILY_MAX_CALLS) {
    return {
      allowed: false,
      reason: `🛑 【单日调用频次熔断】今日已调用 ${usage.callCount} 次（已达单日 50 次安全上限），已自动切断远程连接保护资金！`,
    };
  }

  const now = Date.now();
  const elapsedSeconds = (now - lastCallTimestamp) / 1000;
  if (elapsedSeconds < COOLDOWN_SECONDS) {
    const wait = Math.ceil(COOLDOWN_SECONDS - elapsedSeconds);
    return {
      allowed: false,
      reason: `⏳ 操作过快！防抖冷却中，请等待 ${wait} 秒后再发起提问，防止重复扣费。`,
    };
  }

  return { allowed: true };
}

// Environment defaults (默认内置用户专属 Key)
const USER_PRESET_KEY = 'sk-2f4f22b6aeca4ad4b34f0092043ea9f9';
const DEFAULT_DEEPSEEK_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || USER_PRESET_KEY;
const DEEPSEEK_BASE_URL = import.meta.env.VITE_DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const DEFAULT_GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
const GITHUB_MODELS_BASE_URL = 'https://models.inference.ai.azure.com';

export function maskApiKey(key: string): string {
  if (!key || key.length < 10) return '未配置 Key';
  return `${key.slice(0, 7)}••••••••••••${key.slice(-5)}`;
}

// ----------------------------------------------------
// Provider & Key Storage Management
// ----------------------------------------------------

export function getAIProvider(): AIProvider {
  const saved = localStorage.getItem('ratevibe_ai_provider');
  if (saved === 'github_models' || saved === 'deepseek' || saved === 'auto') {
    return saved;
  }
  // 默认使用智能双引擎 (优先缓存/知识库，其次 DeepSeek 官方一角钱熔断通道)
  return 'auto';
}

export function setAIProvider(provider: AIProvider): void {
  localStorage.setItem('ratevibe_ai_provider', provider);
}

export function getDeepSeekApiKey(): string {
  const custom = localStorage.getItem('ratevibe_deepseek_api_key');
  return custom || DEFAULT_DEEPSEEK_KEY;
}

export function setDeepSeekApiKey(key: string): void {
  localStorage.setItem('ratevibe_deepseek_api_key', key);
}

export function getGitHubToken(): string {
  const custom = localStorage.getItem('ratevibe_github_token');
  return custom || DEFAULT_GITHUB_TOKEN;
}

export function setGitHubToken(token: string): void {
  localStorage.setItem('ratevibe_github_token', token);
}

export function getGitHubModel(): string {
  return localStorage.getItem('ratevibe_github_model') || 'gpt-4o-mini';
}

export function setGitHubModel(model: string): void {
  localStorage.setItem('ratevibe_github_model', model);
}

export function isUsingCustomKey(): boolean {
  return (
    Boolean(localStorage.getItem('ratevibe_deepseek_api_key')) ||
    Boolean(localStorage.getItem('ratevibe_github_token'))
  );
}

// ----------------------------------------------------
// Intelligent Multi-Tier Cache (0 tokens on repeat)
// ----------------------------------------------------
function getCachedText(cacheKey: string): string | null {
  try {
    return localStorage.getItem(`rv_cache_${cacheKey}`);
  } catch (e) {
    return null;
  }
}

function setCachedText(cacheKey: string, val: string): void {
  try {
    localStorage.setItem(`rv_cache_${cacheKey}`, val);
  } catch (e) {}
}

// ----------------------------------------------------
// 本地离线高频专家知识库 (0 API 调用，0 费用毫秒级秒回)
// ----------------------------------------------------
const OFFLINE_KNOWLEDGE_BASE: Record<string, string> = {
  '毒师': `👑 **《绝命毒师》与《风骚律师》封神看点全景**

1. **五大权威平台一致封神**：IMDb 9.5（超200万评分）、烂番茄 96%、豆瓣 9.7 分，全网几乎零差评；
2. **教科书级的角色弧光**：老白（Walter White）从窝囊化学教师到冷血帝国毒枭海森堡的蜕变极其自然，每一步心理演进都有逻辑支撑；
3. **单集最高巅峰**：S5E14《奥曼迪亚斯（Ozymandias）》在 IMDb 斩获史无前例的 **10.0 满分**，被誉为电视史单集天花板；
4. **同类慢热封神剧推荐**：《风骚律师》（Better Call Saul，细腻度甚至超越毒师）、《火线》（The Wire，社会学解剖级神剧）、《黑道家族》（The Sopranos）。`,
  '权游': `⚠️ **《权力的游戏》雪崩烂尾深度排查**

1. **断崖暴跌转折点**：
   - **S1~S4 封神期**：乔治·马丁原著底本扎实，豆瓣 9.5+，IMDb 9.0+；
   - **S5~S7 下滑期**：脱离原著主线，剧本由 D&D 掌舵，节奏加快、逻辑开始出现裂痕；
   - **S8 史诗级雪崩**：最终季评分跌入谷底，S8E6 大结局 IMDb 仅 **4.0 分**，超百万人请愿重拍。
2. **雪崩核心原因**：编剧急于接手新项目，强行压缩剧集篇幅，龙妈黑化毫无铺垫、夜王草率领盒饭、布兰坐上铁王座缺乏说服力。`,
  '三体': `⚡ **《三体 (Netflix版)》中外口碑两极分化解析**

1. **海外媒体反馈**：烂番茄新鲜度 **79%**，影评人认为节奏明快、视觉特效顶级、视效概念落地强；
2. **国内豆瓣反馈**：豆瓣仅 **6.9 分**，争议极大；
3. **分歧核心根源**：
   - 角色重组：“牛津五人组”将汪淼、罗辑、章北海、程心拆解为英美年轻学者，国内原著粉难以接受；
   - 哲学纵深削弱：原著中冰冷宏大的“黑暗森林”哲学推演被削弱为通俗美剧式的情感拉扯与快节奏惊悚片。`,
  '避雷': `🚫 **近年高投资翻车美剧避雷红黑榜**

1. **《偶像涡流 (The Idol)》**：烂番茄 19%，HBO 史诗级车祸现场，剧本空洞不知所云；
2. **《秘密入侵 (Secret Invasion)》**：烂番茄 52%，漫威耗资2亿美元，结局草率无序；
3. **《指环王：力量之戒 (The Rings of Power)》**：单季造价高达4.6亿美元，但叙事拖沓、选角与台词争议不断；
4. **《星球大战：侍者 (The Acolyte)》**：烂番茄爆米花仅 18%，粉丝口诛笔伐，已被官方砍剧。`,
  '黑镜': `🎯 **超越《黑镜》的顶级高概念/反乌托邦神剧推荐**

1. **《人生切割术 (Severance)》**（Apple TV+ / IMDb 8.7）：打工人将工作记忆与生活记忆物理分离，反乌托邦悬疑与职场心理惊悚巅峰；
2. **《暗黑 (Dark)》**（Netflix / IMDb 8.7）：德国神剧，史上最严密三季闭环时间悖论与因果宿命论；
3. **《苍穹浩瀚 (The Expanse)》**（Amazon / IMDb 8.5）：硬科幻天花板，太空政治博弈与异星物质交织；
4. **《拾荒者的统治 (Scavengers Reign)》**（Max / 豆瓣 9.3）：异星生态脑洞封神之作。`,
};

function matchOfflineKnowledge(query: string): string | null {
  const q = query.toLowerCase();
  if (q.includes('毒师') || q.includes('风骚律师') || q.includes('慢热')) return OFFLINE_KNOWLEDGE_BASE['毒师'];
  if (q.includes('权力的游戏') || q.includes('权游') || q.includes('烂尾') || q.includes('西部世界')) return OFFLINE_KNOWLEDGE_BASE['权游'];
  if (q.includes('三体')) return OFFLINE_KNOWLEDGE_BASE['三体'];
  if (q.includes('避雷') || q.includes('翻车') || q.includes('偶像涡流')) return OFFLINE_KNOWLEDGE_BASE['避雷'];
  if (q.includes('黑镜') || q.includes('反乌托邦') || q.includes('悬疑') || q.includes('推荐')) return OFFLINE_KNOWLEDGE_BASE['黑镜'];
  return null;
}

// ----------------------------------------------------
// GitHub Models 免费接口调用
// ----------------------------------------------------
export async function callGitHubModels(
  messages: DeepSeekMessage[],
  jsonMode: boolean = false
): Promise<string> {
  const token = getGitHubToken();
  if (!token) {
    throw new Error(
      '未配置 GitHub Token。每个人都可以用自己的 GitHub 账号在 github.com/settings/tokens 免费生成一个个人访问令牌（PAT），每天畅享百次免费 GPT-4o mini 额度！'
    );
  }

  const model = getGitHubModel();
  const bodyPayload: any = {
    model,
    messages,
    temperature: jsonMode ? 0.2 : 0.6,
    max_tokens: 600,
  };

  if (jsonMode) {
    bodyPayload.response_format = { type: 'json_object' };
  }

  const response = await fetch(`${GITHUB_MODELS_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub Models 免费接口调用失败 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// ----------------------------------------------------
// 执行受严格熔断与单次截断保护的 DeepSeek 官方请求
// ----------------------------------------------------
async function executeGuardedDeepSeekCall(messages: DeepSeekMessage[]): Promise<{ reply: string; engineUsed: string }> {
  // 1. 硬熔断与冷却预检
  const check = checkCanCallDeepSeek();
  if (!check.allowed) {
    return {
      reply: check.reason || '已触发保护阻断。',
      engineUsed: '🛡️ 一角钱安全熔断器 (已保护资金)',
    };
  }

  lastCallTimestamp = Date.now();
  const apiKey = getDeepSeekApiKey();

  // 2. 压缩 System Prompt，严控上下文与输入 Token 长度
  const compressedMessages: DeepSeekMessage[] = [
    {
      role: 'system',
      content:
        '你是美剧与电影权威评分口碑专家。根据IMDb、烂番茄、Metacritic、豆瓣及TMDb数据，聚焦神作看点、烂尾暴跌预警与中外审美差异。语气精炼犀利，字数严格控制在300字内。',
    },
    ...messages.filter((m) => m.role !== 'system'),
  ];

  const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: compressedMessages,
      temperature: 0.5,
      max_tokens: MAX_OUTPUT_TOKENS, // 严格限制 500 tokens
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API 请求失败 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || '';
  const pTokens = data.usage?.prompt_tokens || 140;
  const cTokens = data.usage?.completion_tokens || 320;

  // 3. 记录真实精确消费并更新每日用量统计
  const updatedUsage = recordDeepSeekUsage(pTokens, cTokens);
  const thisCallCost = Number(((pTokens * 1.0) / 1000000 + (cTokens * 2.0) / 1000000).toFixed(4));

  return {
    reply,
    engineUsed: `DeepSeek-V3 官方引擎 (本次消耗 ¥${thisCallCost} · 今日累计 ¥${updatedUsage.estimatedCostCNY.toFixed(4)} / 上限¥0.10)`,
  };
}

// ----------------------------------------------------
// Public APIs (Dual-Engine with 0-Consumption Protection)
// ----------------------------------------------------

export async function chatWithAI(messages: DeepSeekMessage[]): Promise<{ reply: string; engineUsed: string }> {
  const userQuery = messages[messages.length - 1]?.content || '';
  const cacheKey = `chat_${userQuery.trim().toLowerCase().slice(0, 100)}`;

  // 1. 本地缓存命中 (0 tokens / 0 费用)
  const cached = getCachedText(cacheKey);
  if (cached) {
    return { reply: cached, engineUsed: '本地毫秒级缓存 (0消耗)' };
  }

  // 2. 本地离线专家库拦截 (0 API 调用 / 0 费用)
  const offlineMatch = matchOfflineKnowledge(userQuery);
  if (offlineMatch) {
    setCachedText(cacheKey, offlineMatch);
    return { reply: offlineMatch, engineUsed: '内置权威专家库 (0消耗秒回)' };
  }

  const provider = getAIProvider();

  // 3. 如果显式选择 GitHub Models 或配置了 Token 且处于 auto 模式，调用 GitHub Models 免费配额
  if (provider === 'github_models') {
    const ghToken = getGitHubToken();
    if (ghToken) {
      try {
        const compressedSystemPrompt: DeepSeekMessage = {
          role: 'system',
          content: `你是美剧权威评分聚合专家。熟悉 IMDb、烂番茄 (Tomatometer/Popcorn)、Metacritic、豆瓣及 TMDb 评分机制。回答聚焦：1.封神看点 2.烂尾暴跌预警 3.中外审美差异。语气犀利精炼，字数控制在300字内。`,
        };
        const reply = await callGitHubModels([compressedSystemPrompt, ...messages], false);
        setCachedText(cacheKey, reply);
        return { reply, engineUsed: `GitHub Models (${getGitHubModel()}) 免费配额 (0费用)` };
      } catch (e: any) {
        console.warn('GitHub Models call error:', e);
      }
    }
  }

  // 4. 调用经过一角钱硬熔断保护的 DeepSeek 官方通道
  try {
    const res = await executeGuardedDeepSeekCall(messages);
    if (!res.engineUsed.includes('一角钱安全熔断器')) {
      setCachedText(cacheKey, res.reply);
    }
    return res;
  } catch (err: any) {
    return {
      reply: `⚠️ DeepSeek 响应异常: ${err.message || '网络连接超时'}`,
      engineUsed: '连接异常保护',
    };
  }
}

export async function chatWithDeepSeek(messages: DeepSeekMessage[]): Promise<string> {
  const res = await chatWithAI(messages);
  return res.reply;
}

/**
 * 剧目智能分析与归档（仅在用户手动点击添加新剧时调用，受一角钱熔断保护）
 */
export async function analyzeShowWithDeepSeek(showName: string): Promise<any> {
  const cleanName = showName.trim().replace(/[《》]/g, '');
  if (!cleanName) return null;
  const normName = cleanName.toLowerCase();
  const cacheKey = `show_${normName}`;

  const cached = getCachedText(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  // 熔断预检
  const check = checkCanCallDeepSeek();
  if (!check.allowed) {
    console.warn('DeepSeek analyze blocked by quota/pause limiter:', check.reason);
    return null;
  }

  const apiKey = getDeepSeekApiKey();
  if (!apiKey) return null;

  try {
    lastCallTimestamp = Date.now();
    const prompt = `请分析影视作品《${cleanName}》，严格返回合法的 JSON 格式（不要有任何额外文字）：
{
  "title": "${cleanName}",
  "originalTitle": "官方原名或英文名",
  "year": "上映年份",
  "totalSeasons": 1,
  "totalEpisodes": 1,
  "status": "Ended",
  "genres": ["真实类型1", "真实类型2"],
  "network": "真实出品方或发行方（电影写制片厂/出品公司，电视剧写播出平台，绝不可瞎编）",
  "summary": "真实准确剧情梗概，写出真实导演与主演，绝不可胡编乱造",
  "compositeScore": 8.0,
  "verdictTier": "must_watch",
  "tagline": "一句话真实定位",
  "hasEndingCollapse": false,
  "hasCulturalDivergence": false,
  "isTrap": false,
  "badges": ["DeepSeek 智能识别"]
}`;

    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是严肃权威的全球影视资料专家，实事求是，绝不胡编乱造。输出合法纯 JSON。' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 450,
        response_format: { type: 'json_object' },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const pTokens = data.usage?.prompt_tokens || 120;
      const cTokens = data.usage?.completion_tokens || 200;
      recordDeepSeekUsage(pTokens, cTokens);

      const content = data.choices?.[0]?.message?.content || '{}';
      const parsed = JSON.parse(content);
      setCachedText(cacheKey, JSON.stringify(parsed));
      return parsed;
    }
  } catch (e) {
    console.warn('DeepSeek analyze failed:', e);
  }

  return null;
}
