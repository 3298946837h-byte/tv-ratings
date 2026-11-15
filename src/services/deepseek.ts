export interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type AIProvider = 'auto' | 'github_models' | 'deepseek';

// ----------------------------------------------------
// 0 消耗硬保护锁 (彻底暂停 DeepSeek API 扣费)
// ----------------------------------------------------
let DEEPSEEK_PAUSED = true; // 默认绝对禁止调用 DeepSeek API 扣费

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

// Environment defaults
const DEFAULT_DEEPSEEK_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
const DEEPSEEK_BASE_URL = import.meta.env.VITE_DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const DEFAULT_GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
const GITHUB_MODELS_BASE_URL = 'https://models.inference.ai.azure.com';

// ----------------------------------------------------
// Provider & Key Storage Management
// ----------------------------------------------------

export function getAIProvider(): AIProvider {
  const saved = localStorage.getItem('ratevibe_ai_provider');
  if (saved === 'github_models' || saved === 'deepseek' || saved === 'auto') {
    return saved;
  }
  // 默认锁定 GitHub Models 免费模式，绝不消耗 DeepSeek
  return 'github_models';
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
// Provider Core Invocation Logic
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
    max_tokens: 800,
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

  const ghToken = getGitHubToken();

  // 3. 如果配置了 GitHub Token，调用 GitHub Models 免费配额 (0 费用)
  if (ghToken) {
    try {
      const compressedSystemPrompt: DeepSeekMessage = {
        role: 'system',
        content: `你是美剧权威评分聚合专家。熟悉 IMDb、烂番茄 (Tomatometer/Popcorn)、Metacritic、豆瓣及 TMDb 评分机制。回答聚焦：1.封神看点 2.烂尾暴跌预警 3.中外审美差异。语气犀利精炼，排版带Emoji小标题。`,
      };
      const reply = await callGitHubModels([compressedSystemPrompt, ...messages], false);
      setCachedText(cacheKey, reply);
      return { reply, engineUsed: `GitHub Models (${getGitHubModel()}) 免费配额 (0费用)` };
    } catch (e: any) {
      console.warn('GitHub Models call error:', e);
    }
  }

  // 4. 深度保护拦截：当前已全面开启 DeepSeek 0消耗锁
  if (isDeepSeekPaused()) {
    return {
      reply: `🛡️ **【DeepSeek 零消耗保护锁生效中】**\n\n已为您暂停 DeepSeek API 远程扣费调用，**当前未扣取您账户一分钱**！\n\n- 您可以随时点击上方预设问题，享受我们内置的**离线权威专家库**（0 消耗秒回）；\n- 稍后登录 GitHub 在【AI 引擎配置】填入免费 Token，即可享受每天百余次免费调用！`,
      engineUsed: 'DeepSeek 0消耗保护锁 (已保护)',
    };
  }

  // 如果用户手动取消了暂停，才调用 DeepSeek
  const apiKey = getDeepSeekApiKey();
  const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.6,
      max_tokens: 800,
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || '';
  setCachedText(cacheKey, reply);
  return { reply, engineUsed: 'DeepSeek-V3 官方引擎' };
}

export async function chatWithDeepSeek(messages: DeepSeekMessage[]): Promise<string> {
  const res = await chatWithAI(messages);
  return res.reply;
}

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

  // 1. 如果配置了 GitHub Token (0 费用免费模型)
  const ghToken = getGitHubToken();
  if (ghToken) {
    try {
      const prompt = `请分析影视作品《${cleanName}》，严格返回合法的 JSON 格式（不要有任何额外文字或 markdown 代码块）：
{
  "title": "${cleanName}",
  "originalTitle": "官方原名或英文名",
  "year": "上映年份（如 2026 或 2024）",
  "totalSeasons": 1,
  "totalEpisodes": 1,
  "status": "Ended",
  "genres": ["真实类型1", "真实类型2"],
  "network": "真实出品公司或制作方（如电影写制作公司/发行方，电视剧写平台，绝不可胡编）",
  "summary": "真实准确剧情梗概，写出真实导演、主演与真实背景，绝不可凭空捏造",
  "compositeScore": 8.0,
  "verdictTier": "must_watch",
  "tagline": "一句话真实评价",
  "hasEndingCollapse": false,
  "hasCulturalDivergence": false,
  "isTrap": false,
  "badges": ["AI 权威收录"]
}`;
      const reply = await callGitHubModels([
        { role: 'system', content: '你是专业严肃的全球影视资料专家，实事求是，绝不胡编乱造。如果作品不存在则如实说明。输出合法纯 JSON。' },
        { role: 'user', content: prompt }
      ], true);

      let cleanJson = reply.trim();
      if (cleanJson.startsWith('```json')) cleanJson = cleanJson.substring(7);
      if (cleanJson.startsWith('```')) cleanJson = cleanJson.substring(3);
      if (cleanJson.endsWith('```')) cleanJson = cleanJson.substring(0, cleanJson.length - 3);

      const parsed = JSON.parse(cleanJson.trim());
      setCachedText(cacheKey, JSON.stringify(parsed));
      return parsed;
    } catch (e) {
      console.warn('GitHub Models analyze failed:', e);
    }
  }

  // 2. 如果开启了 DeepSeek 并且配置了 API Key
  if (!isDeepSeekPaused()) {
    const apiKey = getDeepSeekApiKey();
    if (apiKey) {
      try {
        const prompt = `请分析影视作品《${cleanName}》，严格返回合法的 JSON 格式（不要有任何额外文字）：
{
  "title": "${cleanName}",
  "originalTitle": "官方原名或英文名",
  "year": "上映年份",
  "totalSeasons": 1,
  "totalEpisodes": 1,
  "status": "Ended",
  "genres": ["真实类型1", "真实类型2"],
  "network": "真实出品方或发行方（如电影写制片厂/出品公司，电视剧写播出平台，绝不可瞎编）",
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
              { role: 'user', content: prompt }
            ],
            temperature: 0.1,
            response_format: { type: 'json_object' }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || '{}';
          const parsed = JSON.parse(content);
          setCachedText(cacheKey, JSON.stringify(parsed));
          return parsed;
        }
      } catch (e) {
        console.warn('DeepSeek analyze failed:', e);
      }
    }
  }

  return null;
}
