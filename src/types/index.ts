export interface PlatformRating {
  score: number;          // 归一化或原始分 (如 IMDb 9.5)
  maxScore: number;       // 满分 (10 或 100)
  normalized: number;     // 统一换算为 10 分制 (0-10)
  voteCount?: number;     // 评分人数
  subScores?: {           // 细分维度 (如烂番茄爆米花、Metacritic用户分等)
    label: string;
    value: number | string;
  }[];
  verdict?: string;       // 平台简评标签 (如 "Certified Fresh", "Universal Acclaim")
}

export interface ReviewComment {
  id: string;
  source: 'douban' | 'rotten_tomatoes' | 'imdb' | 'metacritic';
  author: string;
  avatar?: string;
  rating?: number;        // 1-10 or 1-5
  date: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'mixed';
  likes?: number;
  isCritic?: boolean;     // 是否权威专业影评人
  publication?: string;   // 媒体出处 (e.g. "The Hollywood Reporter", "Rolling Stone")
}

export interface EpisodeRating {
  season: number;
  episode: number;
  title: string;
  score: number;          // 0-10
  votes: number;
  isMilestone?: boolean;  // 是否单集封神 (如 9.9+) 或暴跌 (< 5.0)
}

export interface SeasonInfo {
  seasonNumber: number;
  episodesCount: number;
  averageScore: number;
  episodes: EpisodeRating[];
  trend: 'up' | 'down' | 'stable';
}

export type VerdictTier = 'masterpiece' | 'must_watch' | 'recommended' | 'mediocre' | 'trap_warning' | 'collapse_warning';

export interface TVShow {
  id: string;
  title: string;
  originalTitle: string;
  year: string;
  totalSeasons: number;
  totalEpisodes: number;
  status: 'Ended' | 'Returning Series' | 'Canceled';
  genres: string[];
  network: 'HBO / Max' | 'Netflix' | 'Apple TV+' | 'Amazon Prime' | 'Disney+' | 'AMC' | 'Hulu' | 'FX';
  poster: string;
  backdrop: string;
  summary: string;
  
  // 综合聚合天平指数
  compositeScore: number; // 0-10
  verdictTier: VerdictTier; // 综合评级标签
  tagline: string;        // 一句话总结定调
  
  // 核心预警与标签
  hasEndingCollapse?: boolean;   // 是否断崖式烂尾
  hasCulturalDivergence?: boolean; // 是否中西审美巨大分歧
  isTrap?: boolean;              // 是否大烂剧避雷
  badges: string[];              // 标签列表，如 ["全网封神", "单集满分", "必看神作"]
  
  // 各权威平台评分
  ratings: {
    imdb: PlatformRating;
    rottenTomatoes: PlatformRating & {
      tomatometer: number;       // 专业新鲜度 %
      popcornmeter: number;      // 爆米花观众指数 %
      criticsConsensus: string;  // 烂番茄权威影评人一句话共识
    };
    metacritic: PlatformRating & {
      metascore: number;         // 0-100
      userScore: number;         // 0-10
    };
    douban: PlatformRating & {
      starDistribution?: [number, number, number, number, number]; // 5星到1星占比 %
    };
    tmdb: PlatformRating;
  };
  
  // 雷达图5大维度 (0-10)
  radarDimensions: {
    criticPraise: number;     // 专业口碑 (Metacritic + RT Critic)
    popularBuzz: number;      // 大众热度 (IMDb + TMDB 投票数)
    chineseTaste: number;     // 华语受众口碑 (豆瓣)
    plotConsistency: number;  // 剧情扎实度 / 各季均方差稳定性
    endingSatisfaction: number;// 完结/收尾满意度 (季终集评分)
  };

  // AI 智能分析提炼
  aiInsight: {
    pros: string[];           // 3大推荐必看亮点
    cons: string[];           // 3大劝退避雷毒点
    audienceFit: string;      // 适合人群
    avoidFit: string;         // 避雷人群
  };

  // 各季与各集评分矩阵
  seasons: SeasonInfo[];

  // 精选多源评论
  comments: ReviewComment[];
  
  // 数据更新时间戳
  lastUpdated: string;
}

export interface FilterOptions {
  searchQuery: string;
  genre: string;
  network: string;
  verdictTier: string;
  sortBy: 'composite' | 'imdb' | 'douban' | 'rottenTomatoes' | 'metacritic' | 'divergence' | 'year';
  specialTag: string; // 'all' | 'masterpiece' | 'collapse' | 'divergence' | 'trap'
}
