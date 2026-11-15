export interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const DEFAULT_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-060eec10466b4570b47ed67fa1b78a3d';
const BASE_URL = import.meta.env.VITE_DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

export function getDeepSeekApiKey(): string {
  const custom = localStorage.getItem('ratevibe_deepseek_api_key');
  return custom || DEFAULT_API_KEY;
}

export function setDeepSeekApiKey(key: string): void {
  localStorage.setItem('ratevibe_deepseek_api_key', key);
}

/**
 * Call DeepSeek Chat API
 */
export async function chatWithDeepSeek(messages: DeepSeekMessage[]): Promise<string> {
  const apiKey = getDeepSeekApiKey();
  if (!apiKey) {
    throw new Error('未配置 DeepSeek API Key，请在设置中配置');
  }

  const systemPrompt: DeepSeekMessage = {
    role: 'system',
    content: `你是一个世界顶级的美剧与电影权威评分聚合分析专家（RateVibe TV Pro AI 首席影评分析师）。
你的专长：
1. 深入熟知各大权威平台（IMDb、烂番茄 Rotten Tomatoes、Metacritic、豆瓣电影、TMDb）的评分机制、评分差异、影评人共识与大众受众偏好。
2. 极其擅长“辨神作、避烂尾、指毒点”：能够一针见血地指出某部美剧究竟封神在何处（如剧本、表演、镜头、季终神回），或者崩盘在何处（如编剧脱离原著、战力崩坏、故弄玄虚、低俗擦边）。
3. 分析中外审美差异：例如美剧在烂番茄被专业影评人捧上天，但国内豆瓣因为节奏、文化水土不服而两极分化的情况。
4. 回答风格：专业、锐利、客观、幽默、排版清晰，善于用 Markdown 列表、小标题与 Emoji 呈现，给读者最省时间、最具参考价值的看剧指南。`
  };

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API 请求失败 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '抱歉，DeepSeek 未能生成有效回复。';
}

/**
 * On-demand TV show analysis using DeepSeek
 * Returns structured JSON so we can add it to the website dynamically!
 */
export async function analyzeShowWithDeepSeek(showName: string): Promise<any> {
  const apiKey = getDeepSeekApiKey();
  if (!apiKey) {
    throw new Error('未配置 DeepSeek API Key');
  }

  const prompt = `请深度分析美剧《${showName}》，并严格以纯 JSON 格式输出以下结构（禁止输出任何 markdown 代码块外部的文字或说明，直接输出合法的可 JSON.parse 的 JSON 字符串）：
{
  "title": "中文剧名",
  "originalTitle": "英文原名",
  "year": "播映年份如 2022 - 2024",
  "totalSeasons": 季数数字,
  "totalEpisodes": 总集数数字,
  "status": "Ended 或 Returning Series",
  "genres": ["类型1", "类型2", "类型3"],
  "network": "播出流媒体如 HBO / Max, Netflix, Apple TV+, Amazon Prime, Disney+, FX 等",
  "summary": "100字左右的高质量剧情梗概",
  "compositeScore": 综合评分(0.0-10.0浮点数),
  "verdictTier": "masterpiece(封神9.0+) 或 must_watch(必看8.5-8.9) 或 recommended(推荐8.0-8.4) 或 mediocre(平庸7.0-7.9) 或 trap_warning(避雷<7.0) 或 collapse_warning(烂尾)",
  "tagline": "一句话神总结定调",
  "hasEndingCollapse": 是否烂尾断崖布尔值,
  "hasCulturalDivergence": 是否中西审美巨大分歧布尔值,
  "isTrap": 是否避雷烂剧布尔值,
  "badges": ["标签1", "标签2", "标签3"],
  "ratings": {
    "imdb": { "score": 8.5, "maxScore": 10, "normalized": 8.5, "voteCount": 200000, "verdict": "评价标签" },
    "rottenTomatoes": { "score": 90, "maxScore": 100, "normalized": 9.0, "tomatometer": 90, "popcornmeter": 88, "criticsConsensus": "烂番茄官方一句话影评人结论", "verdict": "Certified Fresh" },
    "metacritic": { "score": 80, "maxScore": 100, "normalized": 8.0, "metascore": 80, "userScore": 8.2, "verdict": "Generally Favorable" },
    "douban": { "score": 8.8, "maxScore": 10, "normalized": 8.8, "voteCount": 150000, "verdict": "豆瓣口碑" },
    "tmdb": { "score": 8.2, "maxScore": 10, "normalized": 8.2, "voteCount": 2000 }
  },
  "radarDimensions": {
    "criticPraise": 8.5,
    "popularBuzz": 8.8,
    "chineseTaste": 8.6,
    "plotConsistency": 8.4,
    "endingSatisfaction": 8.0
  },
  "aiInsight": {
    "pros": ["推荐看点1", "推荐看点2", "推荐看点3"],
    "cons": ["劝退毒点1", "劝退毒点2"],
    "audienceFit": "极力推荐适合人群",
    "avoidFit": "建议避开人群"
  }
}`;

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API 请求失败: ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '{}';
  return JSON.parse(text);
}
