import type { TVShow } from '../types';

export const SHOWS_DATA: TVShow[] = [
  // 1. 绝命毒师
  {
    id: 'breaking-bad',
    title: '绝命毒师',
    originalTitle: 'Breaking Bad',
    year: '2008 - 2013',
    totalSeasons: 5,
    totalEpisodes: 62,
    status: 'Ended',
    genres: ['犯罪', '剧情', '惊悚'],
    network: 'AMC',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '高中化学老师沃尔特·怀特得知自己身患绝症后，为了给家人留下财富，铤而走险与昔日学生杰西·平克曼联手制毒，一步步黑化成为帝国毒枭海森堡的史诗悲剧。',
    compositeScore: 9.6,
    verdictTier: 'masterpiece',
    tagline: '现代电视剧艺术的终极巅峰，全网各大权威平台零差评无争议神剧。',
    badges: ['全网封神', '单集10分满分', '吉尼斯最高评分剧', '无烂尾完结'],
    ratings: {
      imdb: { score: 9.5, maxScore: 10, normalized: 9.5, voteCount: 2200000, verdict: 'Top 250 #1' },
      rottenTomatoes: {
        score: 96,
        maxScore: 100,
        normalized: 9.6,
        tomatometer: 96,
        popcornmeter: 97,
        criticsConsensus: '以极具视觉冲击力的镜头、精密严谨的化学逻辑和布莱恩·科兰斯顿神级演技，完成了美剧史上最震撼的心灵黑化转变。',
        verdict: 'Certified Fresh'
      },
      metacritic: { score: 96, maxScore: 100, normalized: 9.6, metascore: 96, userScore: 9.7, verdict: 'Universal Acclaim' },
      douban: { score: 9.7, maxScore: 10, normalized: 9.7, voteCount: 580000, verdict: '豆瓣美剧前三', starDistribution: [85, 12, 2.5, 0.3, 0.2] },
      tmdb: { score: 8.9, maxScore: 10, normalized: 8.9, voteCount: 14200 }
    },
    radarDimensions: { criticPraise: 9.7, popularBuzz: 9.9, chineseTaste: 9.8, plotConsistency: 9.9, endingSatisfaction: 10.0 },
    aiInsight: {
      pros: ['剧情环环相扣，每一季评分都在递增，第5季全面封神', '主角性格蜕变心理描写登峰造极', '5x14《奥曼迪亚斯》在 IMDb 获数十万人打出 10.0 满分奇迹'],
      cons: ['第1季前几集节奏略偏沉静慢热', '主角暗黑走向后期极具压抑窒息感'],
      audienceFit: '喜欢精密剧本构架、硬核犯罪与严肃心理悬疑的观众。',
      avoidFit: '寻找无脑爆米花爽剧、反感情绪压抑的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 7,
        averageScore: 8.8,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'Pilot', score: 9.0, votes: 35000 },
          { season: 1, episode: 6, title: "Crazy Handful of Nothin'", score: 9.3, votes: 32000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 5,
        episodesCount: 16,
        averageScore: 9.8,
        trend: 'up',
        episodes: [
          { season: 5, episode: 14, title: 'Ozymandias', score: 10.0, votes: 215000, isMilestone: true },
          { season: 5, episode: 16, title: 'Felina', score: 9.9, votes: 142000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c1', source: 'douban', author: '亵渎电影', rating: 10, date: '2013-10-01', content: '神作这个词被滥用了，但《绝命毒师》绝对配得上这个称号。收尾干净利落，教科书级别的剧作。', sentiment: 'positive', likes: 12400 },
      { id: 'c2', source: 'rotten_tomatoes', author: 'Matt Zoller Seitz', publication: 'New York Magazine', isCritic: true, date: '2013-09-30', content: 'Breaking Bad is one of the greatest artistic achievements in television history.', sentiment: 'positive', likes: 8900 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 2. 企鹅人 (2024最新神作)
  {
    id: 'the-penguin',
    title: '企鹅人',
    originalTitle: 'The Penguin',
    year: '2024',
    totalSeasons: 1,
    totalEpisodes: 8,
    status: 'Ended',
    genres: ['犯罪', '剧情'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1600&auto=format&fit=crop&q=80',
    summary: '《新蝙蝠侠》衍生黑帮史诗，聚焦哥谭地下黑道权力真空期，奥斯瓦尔德·科波特在谎言、背叛与残忍心计中一步步登顶哥谭黑道皇帝的无情历程。',
    compositeScore: 9.0,
    verdictTier: 'masterpiece',
    tagline: '2024年度最炸裂黑帮神作，《黑道家族》在哥谭市的完美转世！',
    badges: ['2024年度黑马', '哥谭黑帮史诗', '柯林·法瑞尔封神', 'HBO牌面'],
    ratings: {
      imdb: { score: 8.8, maxScore: 10, normalized: 8.8, voteCount: 165000, verdict: 'IMDb 8.8' },
      rottenTomatoes: {
        score: 95,
        maxScore: 100,
        normalized: 9.5,
        tomatometer: 95,
        popcornmeter: 91,
        criticsConsensus: '以冷血无情的写实基调与克里斯汀·米利欧缇、柯林·法瑞尔震撼人心的表演，将漫画改编剧升华为纯正的黑帮悲剧经典。',
        verdict: 'Certified Fresh'
      },
      metacritic: { score: 85, maxScore: 100, normalized: 8.5, metascore: 85, userScore: 8.4, verdict: 'Universal Acclaim' },
      douban: { score: 8.8, maxScore: 10, normalized: 8.8, voteCount: 92000, starDistribution: [55, 33, 10, 1.5, 0.5] },
      tmdb: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 1600 }
    },
    radarDimensions: { criticPraise: 9.4, popularBuzz: 9.5, chineseTaste: 8.9, plotConsistency: 9.3, endingSatisfaction: 9.2 },
    aiInsight: {
      pros: ['柯林·法瑞尔毁容式演技叹为观止，索菲亚·法尔科内女性教父魅力惊艳', '全剧没有任何蝙蝠侠出场，纯靠扎实深刻的黑帮家族博弈撑起满堂彩', '第4集精神病院回溯与终集冷酷背叛极具戏剧冲击力'],
      cons: ['主角奥兹纯粹恶人全无正义感，结局极度冷血残酷让部分受众心理不适', '基调灰暗压抑，缺乏传统超英打斗特效场面'],
      audienceFit: '《黑道家族》《教父》《绝命毒师》拥趸、严肃现实主义暗黑剧作爱好者。',
      avoidFit: '期待蝙蝠侠正义登场、想看绚丽超能力打斗的爆米花观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 9.0,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'After Hours', score: 8.7, votes: 24000 },
          { season: 1, episode: 4, title: 'Cent\'Anni', score: 9.5, votes: 35000, isMilestone: true },
          { season: 1, episode: 8, title: 'A Great or Little Thing', score: 9.3, votes: 28000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_peng_1', source: 'douban', author: '木子李', rating: 10, date: '2024-11-11', content: '最后一集杀维克托那一幕，真正展现了什么叫纯粹的恶魔！不洗白、不圣母，今年最狠的美剧！', sentiment: 'positive', likes: 8900 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 3. 幕府将军 (2024艾美奖创纪录)
  {
    id: 'shogun',
    title: '幕府将军',
    originalTitle: 'Shōgun',
    year: '2024',
    totalSeasons: 1,
    totalEpisodes: 10,
    status: 'Returning Series',
    genres: ['历史', '剧情', '战争', '冒险'],
    network: 'FX',
    poster: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=80',
    summary: '1600年战国关原之战前夕，被孤立的吉井虎长领主面临摄政委员会的死局，一艘遭遇风暴搁浅的英国水手引爆了东西方文化碰撞与权力棋局。',
    compositeScore: 9.1,
    verdictTier: 'must_watch',
    tagline: '2024艾美奖创纪录横扫18座大奖，顶级视听与东方权谋的极致呈现。',
    badges: ['2024现象级', '艾美奖历史第一', '东方权谋', '真田广之封神'],
    ratings: {
      imdb: { score: 8.7, maxScore: 10, normalized: 8.7, voteCount: 195000, verdict: '欧美评价极高' },
      rottenTomatoes: { score: 99, maxScore: 100, normalized: 9.9, tomatometer: 99, popcornmeter: 90, criticsConsensus: '以深邃的文化尊重与惊心动魄的心计博弈，重塑了跨文化影视改编标杆。', verdict: 'Certified Fresh (99%)' },
      metacritic: { score: 85, maxScore: 100, normalized: 8.5, metascore: 85, userScore: 8.2 },
      douban: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 110000, starDistribution: [45, 38, 14, 2, 1] },
      tmdb: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 1800 }
    },
    radarDimensions: { criticPraise: 9.8, popularBuzz: 9.2, chineseTaste: 8.5, plotConsistency: 9.2, endingSatisfaction: 8.9 },
    aiInsight: {
      pros: ['服化道极为考究严谨，日本本土演职员主导创作打破西方东方主义刻板', '真田广之与泽井杏奈表演细腻动人，深谙不战而屈人之兵的博弈精髓'],
      cons: ['结局非好莱坞大军肉搏，而是文戏权力交割，部分期待血浆大场面的观众稍感平淡'],
      audienceFit: '喜欢严肃历史权谋、东方审美与深度心计较量的观众。',
      avoidFit: '追求纯爆米花千军万马血腥劈砍的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 10,
        averageScore: 8.8,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'Anjin', score: 8.7, votes: 22000 },
          { season: 1, episode: 9, title: 'Crimson Sky', score: 9.5, votes: 31000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c11', source: 'douban', author: '同志亦凡人中文站', rating: 9, date: '2024-04-24', content: '红天计划原来是一场如此深沉的人性棋局。', sentiment: 'positive', likes: 6400 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 4. 辐射 (2024废土黑马)
  {
    id: 'fallout',
    title: '辐射',
    originalTitle: 'Fallout',
    year: '2024 - ',
    totalSeasons: 1,
    totalEpisodes: 8,
    status: 'Returning Series',
    genres: ['科幻', '动作', '冒险', '黑色幽默'],
    network: 'Amazon Prime',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80',
    summary: '核战争爆发200年后，天真的避难所女孩为了寻找父亲踏上充满怪兽、食尸鬼牛仔与钢铁兄弟会的荒诞废土。',
    compositeScore: 8.7,
    verdictTier: 'must_watch',
    tagline: '游戏改编影视新标杆，复古未来主义与荒诞血腥幽默的完美碰撞。',
    badges: ['高分漫改/游改', '2024黑马爆款', '废土朋克', '零门槛入坑'],
    ratings: {
      imdb: { score: 8.4, maxScore: 10, normalized: 8.4, voteCount: 220000, verdict: 'IMDb 8.4' },
      rottenTomatoes: { score: 94, maxScore: 100, normalized: 9.4, tomatometer: 94, popcornmeter: 90, criticsConsensus: '完美还原荒诞讽刺的黑色幽默与复古末日美学。', verdict: 'Certified Fresh' },
      metacritic: { score: 73, maxScore: 100, normalized: 7.3, metascore: 73, userScore: 7.7 },
      douban: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 135000, starDistribution: [46, 38, 14, 1.5, 0.5] },
      tmdb: { score: 8.3, maxScore: 10, normalized: 8.3, voteCount: 2600 }
    },
    radarDimensions: { criticPraise: 8.9, popularBuzz: 9.6, chineseTaste: 8.7, plotConsistency: 8.9, endingSatisfaction: 9.0 },
    aiInsight: {
      pros: ['沃顿·戈金斯饰演的食尸鬼牛仔魅力四射', '50年代爵士选曲与血腥反差爽度极高', '非玩家观众毫无门槛也能看得很爽'],
      cons: ['部分血腥断肢镜头尺度较大', '个别游戏旧设定变动引粉丝微词'],
      audienceFit: '废土末日、黑色幽默、游改影视爱好者。',
      avoidFit: '晕血、抗拒B级片断肢血浆的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 8.6,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'The End', score: 8.5, votes: 26000 },
          { season: 1, episode: 8, title: 'The Beginning', score: 9.1, votes: 32000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c17', source: 'douban', author: '疯狗阿瑟', rating: 9, date: '2024-04-12', content: '游改剧天花板！乔纳森·诺兰终于找回了他的最佳状态！', sentiment: 'positive', likes: 11200 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 5. 熊家餐馆 (The Bear)
  {
    id: 'the-bear',
    title: '熊家餐馆',
    originalTitle: 'The Bear',
    year: '2022 - ',
    totalSeasons: 3,
    totalEpisodes: 28,
    status: 'Returning Series',
    genres: ['剧情', '喜剧'],
    network: 'FX',
    poster: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80',
    summary: '顶级米其林主厨卡米在哥哥自杀后回到芝加哥接手破旧的三明治小店，在厨房的尖叫、混乱、债务与创伤中寻找救赎与卓越。',
    compositeScore: 9.2,
    verdictTier: 'must_watch',
    tagline: '焦虑症候群的极致视听展现，第2季第6集家庭晚宴长达一小时封神！',
    badges: ['艾美奖大赢家', '一镜到底神回', '窒息感剧作', '高口碑黑马'],
    ratings: {
      imdb: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 260000, verdict: '艾美奖大热' },
      rottenTomatoes: { score: 96, maxScore: 100, normalized: 9.6, tomatometer: 96, popcornmeter: 90, criticsConsensus: '以令人心跳加速的窒息节奏与饱满深情的人性共振，构筑了现代职场剧的巅峰。', verdict: 'Certified Fresh' },
      metacritic: { score: 88, maxScore: 100, normalized: 8.8, metascore: 88, userScore: 8.2 },
      douban: { score: 8.9, maxScore: 10, normalized: 8.9, voteCount: 160000, starDistribution: [54, 34, 10, 1.5, 0.5] },
      tmdb: { score: 8.4, maxScore: 10, normalized: 8.4, voteCount: 2100 }
    },
    radarDimensions: { criticPraise: 9.7, popularBuzz: 9.2, chineseTaste: 9.0, plotConsistency: 9.1, endingSatisfaction: 9.0 },
    aiInsight: {
      pros: ['摇滚乐选曲与快速剪辑极具沉浸感，仿佛亲身置身嘈杂后厨', '2x06《七鱼宴》全明星客串与2x07《叉子》堂兄蜕变被誉为现代电视剧单集奇迹'],
      cons: ['厨房吼叫撕扯与窒息压迫感极强，容易诱发打工人焦虑症候群', '第三季节奏偏意识流，口碑轻微两极分化'],
      audienceFit: '喜欢快节奏高密度情绪共鸣、重视配乐与深度人性救赎的观众。',
      avoidFit: '追求宁静慢生活、反感吵闹吼叫与持续焦虑的观众。'
    },
    seasons: [
      {
        seasonNumber: 2,
        episodesCount: 10,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 2, episode: 6, title: 'Fishes', score: 9.7, votes: 45000, isMilestone: true },
          { season: 2, episode: 7, title: 'Forks', score: 9.7, votes: 48000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_bear_1', source: 'douban', author: '陀螺', rating: 10, date: '2023-06-25', content: '叉子那一集真的哭惨了！每一个人都有被拯救和找到尊严的权利。', sentiment: 'positive', likes: 9800 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 6. 驯鹿宝贝 (2024现象级黑马)
  {
    id: 'baby-reindeer',
    title: '驯鹿宝贝',
    originalTitle: 'Baby Reindeer',
    year: '2024',
    totalSeasons: 1,
    totalEpisodes: 7,
    status: 'Ended',
    genres: ['剧情', '惊悚', '传记'],
    network: 'Netflix',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
    summary: '根据主演理查德·加德真实创伤经历改编，落魄喜剧演员在酒吧善意为一位哭泣的女子递上一杯免费红茶，却引来长达数年、数万封邮件的病态跟踪骚扰。',
    compositeScore: 8.8,
    verdictTier: 'must_watch',
    tagline: '2024横扫艾美奖的真实心理惊悚自省，直面病态跟踪与受害者的隐秘自毁。',
    badges: ['2024全球现象级', '真实经历改编', '自毁心理剖析', '艾美奖大满贯'],
    ratings: {
      imdb: { score: 7.8, maxScore: 10, normalized: 7.8, voteCount: 160000, verdict: '口碑两极但话题巨大' },
      rottenTomatoes: { score: 98, maxScore: 100, normalized: 9.8, tomatometer: 98, popcornmeter: 82, criticsConsensus: '以极度勇敢的自省姿态，将复杂的心理依附与创伤循环解构得淋漓尽致。', verdict: 'Certified Fresh' },
      metacritic: { score: 88, maxScore: 100, normalized: 8.8, metascore: 88, userScore: 8.1 },
      douban: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 120000, starDistribution: [48, 38, 12, 1.5, 0.5] },
      tmdb: { score: 7.7, maxScore: 10, normalized: 7.7, voteCount: 890 }
    },
    radarDimensions: { criticPraise: 9.6, popularBuzz: 9.7, chineseTaste: 8.7, plotConsistency: 9.0, endingSatisfaction: 8.6 },
    aiInsight: {
      pros: ['不同于传统非黑即白的变态跟踪狂猎奇，而是深刻揭露了男主渴望被关注的心理暗面', '第4集残酷独白与第6集舞台精神崩溃直击灵魂'],
      cons: ['剧情心理压抑感极其强烈，甚至让人感到生理不适', '现实中引发对真实原型的网络人肉搜索争议'],
      audienceFit: '心理悬疑、纪实传记与深刻人性自省剧迷。',
      avoidFit: '心理承受脆弱、易感到情感窒息的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 7,
        averageScore: 8.5,
        trend: 'up',
        episodes: [
          { season: 1, episode: 4, title: 'Episode 4', score: 9.2, votes: 32000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_baby_1', source: 'douban', author: '影志', rating: 9, date: '2024-04-20', content: '他不仅是在控诉跟踪狂，更是在把自己的伤口一刀刀割开给全世界看。太勇敢了！', sentiment: 'positive', likes: 7200 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 7. 流人 (Slow Horses)
  {
    id: 'slow-horses',
    title: '流人',
    originalTitle: 'Slow Horses',
    year: '2022 - ',
    totalSeasons: 4,
    totalEpisodes: 24,
    status: 'Returning Series',
    genres: ['悬疑', '惊悚', '剧情', '谍战'],
    network: 'Apple TV+',
    poster: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80',
    summary: '英国军情五处冷宫“斯劳屋”里，聚集着一群犯过严重低级错误被流放的落魄特工。在邋遢恶毒老间谍兰姆的领导下，这群卢瑟往往卷入最危险的绝密阴谋。',
    compositeScore: 9.1,
    verdictTier: 'must_watch',
    tagline: '加里·奥德曼封神发挥，反套路英伦黑色幽默冷战硬核谍战天花板！',
    badges: ['每季评分飙升', '加里·奥德曼封神', '英伦谍战', 'Apple头牌'],
    ratings: {
      imdb: { score: 8.3, maxScore: 10, normalized: 8.3, voteCount: 120000, verdict: '稳定高分' },
      rottenTomatoes: { score: 98, maxScore: 100, normalized: 9.8, tomatometer: 98, popcornmeter: 93, criticsConsensus: '狡黠机智、毒舌入骨，以冷酷且具颠覆性的幽默重写了冷战特工类型片。', verdict: 'Certified Fresh (第四季100%)' },
      metacritic: { score: 84, maxScore: 100, normalized: 8.4, metascore: 84, userScore: 8.5 },
      douban: { score: 9.1, maxScore: 10, normalized: 9.1, voteCount: 88000, starDistribution: [60, 31, 8, 0.8, 0.2] },
      tmdb: { score: 8.2, maxScore: 10, normalized: 8.2, voteCount: 1100 }
    },
    radarDimensions: { criticPraise: 9.5, popularBuzz: 8.5, chineseTaste: 9.2, plotConsistency: 9.6, endingSatisfaction: 9.4 },
    aiInsight: {
      pros: ['加里·奥德曼把放屁抠脚又大智若愚的老特工演得活灵活现，台词毒舌至极', '剧情反转凌厉绝不注水，每一季6集短小精悍毫不拖沓'],
      cons: ['需要适应英式冷幽默与英国情报机构内部层级官僚政治'],
      audienceFit: '喜欢约翰·勒卡雷硬核冷战谍战、毒舌老戏骨与反英雄题材的观众。',
      avoidFit: '习惯007或碟中谍那种香车美女高科技爽快神枪手设定的观众。'
    },
    seasons: [
      {
        seasonNumber: 3,
        episodesCount: 6,
        averageScore: 9.0,
        trend: 'up',
        episodes: [
          { season: 3, episode: 6, title: 'Footprints', score: 9.2, votes: 15000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_slow_1', source: 'douban', author: '陆支羽', rating: 9, date: '2023-12-28', content: '狗爷的演技太神了，每一个眼神都是戏，英伦谍战的一股清流！', sentiment: 'positive', likes: 5800 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 8. 双城之战 (Arcane)
  {
    id: 'arcane',
    title: '英雄联盟：双城之战',
    originalTitle: 'Arcane',
    year: '2021 - 2024',
    totalSeasons: 2,
    totalEpisodes: 18,
    status: 'Ended',
    genres: ['动画', '科幻', '动作', '冒险', '剧情'],
    network: 'Netflix',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '繁华的上城皮尔特沃夫与破败压抑的地下城祖安之间矛盾激化，一对在贫民窟中长大的姐妹蔚与金克丝，在魔法科技革命与阶级仇恨的撕扯下走向殊途同归的悲剧宿命。',
    compositeScore: 9.4,
    verdictTier: 'masterpiece',
    tagline: '全球动画剧集与游戏改编历史天花板，全网权威平台零死角封神！',
    badges: ['全网封神', '动画历史天花板', '艾美奖大满贯', '视听震撼'],
    ratings: {
      imdb: { score: 9.0, maxScore: 10, normalized: 9.0, voteCount: 310000, verdict: 'Top 250 动画第一' },
      rottenTomatoes: { score: 100, maxScore: 100, normalized: 10.0, tomatometer: 100, popcornmeter: 96, criticsConsensus: '惊为天人的艺术美学、震撼人心的交响乐与深邃的角色悲剧，将动画提升到了艺术巅峰。', verdict: 'Certified Fresh (100%)' },
      metacritic: { score: 90, maxScore: 100, normalized: 9.0, metascore: 90, userScore: 9.1 },
      douban: { score: 9.1, maxScore: 10, normalized: 9.1, voteCount: 280000, starDistribution: [64, 26, 8, 1.2, 0.8] },
      tmdb: { score: 8.8, maxScore: 10, normalized: 8.8, voteCount: 4200 }
    },
    radarDimensions: { criticPraise: 9.9, popularBuzz: 9.8, chineseTaste: 9.3, plotConsistency: 9.5, endingSatisfaction: 9.3 },
    aiInsight: {
      pros: ['法式手绘与3D微表情渲染每一帧都达到壁纸艺术品水准', '顶级流行歌手原声带与叙事镜头无缝融合，情绪感染力炸裂', '非游戏玩家也能完全被金克丝与蔚的姐妹羁绊深深打动'],
      cons: ['世界观庞大人物众多，前两集需要适应双城设定'],
      audienceFit: '所有对顶级视觉美学、深刻角色悲剧与高规格制作有追求的观众。',
      avoidFit: '对动画艺术形式抱有偏见拒绝观看任何二次元/动画载体的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 9,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 1, episode: 3, title: 'The Base Violence Necessary for Change', score: 9.6, votes: 38000, isMilestone: true },
          { season: 1, episode: 9, title: 'The Monster You Created', score: 9.6, votes: 41000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_arcane_1', source: 'douban', author: '二十二岛主', rating: 10, date: '2021-11-21', content: '动画剧集的新标杆！不论是美术、动作还是人物塑造，几乎无懈可击！', sentiment: 'positive', likes: 14500 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 9. 火线 (The Wire - 史诗级无冕之王)
  {
    id: 'the-wire',
    title: '火线',
    originalTitle: 'The Wire',
    year: '2002 - 2008',
    totalSeasons: 5,
    totalEpisodes: 60,
    status: 'Ended',
    genres: ['犯罪', '剧情', '惊悚'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    summary: '巴尔的摩街头的毒品交易、码头衰落、政府官僚、教育崩溃与新闻审查，大卫·西蒙以社会学专著般的冷峻视角解剖美国底层社会肌理。',
    compositeScore: 9.7,
    verdictTier: 'masterpiece',
    tagline: '真正被时代封神的电视剧百科全书，奥巴马盛赞的社会学巅峰杰作。',
    badges: ['全网封神殿', '慢热天花板', '社会学名著', '电视剧巅峰'],
    ratings: {
      imdb: { score: 9.3, maxScore: 10, normalized: 9.3, voteCount: 380000, verdict: 'Top 250 #6' },
      rottenTomatoes: { score: 94, maxScore: 100, normalized: 9.4, tomatometer: 94, popcornmeter: 96, criticsConsensus: '复杂、宏大、无可比拟，是现代电视剧对体制困境最深邃的剖析。', verdict: 'Certified Fresh' },
      metacritic: { score: 91, maxScore: 100, normalized: 9.1, metascore: 91, userScore: 9.3 },
      douban: { score: 9.6, maxScore: 10, normalized: 9.6, voteCount: 110000, starDistribution: [82, 14, 3, 0.5, 0.5] },
      tmdb: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 2200 }
    },
    radarDimensions: { criticPraise: 9.9, popularBuzz: 8.6, chineseTaste: 9.8, plotConsistency: 9.9, endingSatisfaction: 9.9 },
    aiInsight: {
      pros: ['前记者亲历创作，没有任何非黑即白的正义童话，极其真实残酷', '群像刻画跨越街头混混、政客、警察、教师，格局之大罕逢敌手'],
      cons: ['门槛极高，俚语多、人物关系错综复杂，前四集很容易劝退初学者'],
      audienceFit: '严肃社会政治题材爱好者、追求文学性与深度批判的美剧老饕。',
      avoidFit: '追求快节奏爽感打斗、指望有正义英雄伸张正义的观众。'
    },
    seasons: [
      {
        seasonNumber: 4,
        episodesCount: 13,
        averageScore: 9.5,
        trend: 'up',
        episodes: [
          { season: 4, episode: 13, title: 'Final Grades', score: 9.7, votes: 12000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_wire_1', source: 'douban', author: '皮革业', rating: 10, date: '2012-05-10', content: '这不是一部剧，这是一部伟大的巴尔的摩城市断代史。', sentiment: 'positive', likes: 8200 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 10. 黑道家族 (The Sopranos)
  {
    id: 'the-sopranos',
    title: '黑道家族',
    originalTitle: 'The Sopranos',
    year: '1999 - 2007',
    totalSeasons: 6,
    totalEpisodes: 86,
    status: 'Ended',
    genres: ['犯罪', '剧情'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
    summary: '新泽西黑手党老大托尼·索普拉诺在维持血腥黑帮帝国的重压下频发惊恐发作，他不得不瞒着手下向心理医生求助，在家庭伦理与杀戮中挣扎。',
    compositeScore: 9.5,
    verdictTier: 'masterpiece',
    tagline: '开启现代美剧黄金时代的无上宗师，詹姆斯·甘多菲尼不朽传奇。',
    badges: ['美剧教父', '黄金时代鼻祖', '心理分析犯罪', '全网封神殿'],
    ratings: {
      imdb: { score: 9.2, maxScore: 10, normalized: 9.2, voteCount: 460000, verdict: 'Top 250 #7' },
      rottenTomatoes: { score: 92, maxScore: 100, normalized: 9.2, tomatometer: 92, popcornmeter: 96, criticsConsensus: '以空前的人物复杂性与黑色幽默彻底改写了电视剧历史。', verdict: 'Certified Fresh' },
      metacritic: { score: 94, maxScore: 100, normalized: 9.4, metascore: 94, userScore: 9.0 },
      douban: { score: 9.3, maxScore: 10, normalized: 9.3, voteCount: 68000, starDistribution: [75, 18, 5, 1, 1] },
      tmdb: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 2800 }
    },
    radarDimensions: { criticPraise: 9.8, popularBuzz: 9.0, chineseTaste: 9.1, plotConsistency: 9.7, endingSatisfaction: 9.4 },
    aiInsight: {
      pros: ['把黑帮大哥还原为一个有中年危机、家庭烦恼的普通人，剧作深度无可匹敌', '开创了黑道与心理精神分析融合的全新艺术手法'],
      cons: ['时代相对较早，镜头节奏比起现代快餐美剧略显悠长慢热'],
      audienceFit: '《教父》粉丝、喜欢心理分析与复杂人际关系的深度观众。',
      avoidFit: '追求单纯火拼扫射动作戏的观众。'
    },
    seasons: [
      {
        seasonNumber: 6,
        episodesCount: 21,
        averageScore: 9.4,
        trend: 'up',
        episodes: [
          { season: 6, episode: 21, title: 'Made in America', score: 9.4, votes: 21000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_sop_1', source: 'douban', author: '文森特', rating: 10, date: '2015-08-20', content: '没有《黑道家族》，就没有后来的《绝命毒师》《火线》《广告狂人》。它是所有现代神剧的教父。', sentiment: 'positive', likes: 6500 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 11. 兄弟连 (Band of Brothers)
  {
    id: 'band-of-brothers',
    title: '兄弟连',
    originalTitle: 'Band of Brothers',
    year: '2001',
    totalSeasons: 1,
    totalEpisodes: 10,
    status: 'Ended',
    genres: ['战争', '历史', '动作'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    summary: '斯皮尔伯格与汤姆·汉克斯联合监制，真实记录美军101空降师506团E连从诺曼底登陆到攻克鹰巢的历史战役与战友情谊。',
    compositeScore: 9.6,
    verdictTier: 'masterpiece',
    tagline: '战争影视作品永恒的天花板，豆瓣9.6分零差评史诗巨作。',
    badges: ['战争片巅峰', '豆瓣9.6分', '零差评神剧', '史诗巨制'],
    ratings: {
      imdb: { score: 9.4, maxScore: 10, normalized: 9.4, voteCount: 520000, verdict: 'Top 250 #3' },
      rottenTomatoes: { score: 97, maxScore: 100, normalized: 9.7, tomatometer: 97, popcornmeter: 98, criticsConsensus: '以无比崇高的写实力量与战友深情，筑成了影视史上最动人的二战丰碑。', verdict: 'Certified Fresh' },
      metacritic: { score: 87, maxScore: 100, normalized: 8.7, metascore: 87, userScore: 9.4 },
      douban: { score: 9.6, maxScore: 10, normalized: 9.6, voteCount: 220000, starDistribution: [84, 13, 2.5, 0.3, 0.2] },
      tmdb: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 3800 }
    },
    radarDimensions: { criticPraise: 9.6, popularBuzz: 9.5, chineseTaste: 9.9, plotConsistency: 9.9, endingSatisfaction: 9.8 },
    aiInsight: {
      pros: ['空降诺曼底与巴斯托涅雪夜死守战术细节写实度至今无人超越', '真实老兵采访穿插全片，庄严震撼直击人心'],
      cons: ['极度严肃庄重，缺乏花哨的娱乐喜剧元素'],
      audienceFit: '二战历史爱好者、追求军事真实考据与兄弟热血的观众。',
      avoidFit: '抗拒战地炮火硝烟、追求轻松搞笑的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 10,
        averageScore: 9.4,
        trend: 'up',
        episodes: [
          { season: 1, episode: 6, title: 'Bastogne', score: 9.6, votes: 35000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_bob_1', source: 'douban', author: '桃姐', rating: 10, date: '2016-09-02', content: '从今直到世界的末日，我们是受人纪念的少数人，我们是生死与共的兄弟。', sentiment: 'positive', likes: 11200 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 12. 老友记 (Friends)
  {
    id: 'friends',
    title: '老友记',
    originalTitle: 'Friends',
    year: '1994 - 2004',
    totalSeasons: 10,
    totalEpisodes: 236,
    status: 'Ended',
    genres: ['喜剧', '爱情', '都市'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
    summary: '纽约曼哈顿公寓里，瑞秋、莫妮卡、菲比、乔伊、钱德勒和罗斯六位好友长达十年的陪伴、欢笑与生活琐碎，承载了几代人的青春乌托邦。',
    compositeScore: 9.5,
    verdictTier: 'masterpiece',
    tagline: '全球情景喜剧不灭的神话，亿万观众的心灵避难所与英语启蒙第一剧。',
    badges: ['国民第一情景喜剧', '豆瓣9.8分', '全网封神殿', '治愈天花板'],
    ratings: {
      imdb: { score: 8.9, maxScore: 10, normalized: 8.9, voteCount: 1100000, verdict: '情景喜剧第一' },
      rottenTomatoes: { score: 89, maxScore: 100, normalized: 8.9, tomatometer: 89, popcornmeter: 94, criticsConsensus: '永不褪色的真挚友情与无懈可击的六人化学反应。', verdict: 'Fresh' },
      metacritic: { score: 84, maxScore: 100, normalized: 8.4, metascore: 84, userScore: 8.9 },
      douban: { score: 9.8, maxScore: 10, normalized: 9.8, voteCount: 650000, starDistribution: [89, 9, 1.6, 0.2, 0.2] },
      tmdb: { score: 8.4, maxScore: 10, normalized: 8.4, voteCount: 8200 }
    },
    radarDimensions: { criticPraise: 8.8, popularBuzz: 10.0, chineseTaste: 9.9, plotConsistency: 9.6, endingSatisfaction: 9.7 },
    aiInsight: {
      pros: ['六个性格鲜明的人物化学反应无敌，任何一集打开都能让人开怀大笑', '伴随角色成长的温情与羁绊无可替代，刷多少遍都不腻'],
      cons: ['传统多机位罐头笑声情景喜剧格式，部分年轻观众可能需要适应形式'],
      audienceFit: '所有需要治愈温暖、喜欢都市生活喜剧与练英语听力的观众。',
      avoidFit: '追求严肃暗黑悬疑、反感情景喜剧罐头笑声的观众。'
    },
    seasons: [
      {
        seasonNumber: 10,
        episodesCount: 18,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 10, episode: 17, title: 'The Last One', score: 9.7, votes: 38000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_friends_1', source: 'douban', author: '安妮', rating: 10, date: '2020-03-01', content: '每次难过失落的时候打开中央公园咖啡馆，就觉得世界依然很温柔。', sentiment: 'positive', likes: 16800 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 13. 星球大战：侍者 (2024最新暴雷被砍典型)
  {
    id: 'the-acolyte',
    title: '星球大战：侍者',
    originalTitle: 'The Acolyte',
    year: '2024',
    totalSeasons: 1,
    totalEpisodes: 8,
    status: 'Canceled',
    genres: ['科幻', '动作', '冒险'],
    network: 'Disney+',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&auto=format&fit=crop&q=80',
    summary: '高共和时代末期，绝地武士团面临一系列离奇谋杀调查，却牵扯出关于原力黑暗面起源与绝地武士虚伪的阴谋。单季耗资1.8亿美元。',
    compositeScore: 4.6,
    verdictTier: 'trap_warning',
    tagline: '1.8亿美元换来星战历史上最惨烈的反噬，烂番茄爆米花仅18%，播毕即遭迪士尼取消！',
    isTrap: true,
    badges: ['2024避雷之最', '爆米花18%暴死', '星战粉丝公愤', '已被砍剧'],
    ratings: {
      imdb: { score: 4.2, maxScore: 10, normalized: 4.2, voteCount: 130000, verdict: '星战剧集历史最低' },
      rottenTomatoes: { score: 78, maxScore: 100, normalized: 7.8, tomatometer: 78, popcornmeter: 18, criticsConsensus: '专业媒体给出好评，但观众口碑遭遇崩盘式两极分化。', verdict: '严重割裂 (观众仅18%)' },
      metacritic: { score: 67, maxScore: 100, normalized: 6.7, metascore: 67, userScore: 3.9 },
      douban: { score: 5.1, maxScore: 10, normalized: 5.1, voteCount: 22000, starDistribution: [12, 18, 30, 25, 15] },
      tmdb: { score: 5.4, maxScore: 10, normalized: 5.4, voteCount: 780 }
    },
    radarDimensions: { criticPraise: 6.5, popularBuzz: 8.0, chineseTaste: 4.5, plotConsistency: 3.5, endingSatisfaction: 2.5 },
    aiInsight: {
      pros: ['第5集光剑武打编排动作设计较为流畅'],
      cons: ['主角人设逻辑混乱，原力无性繁殖设定颠覆经典星战哲学引发死忠粉愤怒', '高昂预算大部分被空洞布景消耗，收视率惨淡直接被官方取消'],
      audienceFit: '极度无聊纯看第5集打斗切片的观众。',
      avoidFit: '星战正传忠实粉丝、对剧情动机严谨性有要求的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 5.0,
        trend: 'down',
        episodes: [
          { season: 1, episode: 3, title: 'Destiny', score: 3.6, votes: 31000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_aco_1', source: 'douban', author: '银河巡警', rating: 3, date: '2024-07-20', content: '编剧根本不懂星战，人物动机像儿戏一样换来换去，难怪迪士尼连第二季都不敢续订。', sentiment: 'negative', likes: 6200 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 14. 权力的游戏 (经典烂尾断崖)
  {
    id: 'game-of-thrones',
    title: '权力的游戏',
    originalTitle: 'Game of Thrones',
    year: '2011 - 2019',
    totalSeasons: 8,
    totalEpisodes: 73,
    status: 'Ended',
    genres: ['奇幻', '剧情', '冒险', '动作'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '维斯特洛大陆七大王国的九大家族为了争夺铁王座展开殊死权谋较量，同时长城以北沉睡万年的远古异鬼威胁正在逼近。',
    compositeScore: 8.4,
    verdictTier: 'collapse_warning',
    tagline: '前四季封神无敌、第七季注水加速、第八季断崖式雪崩的典型烂尾警示录。',
    hasEndingCollapse: true,
    badges: ['史诗巨制', '断崖式烂尾预警', '全球现象级', '高开暴跌'],
    ratings: {
      imdb: { score: 9.2, maxScore: 10, normalized: 9.2, voteCount: 2350000, verdict: '前7季9.4，终集仅4.0' },
      rottenTomatoes: { score: 89, maxScore: 100, normalized: 8.9, tomatometer: 89, popcornmeter: 85, criticsConsensus: '其宏大格局曾重塑影视，但仓促荒谬的第八季永远成为遗憾。', verdict: 'Fresh (最后一季崩盘)' },
      metacritic: { score: 86, maxScore: 100, normalized: 8.6, metascore: 86, userScore: 8.1 },
      douban: { score: 9.3, maxScore: 10, normalized: 9.3, voteCount: 720000, starDistribution: [78, 16, 4, 1, 1] },
      tmdb: { score: 8.4, maxScore: 10, normalized: 8.4, voteCount: 24000 }
    },
    radarDimensions: { criticPraise: 8.8, popularBuzz: 10.0, chineseTaste: 8.9, plotConsistency: 6.2, endingSatisfaction: 3.5 },
    aiInsight: {
      pros: ['第1-4季权谋与台词水平登峰造极，血色婚礼堪称电视剧奇迹', '多线群像与配乐拉敏·贾瓦迪水准均为美剧历史标杆'],
      cons: ['第八季脱离原著后逻辑雪崩，龙妈黑化与布兰登基被数百万观众请愿重拍', '终集单集 IMDb 破纪录跌至 4.0 分'],
      audienceFit: '只看前6季、到私生子之战见好就收的史诗奇幻剧迷。',
      avoidFit: '强迫症患者、必须看到圆满自洽收尾的观众。'
    },
    seasons: [
      {
        seasonNumber: 8,
        episodesCount: 6,
        averageScore: 6.4,
        trend: 'down',
        episodes: [
          { season: 8, episode: 6, title: 'The Iron Throne', score: 4.0, votes: 260000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c6', source: 'douban', author: '木卫二', rating: 6, date: '2019-05-20', content: '前面挖了多大的坑，后面要是没本事平稳落地，观众的反噬就会有多可怕。', sentiment: 'negative', likes: 21000 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 15. 西部世界 (Westworld - 高开被砍)
  {
    id: 'westworld',
    title: '西部世界',
    originalTitle: 'Westworld',
    year: '2016 - 2022',
    totalSeasons: 4,
    totalEpisodes: 36,
    status: 'Canceled',
    genres: ['科幻', '剧情', '悬疑', '西部'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '未来高科技成人乐园中，拟真仿生人在人类残酷玩弄下觉醒。第一季神机妙算的多时间线剪辑惊艳世界，后期却陷入故弄玄虚遗憾被砍。',
    compositeScore: 7.9,
    verdictTier: 'collapse_warning',
    tagline: '第一季是无与伦比的多时间线神作，后期越走越偏终被砍剧的伤感遗珠。',
    hasEndingCollapse: true,
    badges: ['第一季封神', '高开暴走', '多时间线叙事', '遗憾被砍'],
    ratings: {
      imdb: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 540000, verdict: 'S1均分9.2，S4仅7.5' },
      rottenTomatoes: { score: 79, maxScore: 100, normalized: 7.9, tomatometer: 79, popcornmeter: 71, criticsConsensus: '首季惊艳，但复杂的谜题逐渐变成了令人生厌的故弄玄虚。', verdict: 'Fresh (先高后低)' },
      metacritic: { score: 71, maxScore: 100, normalized: 7.1, metascore: 71, userScore: 7.5 },
      douban: { score: 8.9, maxScore: 10, normalized: 8.9, voteCount: 380000, starDistribution: [62, 26, 9, 2, 1] },
      tmdb: { score: 8.0, maxScore: 10, normalized: 8.0, voteCount: 5100 }
    },
    radarDimensions: { criticPraise: 8.2, popularBuzz: 8.8, chineseTaste: 8.8, plotConsistency: 6.0, endingSatisfaction: 4.8 },
    aiInsight: {
      pros: ['第一季双时间线叙事蒙太奇堪称神仙剪辑，安东尼·霍普金斯台词充满宿命哲学'],
      cons: ['第三季脱离乐园进入都市沦为平庸枪战片，收视暴跌终被砍剧无结局'],
      audienceFit: '强烈建议只看第一季（当作单季闭环神作）的科幻推理爱好者。',
      avoidFit: '必须看完所有季且指望圆满收尾的强迫症观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 10,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 1, episode: 10, title: 'The Bicameral Mind', score: 9.7, votes: 52000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c19', source: 'douban', author: '皮革业', rating: 8, date: '2022-08-16', content: '第一季是永恒的封神之作，把它当成完整的十集限定剧看是最幸福的。', sentiment: 'mixed', likes: 9300 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 16. 偶像涡流 (The Idol - 避雷大烂剧)
  {
    id: 'the-idol',
    title: '偶像涡流 / 偶像丑闻',
    originalTitle: 'The Idol',
    year: '2023',
    totalSeasons: 1,
    totalEpisodes: 5,
    status: 'Canceled',
    genres: ['剧情', '音乐'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80',
    summary: '年轻流行偶像遭遇精神崩溃，在复出期间结识神秘夜店老板并陷入自毁式精神控制的深渊。充斥恶俗低级擦边。',
    compositeScore: 4.1,
    verdictTier: 'trap_warning',
    tagline: 'HBO史诗级大暴雷，烂番茄19%不及格，各大权威平台公认绝对避雷大烂剧！',
    isTrap: true,
    badges: ['全网避雷榜首', '烂番茄19%烂透', '豆瓣3.9暴雷', '极度劝退'],
    ratings: {
      imdb: { score: 5.2, maxScore: 10, normalized: 5.2, voteCount: 96000, verdict: 'HBO历史最低' },
      rottenTomatoes: { score: 19, maxScore: 100, normalized: 1.9, tomatometer: 19, popcornmeter: 41, criticsConsensus: '低俗浅薄、自命不凡。沦为恶俗低级产物。', verdict: 'Rotten (19% 烂透)' },
      metacritic: { score: 27, maxScore: 100, normalized: 2.7, metascore: 27, userScore: 3.1 },
      douban: { score: 3.9, maxScore: 10, normalized: 3.9, voteCount: 42000, starDistribution: [5, 10, 15, 25, 45] },
      tmdb: { score: 5.5, maxScore: 10, normalized: 5.5, voteCount: 880 }
    },
    radarDimensions: { criticPraise: 2.0, popularBuzz: 7.2, chineseTaste: 3.0, plotConsistency: 2.5, endingSatisfaction: 2.0 },
    aiInsight: {
      pros: ['莉莉-罗丝·德普部分原声配乐尚可听'],
      cons: ['男主演技油腻，毫无剧情推进意义的恶俗擦边，被评为年度最烂美剧'],
      audienceFit: '对烂片考古有特殊猎奇心理的观众。',
      avoidFit: '所有正常美剧观众，建议立刻避坑。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 5,
        averageScore: 4.8,
        trend: 'down',
        episodes: [
          { season: 1, episode: 5, title: 'Jocelyn Forever', score: 4.2, votes: 16000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c12', source: 'douban', author: '谋杀电视机', rating: 2, date: '2023-06-12', content: 'HBO有史以来最恶俗的自嗨烂剧，全靠低级感官刺激掩盖空洞的大脑。', sentiment: 'negative', likes: 12000 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 17. 三体 英文版 (3 Body Problem - 中美审美大分歧)
  {
    id: '3-body-problem',
    title: '三体 英文版',
    originalTitle: '3 Body Problem',
    year: '2024 - ',
    totalSeasons: 1,
    totalEpisodes: 8,
    status: 'Returning Series',
    genres: ['科幻', '剧情', '悬疑', '冒险'],
    network: 'Netflix',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80',
    summary: '横跨几十年的科学谜团与外星危机：人类天文学家向宇宙发射信号，引发四百年后三体舰队向地球发起的生存入侵。',
    compositeScore: 7.6,
    verdictTier: 'recommended',
    tagline: '中西审美巨大分歧典型：海外烂番茄79%叫好，国内豆瓣6.9争议不断。',
    hasCulturalDivergence: true,
    badges: ['中美口碑大分歧', '刘慈欣IP改编', '古筝行动视听炸裂', '快节奏爆米花'],
    ratings: {
      imdb: { score: 7.6, maxScore: 10, normalized: 7.6, voteCount: 168000, verdict: '欧美大众好评' },
      rottenTomatoes: { score: 79, maxScore: 100, normalized: 7.9, tomatometer: 79, popcornmeter: 78, criticsConsensus: '以极具野心的宏大视野和极快节奏，将晦涩科幻转化为引人入胜的流媒体剧集。', verdict: 'Certified Fresh' },
      metacritic: { score: 70, maxScore: 100, normalized: 7.0, metascore: 70, userScore: 6.2 },
      douban: { score: 6.9, maxScore: 10, normalized: 6.9, voteCount: 185000, starDistribution: [18, 32, 35, 10, 5] },
      tmdb: { score: 7.5, maxScore: 10, normalized: 7.5, voteCount: 1500 }
    },
    radarDimensions: { criticPraise: 7.8, popularBuzz: 9.3, chineseTaste: 6.4, plotConsistency: 7.2, endingSatisfaction: 7.4 },
    aiInsight: {
      pros: ['古筝行动巴拿马运河纳米飞刃视听工业水准顶级，前几集倒计时引人入胜'],
      cons: ['原著角色被魔改为牛津五人组同窗恋爱，削弱了原著冷酷中式哲学与宇宙孤勇感'],
      audienceFit: '未读过原著的泛科幻影视观众、喜欢好莱坞特效灾难片的观众。',
      avoidFit: '刘慈欣铁杆原著党、对科学严谨性有极高要求的读者。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 7.8,
        trend: 'stable',
        episodes: [
          { season: 1, episode: 5, title: 'Judgment Day', score: 8.8, votes: 34000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c15', source: 'douban', author: '电子骑士', rating: 6, date: '2024-03-23', content: '古筝行动确实好看，但把原著几十年的人物改成闺蜜团谈恋爱，中式哲学荡然无存。', sentiment: 'mixed', likes: 14200 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 18. 风骚律师 (Better Call Saul - 慢热神剧)
  {
    id: 'better-call-saul',
    title: '风骚律师',
    originalTitle: 'Better Call Saul',
    year: '2015 - 2022',
    totalSeasons: 6,
    totalEpisodes: 63,
    status: 'Ended',
    genres: ['犯罪', '剧情', '喜剧'],
    network: 'AMC',
    poster: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&auto=format&fit=crop&q=80',
    summary: '《绝命毒师》前传，讲述本性善良但行事不羁的吉米·麦吉尔在哥哥查克与法律碾压下一步步蜕变为黑道律师索尔·古德曼的悲剧史诗。',
    compositeScore: 9.5,
    verdictTier: 'masterpiece',
    tagline: '慢热至极却后劲无穷，文戏与镜头美学超越母剧的艺术奇迹。',
    badges: ['全网封神', '文戏巅峰', '慢热神作', '豆瓣9.8分'],
    ratings: {
      imdb: { score: 9.0, maxScore: 10, normalized: 9.0, voteCount: 680000, verdict: 'Top 250 #34' },
      rottenTomatoes: { score: 98, maxScore: 100, normalized: 9.8, tomatometer: 98, popcornmeter: 96, criticsConsensus: '以精巧镜头语言将小人物悲剧升华为大师级人性交响乐。', verdict: 'Certified Fresh' },
      metacritic: { score: 86, maxScore: 100, normalized: 8.6, metascore: 86, userScore: 9.3 },
      douban: { score: 9.8, maxScore: 10, normalized: 9.8, voteCount: 340000, starDistribution: [88, 10, 1.6, 0.2, 0.2] },
      tmdb: { score: 8.7, maxScore: 10, normalized: 8.7, voteCount: 5200 }
    },
    radarDimensions: { criticPraise: 9.8, popularBuzz: 8.8, chineseTaste: 9.9, plotConsistency: 9.9, endingSatisfaction: 9.7 },
    aiInsight: {
      pros: ['视听语言美学登峰造极，吉米、金与查克的心理羁绊令人叹为观止，终季结局无可挑剔'],
      cons: ['前两季节奏沉静舒缓，有较高观剧门槛，需要耐得住性子'],
      audienceFit: '沉浸式审美爱好者、喜欢细腻人物心理与高级镜头的资深剧迷。',
      avoidFit: '追求快节奏爆点、枪战血浆或习惯短视频节奏的观众。'
    },
    seasons: [
      {
        seasonNumber: 6,
        episodesCount: 13,
        averageScore: 9.6,
        trend: 'up',
        episodes: [
          { season: 6, episode: 7, title: 'Plan and Execution', score: 9.9, votes: 68000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c4', source: 'douban', author: '陀螺凡达可', rating: 10, date: '2022-08-16', content: '最后一集抽烟那一幕看哭，在道德救赎纯度上无可挑剔。', sentiment: 'positive', likes: 15400 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 19. 切尔诺贝利 (Chernobyl)
  {
    id: 'chernobyl',
    title: '切尔诺贝利',
    originalTitle: 'Chernobyl',
    year: '2019',
    totalSeasons: 1,
    totalEpisodes: 5,
    status: 'Ended',
    genres: ['历史', '剧情', '惊悚'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    summary: '还原1986年前苏联切尔诺贝利核灾难真相，记录那些在谎言、恐惧与致命辐射中拯救欧洲的平凡英雄。短小精悍的5集限定神剧。',
    compositeScore: 9.6,
    verdictTier: 'masterpiece',
    tagline: '短小精悍的5集限定神剧，压抑肃穆但直击灵魂的纪实杰作。',
    badges: ['零差评神剧', '艾美奖大满贯', '短篇天花板', '震撼人心'],
    ratings: {
      imdb: { score: 9.3, maxScore: 10, normalized: 9.3, voteCount: 920000, verdict: 'Top 250 #5' },
      rottenTomatoes: { score: 95, maxScore: 100, normalized: 9.5, tomatometer: 95, popcornmeter: 98, criticsConsensus: '冷峻严密地将人类谎言的代价与体制荒诞剖析得淋漓尽致。', verdict: 'Certified Fresh' },
      metacritic: { score: 82, maxScore: 100, normalized: 8.2, metascore: 82, userScore: 9.0 },
      douban: { score: 9.6, maxScore: 10, normalized: 9.6, voteCount: 450000, starDistribution: [83, 14, 2.5, 0.3, 0.2] },
      tmdb: { score: 8.7, maxScore: 10, normalized: 8.7, voteCount: 16000 }
    },
    radarDimensions: { criticPraise: 9.5, popularBuzz: 9.4, chineseTaste: 9.8, plotConsistency: 10.0, endingSatisfaction: 9.8 },
    aiInsight: {
      pros: ['全5集无一丝废戏，剧本质感极其扎实，终集法庭陈词振聋发聩'],
      cons: ['基调极其沉重压抑，生理与心理承受压力较大'],
      audienceFit: '历史反思题材爱好者、追求高质量纪实影视的观众。',
      avoidFit: '反感情绪沉重压抑氛围的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 5,
        averageScore: 9.6,
        trend: 'up',
        episodes: [
          { season: 1, episode: 5, title: 'Vichnaya Pamyat', score: 9.8, votes: 62000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c8', source: 'douban', author: '大奇特', rating: 10, date: '2019-06-05', content: '谎言的代价是什么？并非在于我们会把谎言误认为真理，而是再也认不清事实。', sentiment: 'positive', likes: 18900 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 20. 继承之战 (Succession)
  {
    id: 'succession',
    title: '继承之战',
    originalTitle: 'Succession',
    year: '2018 - 2023',
    totalSeasons: 4,
    totalEpisodes: 39,
    status: 'Ended',
    genres: ['剧情', '商战', '黑色幽默'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
    summary: '全球传媒帝国罗伊家族掌门人年事已高，四个子女为了争夺千亿美元商业帝国控制权展开刀刀见血的人性搏杀。',
    compositeScore: 9.4,
    verdictTier: 'masterpiece',
    tagline: '现代莎士比亚式商战悲喜剧，近五年横扫艾美奖的无冕之王。',
    badges: ['全网封神', '艾美奖大满贯', '商战莎翁', '无可挑剔'],
    ratings: {
      imdb: { score: 8.9, maxScore: 10, normalized: 8.9, voteCount: 310000, verdict: 'Top 250 #56' },
      rottenTomatoes: { score: 95, maxScore: 100, normalized: 9.5, tomatometer: 95, popcornmeter: 91, criticsConsensus: '以锐利冷血的台词与令人叫绝的群戏，完成了对特权阶层与家庭创伤的绝妙讽刺。', verdict: 'Certified Fresh' },
      metacritic: { score: 90, maxScore: 100, normalized: 9.0, metascore: 90, userScore: 8.9 },
      douban: { score: 9.4, maxScore: 10, normalized: 9.4, voteCount: 195000, starDistribution: [76, 18, 5, 0.7, 0.3] },
      tmdb: { score: 8.3, maxScore: 10, normalized: 8.3, voteCount: 2200 }
    },
    radarDimensions: { criticPraise: 9.9, popularBuzz: 8.5, chineseTaste: 9.3, plotConsistency: 9.8, endingSatisfaction: 9.8 },
    aiInsight: {
      pros: ['台词密不透风达到英语编剧天花板，4x03长达半小时一镜到底表演震惊影视界'],
      cons: ['全员恶人全无正义英雄，商业并购与豪门黑话有一定门槛'],
      audienceFit: '喜欢高智商台词博弈、家族权力斗争与严肃现实主义剧作的观众。',
      avoidFit: '寻找阳光治愈打脸爽剧、反感全员人渣互害的观众。'
    },
    seasons: [
      {
        seasonNumber: 4,
        episodesCount: 10,
        averageScore: 9.7,
        trend: 'up',
        episodes: [
          { season: 4, episode: 3, title: "Connor's Wedding", score: 9.9, votes: 65000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c9', source: 'douban', author: 'LOOK', rating: 10, date: '2023-05-29', content: '第四季第3集完全可以载入电视剧教科书。', sentiment: 'positive', likes: 9800 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 21. 人生切割术 (Severance)
  {
    id: 'severance',
    title: '人生切割术',
    originalTitle: 'Severance',
    year: '2022 - ',
    totalSeasons: 2,
    totalEpisodes: 19,
    status: 'Returning Series',
    genres: ['科幻', '悬疑', '惊悚'],
    network: 'Apple TV+',
    poster: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80',
    summary: '员工通过脑部手术将工作记忆与私人生活彻底物理分割。当上班的自己永远不知道下班的自己是谁，一场办公室反乌托邦反叛正在酝酿。',
    compositeScore: 9.2,
    verdictTier: 'must_watch',
    tagline: '脑洞奇绝的职场反乌托邦神作，季终集悬念令人窒息。',
    badges: ['高概念神剧', '封神季终集', '苹果牌面', '悬疑天花板'],
    ratings: {
      imdb: { score: 8.7, maxScore: 10, normalized: 8.7, voteCount: 240000, verdict: '季终集 9.7 分' },
      rottenTomatoes: { score: 97, maxScore: 100, normalized: 9.7, tomatometer: 97, popcornmeter: 92, criticsConsensus: '以极简冷峻美学刺痛当代职场人。', verdict: 'Certified Fresh' },
      metacritic: { score: 83, maxScore: 100, normalized: 8.3, metascore: 83, userScore: 8.6 },
      douban: { score: 9.1, maxScore: 10, normalized: 9.1, voteCount: 220000, starDistribution: [62, 29, 8, 0.7, 0.3] },
      tmdb: { score: 8.4, maxScore: 10, normalized: 8.4, voteCount: 2100 }
    },
    radarDimensions: { criticPraise: 9.4, popularBuzz: 8.6, chineseTaste: 9.3, plotConsistency: 9.5, endingSatisfaction: 9.8 },
    aiInsight: {
      pros: ['工作与生活分割概念极精妙，第一季第9集多线收束剪辑教科书级别让人屏住呼吸'],
      cons: ['前期节奏偏慢构建氛围，第一季停在最大的反转悬念处'],
      audienceFit: '高概念悬疑爱好者、对现代职场打工人异化有深刻共鸣的观众。',
      avoidFit: '追求单纯枪战爽剧、无法忍受慢热留白悬念的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 9,
        averageScore: 9.0,
        trend: 'up',
        episodes: [
          { season: 1, episode: 9, title: 'The We We Are', score: 9.7, votes: 46000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c10', source: 'douban', author: '哪吒男', rating: 10, date: '2022-04-10', content: '第九集最后40分钟心脏几乎跳到嗓子眼！这种多线收紧的功力太奢侈了！', sentiment: 'positive', likes: 13500 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 22. 最后生还者 (The Last of Us)
  {
    id: 'the-last-of-us',
    title: '最后生还者',
    originalTitle: 'The Last of Us',
    year: '2023 - ',
    totalSeasons: 2,
    totalEpisodes: 16,
    status: 'Returning Series',
    genres: ['动作', '冒险', '剧情', '末日'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '致命真菌爆发20年后，饱受心灵创伤的坚毅走私犯乔尔护送免疫女孩艾莉横跨沦为废墟的美国大陆。',
    compositeScore: 9.2,
    verdictTier: 'must_watch',
    tagline: 'HBO现象级漫改末日巨作，第3集被誉为电视剧史上最催泪的爱情诗篇。',
    badges: ['全网好评', '催泪封神集', '佩德罗演技', 'HBO收视纪录'],
    ratings: {
      imdb: { score: 8.8, maxScore: 10, normalized: 8.8, voteCount: 560000, verdict: 'Top 250 #88' },
      rottenTomatoes: { score: 96, maxScore: 100, normalized: 9.6, tomatometer: 96, popcornmeter: 89, criticsConsensus: '保留了游戏令人心碎的悲剧力量，扩充了末日人性微光。', verdict: 'Certified Fresh' },
      metacritic: { score: 84, maxScore: 100, normalized: 8.4, metascore: 84, userScore: 6.6 },
      douban: { score: 9.0, maxScore: 10, normalized: 9.0, voteCount: 260000, starDistribution: [58, 30, 10, 1.2, 0.8] },
      tmdb: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 5200 }
    },
    radarDimensions: { criticPraise: 9.5, popularBuzz: 9.8, chineseTaste: 9.0, plotConsistency: 9.1, endingSatisfaction: 9.3 },
    aiInsight: {
      pros: ['佩德罗·帕斯卡父女情感羁绊无懈可击，第3集同性凄美爱情感人至深'],
      cons: ['后期丧尸感染者战斗偏少，主要重心全面倒向文戏人性探讨'],
      audienceFit: '末日公路救赎、深度人道主义情感剧迷。',
      avoidFit: '只想看一路打怪爆头纯丧尸枪战的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 9,
        averageScore: 9.0,
        trend: 'up',
        episodes: [
          { season: 1, episode: 3, title: 'Long, Long Time', score: 8.1, votes: 240000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c18', source: 'douban', author: '二十二岛主', rating: 9, date: '2023-01-30', content: '第三集在世界崩塌的末日里，能彼此守护慢慢变老吃上一颗新鲜草莓，已经是神明最大的恩赐。', sentiment: 'positive', likes: 16800 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 23. 秘密入侵 (Secret Invasion - 漫威大暴雷)
  {
    id: 'secret-invasion',
    title: '秘密入侵',
    originalTitle: 'Secret Invasion',
    year: '2023',
    totalSeasons: 1,
    totalEpisodes: 6,
    status: 'Ended',
    genres: ['动作', '科幻', '冒险'],
    network: 'Disney+',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&auto=format&fit=crop&q=80',
    summary: '尼克·弗瑞孤身调查变形斯库鲁人对地球权力核心的秘密渗透，2.1亿美元巨额投资却换来漫威历史上最惨烈的单集暴跌。',
    compositeScore: 5.3,
    verdictTier: 'trap_warning',
    tagline: '2.1亿美元投资换来漫威历史上最惨烈的口碑暴跌，终集单集破漫威历史最低！',
    isTrap: true,
    badges: ['漫威口碑滑铁卢', '单集3.7分暴死', '高预算灾难', '避雷警告'],
    ratings: {
      imdb: { score: 5.9, maxScore: 10, normalized: 5.9, voteCount: 92000, verdict: '终集 3.7 分' },
      rottenTomatoes: { score: 52, maxScore: 100, normalized: 5.2, tomatometer: 52, popcornmeter: 47, criticsConsensus: '在毫无说服力的CGI大战和敷衍剧作中沦为工业废料。', verdict: 'Rotten' },
      metacritic: { score: 63, maxScore: 100, normalized: 6.3, metascore: 63, userScore: 4.8 },
      douban: { score: 5.0, maxScore: 10, normalized: 5.0, voteCount: 38000, starDistribution: [10, 15, 35, 25, 15] },
      tmdb: { score: 6.2, maxScore: 10, normalized: 6.2, voteCount: 1200 }
    },
    radarDimensions: { criticPraise: 4.5, popularBuzz: 7.0, chineseTaste: 4.8, plotConsistency: 4.0, endingSatisfaction: 2.5 },
    aiInsight: {
      pros: ['老戏骨塞缪尔·杰克逊与奥利维娅·科尔曼有对手戏'],
      cons: ['终集万能超能力手臂拼接特效敷衍至极，毫无悬疑感', '2.12亿美元成本未见大片质感，彻底毁掉原著神级大事件'],
      audienceFit: '有强迫症必须补全漫威时间线的死忠粉。',
      avoidFit: '追求严谨谍战逻辑与高质感视听的普通观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 6,
        averageScore: 5.8,
        trend: 'down',
        episodes: [
          { season: 1, episode: 6, title: 'Home', score: 3.7, votes: 31000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c14', source: 'douban', author: '卡西法', rating: 4, date: '2023-07-27', content: '2.12亿砸出来的工业垃圾，漫威高层该醒醒了。', sentiment: 'negative', likes: 7800 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 24. 指环王：力量之戒 (The Rings of Power)
  {
    id: 'rings-of-power',
    title: '指环王：力量之戒',
    originalTitle: 'The Lord of the Rings: The Rings of Power',
    year: '2022 - ',
    totalSeasons: 2,
    totalEpisodes: 16,
    status: 'Returning Series',
    genres: ['奇幻', '冒险', '动作', '剧情'],
    network: 'Amazon Prime',
    poster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '中土第二纪元魔戒铸造与努曼诺尔帝国的史诗前传，单季耗资4.65亿美元，画面极致奢华但剧本平庸空洞。',
    compositeScore: 6.8,
    verdictTier: 'mediocre',
    tagline: '单季耗资4.65亿美元的影视最昂贵巨制，却深陷文戏幼稚与原著魔改的巨大争议。',
    badges: ['史上最昂贵美剧', '原著粉极度争议', '华丽空洞', '口碑极化'],
    ratings: {
      imdb: { score: 7.0, maxScore: 10, normalized: 7.0, voteCount: 380000, verdict: '严重两极分化' },
      rottenTomatoes: { score: 84, maxScore: 100, normalized: 8.4, tomatometer: 84, popcornmeter: 38, criticsConsensus: '视觉奇观无可匹敌，但散乱支线让中土史诗失去灵魂。', verdict: '影评人84% vs 爆米花38%' },
      metacritic: { score: 71, maxScore: 100, normalized: 7.1, metascore: 71, userScore: 3.2 },
      douban: { score: 6.8, maxScore: 10, normalized: 6.8, voteCount: 88000, starDistribution: [16, 28, 38, 12, 6] },
      tmdb: { score: 7.2, maxScore: 10, normalized: 7.2, voteCount: 3100 }
    },
    radarDimensions: { criticPraise: 7.6, popularBuzz: 8.9, chineseTaste: 6.5, plotConsistency: 5.8, endingSatisfaction: 6.2 },
    aiInsight: {
      pros: ['肉眼可见的烧钱，努曼诺尔港口与双圣树场景壁纸级画面，配乐水准极高'],
      cons: ['加拉德瑞尔人设偏执暴躁，台词空洞无物被嘲讽，观众爆米花指数常年38%徘徊'],
      audienceFit: '只想看极致奇幻特效、不在意原著严谨性的视觉党。',
      avoidFit: '托尔金原著死忠粉、彼得·杰克逊电影三部曲信仰者。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 7.1,
        trend: 'stable',
        episodes: [
          { season: 1, episode: 6, title: 'Udûn', score: 8.4, votes: 38000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c20', source: 'douban', author: '西楼尘', rating: 6, date: '2022-10-15', content: '能看到4.6亿美元在燃烧，但看不到一个鲜活有深度的人物。', sentiment: 'negative', likes: 6700 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 25. 绅士作风 (The Gentlemen - 2024最新盖里奇犯罪)
  {
    id: 'the-gentlemen',
    title: '绅士作风',
    originalTitle: 'The Gentlemen',
    year: '2024 - ',
    totalSeasons: 1,
    totalEpisodes: 8,
    status: 'Returning Series',
    genres: ['犯罪', '喜剧', '动作'],
    network: 'Netflix',
    poster: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80',
    summary: '英国贵族埃迪继承了父亲的庞大家族庄园，却惊愕发现庄园地下竟是欧洲最大的大麻种植帝国。在黑帮、贵族与骗局中，他展现出惊人的黑化犯罪天赋。',
    compositeScore: 8.3,
    verdictTier: 'recommended',
    tagline: '盖·里奇标志性快节奏犯罪黑色幽默，2024英伦黑帮爽剧天花板！',
    badges: ['2024英伦爆款', '盖·里奇招牌', '西装暴徒', '爽度拉满'],
    ratings: {
      imdb: { score: 8.1, maxScore: 10, normalized: 8.1, voteCount: 155000, verdict: 'IMDb 8.1' },
      rottenTomatoes: { score: 75, maxScore: 100, normalized: 7.5, tomatometer: 75, popcornmeter: 86, criticsConsensus: '纯正的盖里奇风格狂欢，风度翩翩与血腥荒诞并存。', verdict: 'Fresh' },
      metacritic: { score: 67, maxScore: 100, normalized: 6.7, metascore: 67, userScore: 7.8 },
      douban: { score: 8.1, maxScore: 10, normalized: 8.1, voteCount: 98000, starDistribution: [35, 42, 20, 2.5, 0.5] },
      tmdb: { score: 8.1, maxScore: 10, normalized: 8.1, voteCount: 1300 }
    },
    radarDimensions: { criticPraise: 7.5, popularBuzz: 9.3, chineseTaste: 8.3, plotConsistency: 8.5, endingSatisfaction: 8.4 },
    aiInsight: {
      pros: ['西装革履与暴力美学反差强烈，卡雅·斯考达里奥女毒枭气场全开', '英式冷幽默、花哨剪辑与爵士乐选曲节奏飞快毫无尿点'],
      cons: ['典型盖里奇流水线爽剧模板，哲学深度稍显不足'],
      audienceFit: '喜欢《两杆大烟枪》《大侦探福尔摩斯》快节奏黑色幽默的观众。',
      avoidFit: '追求严肃深沉政治现实主义或文艺慢节奏的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 8.2,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'Refined Aggression', score: 8.2, votes: 21000 },
          { season: 1, episode: 8, title: 'The Gospel According to Bobby Glass', score: 8.5, votes: 24000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_gent_1', source: 'douban', author: '凌睿', rating: 8, date: '2024-03-12', content: '西装暴徒、英伦庄园、黑吃黑，盖里奇把电影版的精髓完美延展成了8集爽剧！', sentiment: 'positive', likes: 6200 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 26. 雷普利 (Ripley - 2024黑白美学神作)
  {
    id: 'ripley',
    title: '雷普利',
    originalTitle: 'Ripley',
    year: '2024',
    totalSeasons: 1,
    totalEpisodes: 8,
    status: 'Ended',
    genres: ['犯罪', '剧情', '悬疑', '黑色电影'],
    network: 'Netflix',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=80',
    summary: '纽约穷困潦倒的骗子汤姆·雷普利受富豪之托前往意大利劝说浪荡公子回国，却在窥见奢靡生活后萌生杀意，凭借高超伪造与冷酷心计步步取而代之。',
    compositeScore: 8.9,
    verdictTier: 'must_watch',
    tagline: '2024艾美奖最佳导演得主，全片极致黑白构图如卡拉瓦乔油画复活。',
    badges: ['2024黑白艺术殿堂', '安德鲁·斯科特封神', '艾美奖最佳导演', '审美天花板'],
    ratings: {
      imdb: { score: 8.2, maxScore: 10, normalized: 8.2, voteCount: 78000, verdict: '艺术片级口碑' },
      rottenTomatoes: { score: 86, maxScore: 100, normalized: 8.6, tomatometer: 86, popcornmeter: 82, criticsConsensus: '以近乎冷酷的极简主义黑白摄影与安德鲁·斯科特的蛇蝎魅力，铸造了现代黑色电影绝响。', verdict: 'Certified Fresh' },
      metacritic: { score: 75, maxScore: 100, normalized: 7.5, metascore: 75, userScore: 8.0 },
      douban: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 42000, starDistribution: [49, 36, 12, 2, 1] },
      tmdb: { score: 8.1, maxScore: 10, normalized: 8.1, voteCount: 680 }
    },
    radarDimensions: { criticPraise: 9.7, popularBuzz: 7.8, chineseTaste: 8.9, plotConsistency: 9.3, endingSatisfaction: 9.0 },
    aiInsight: {
      pros: ['每一帧光影构图与意大利石阶雕塑都如同大师油画，审美质感无敌', '安德鲁·斯科特将反社会人格的冷静、隐忍与病态优雅诠释得令人毛骨悚然'],
      cons: ['全黑白摄影且节奏极其沉静冷酷，习惯彩色爆米花的观众容易感觉催眠'],
      audienceFit: '摄影美学爱好者、黑色电影迷、喜欢艺术化冷峻犯罪故事的观众。',
      avoidFit: '追求快节奏打斗枪战、讨厌黑白画面的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 8.4,
        trend: 'up',
        episodes: [
          { season: 1, episode: 5, title: 'Lucio', score: 9.1, votes: 12000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_rip_1', source: 'douban', author: '大奇特', rating: 9, date: '2024-04-10', content: '卡拉瓦乔式的光影构图！这不是电视剧，这是流动的黑白雕塑！', sentiment: 'positive', likes: 4500 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 27. 毒枭 (Narcos)
  {
    id: 'narcos',
    title: '毒枭',
    originalTitle: 'Narcos',
    year: '2015 - 2017',
    totalSeasons: 3,
    totalEpisodes: 30,
    status: 'Ended',
    genres: ['犯罪', '剧情', '传记', '动作'],
    network: 'Netflix',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '哥伦比亚大毒枭巴勃罗·埃斯科瓦尔建立富可敌国的麦德林贩毒帝国，与美国缉毒局DEA特工以及哥伦比亚政府展开血腥殊死较量。',
    compositeScore: 9.2,
    verdictTier: 'must_watch',
    tagline: '魔幻现实主义的真实罪恶帝国，白银还是铅弹？',
    badges: ['犯罪纪实神作', '豆瓣9.3分', '魔幻现实主义', '全网高分'],
    ratings: {
      imdb: { score: 8.8, maxScore: 10, normalized: 8.8, voteCount: 460000, verdict: 'Top 250 #65' },
      rottenTomatoes: { score: 89, maxScore: 100, normalized: 8.9, tomatometer: 89, popcornmeter: 95, criticsConsensus: '以极具冲击力的纪录片风格与戏剧张力重塑了南美毒品战争。', verdict: 'Certified Fresh' },
      metacritic: { score: 77, maxScore: 100, normalized: 7.7, metascore: 77, userScore: 8.8 },
      douban: { score: 9.3, maxScore: 10, normalized: 9.3, voteCount: 160000, starDistribution: [72, 22, 5, 0.6, 0.4] },
      tmdb: { score: 8.4, maxScore: 10, normalized: 8.4, voteCount: 4800 }
    },
    radarDimensions: { criticPraise: 9.1, popularBuzz: 9.7, chineseTaste: 9.5, plotConsistency: 9.4, endingSatisfaction: 9.3 },
    aiInsight: {
      pros: ['瓦格纳·马拉饰演的巴勃罗霸气侧漏，穿插真实历史录像纪录片质感拉满', '剧情节奏飞快，直击南美政治黑幕与缉毒警残酷牺牲'],
      cons: ['大量西班牙语对白需要全程紧跟字幕'],
      audienceFit: '真实犯罪纪实、硬核枪战政治题材爱好者。',
      avoidFit: '抗拒看外语字幕、晕血或追求童话正义大团圆的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 10,
        averageScore: 8.9,
        trend: 'up',
        episodes: [
          { season: 1, episode: 10, title: 'Despegue', score: 9.2, votes: 24000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_nar_1', source: 'douban', author: '独孤岛主', rating: 10, date: '2016-09-10', content: '白银还是铅弹？拉美魔幻现实主义的真实体现，每一集都在燃烧荷尔蒙！', sentiment: 'positive', likes: 8800 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 28. 黄石 (Yellowstone)
  {
    id: 'yellowstone',
    title: '黄石',
    originalTitle: 'Yellowstone',
    year: '2018 - 2024',
    totalSeasons: 5,
    totalEpisodes: 53,
    status: 'Ended',
    genres: ['剧情', '西部'],
    network: 'Paramount+',
    poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80',
    summary: '蒙大拿州达顿家族守护美国最大的连片私人牧场，面临房地产巨头、印第安保留地和国家公园的多方蚕食，老达顿以铁血手腕捍卫土地誓约。',
    compositeScore: 8.8,
    verdictTier: 'must_watch',
    tagline: '现代美国西部最后的牛仔史诗，凯文·科斯特纳铁血谢幕之作。',
    badges: ['美国收视第一', '现代牛仔史诗', '硬核家族权力', '蒙大拿风光'],
    ratings: {
      imdb: { score: 8.7, maxScore: 10, normalized: 8.7, voteCount: 240000, verdict: '全美收视冠军' },
      rottenTomatoes: { score: 84, maxScore: 100, normalized: 8.4, tomatometer: 84, popcornmeter: 88, criticsConsensus: '以辽阔苍凉的西部风光与残酷家族博弈打动人心。', verdict: 'Certified Fresh' },
      metacritic: { score: 72, maxScore: 100, normalized: 7.2, metascore: 72, userScore: 8.3 },
      douban: { score: 9.1, maxScore: 10, normalized: 9.1, voteCount: 120000, starDistribution: [65, 26, 7, 1.2, 0.8] },
      tmdb: { score: 8.2, maxScore: 10, normalized: 8.2, voteCount: 2200 }
    },
    radarDimensions: { criticPraise: 8.5, popularBuzz: 9.8, chineseTaste: 9.3, plotConsistency: 8.8, endingSatisfaction: 8.5 },
    aiInsight: {
      pros: ['蒙大拿壮丽自然风光令人神往，凯文·科斯特纳老牛仔气场无敌', '贝丝·达顿毒舌狠辣战斗力爆表，家族互斗剧情极具张力'],
      cons: ['第五季后半程因主演凯文·科斯特纳档期冲突仓促收尾引发争议'],
      audienceFit: '西部牛仔迷、家族权力争斗、壮丽大自然风光爱好者。',
      avoidFit: '追求温和现代法治逻辑、反感蛮荒私刑道德模糊的观众。'
    },
    seasons: [
      {
        seasonNumber: 3,
        episodesCount: 10,
        averageScore: 9.1,
        trend: 'up',
        episodes: [
          { season: 3, episode: 10, title: 'The World Is Purple', score: 9.3, votes: 19000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_yel_1', source: 'douban', author: '大岛', rating: 9, date: '2020-08-25', content: '现代版教父骑在马上！风景美得令人窒息，达顿家族的狠劲太绝了！', sentiment: 'positive', likes: 7800 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 29. 怪奇物语 (Stranger Things)
  {
    id: 'stranger-things',
    title: '怪奇物语',
    originalTitle: 'Stranger Things',
    year: '2016 - 2025',
    totalSeasons: 5,
    totalEpisodes: 42,
    status: 'Returning Series',
    genres: ['科幻', '惊悚', '剧情', '冒险'],
    network: 'Netflix',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    summary: '80年代印第安纳州霍金斯小镇上，一名小男孩神秘失踪，朋友们在寻找他的过程中发现秘密政府实验、超能力女孩“小十一”与恐怖逆世界。',
    compositeScore: 9.1,
    verdictTier: 'must_watch',
    tagline: 'Netflix全球第一门面IP，80年代复古科幻与少年冒险的无敌浪漫。',
    badges: ['全球现象级', '复古科幻天花板', '收视率纪录', '零差评第四季'],
    ratings: {
      imdb: { score: 8.7, maxScore: 10, normalized: 8.7, voteCount: 1350000, verdict: 'Netflix总播放量第一' },
      rottenTomatoes: { score: 92, maxScore: 100, normalized: 9.2, tomatometer: 92, popcornmeter: 90, criticsConsensus: '以真挚的少年友情与对斯皮尔伯格、斯蒂芬·金的崇高致敬征服世界。', verdict: 'Certified Fresh' },
      metacritic: { score: 74, maxScore: 100, normalized: 7.4, metascore: 74, userScore: 8.4 },
      douban: { score: 8.9, maxScore: 10, normalized: 8.9, voteCount: 420000, starDistribution: [56, 33, 10, 0.8, 0.2] },
      tmdb: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 17000 }
    },
    radarDimensions: { criticPraise: 9.0, popularBuzz: 10.0, chineseTaste: 9.3, plotConsistency: 9.2, endingSatisfaction: 9.0 },
    aiInsight: {
      pros: ['80年代复古合成器配乐与年代感服化道氛围拉满', '第4季第4集麦克斯奔跑逃脱维克那名场面火遍全球，情绪张力封神'],
      cons: ['第三季商业喜剧化色彩略重，主角团随着年龄增长童趣有所减退'],
      audienceFit: '复古科幻、怪兽探险、友情成长题材爱好者。',
      avoidFit: '追求严谨硬核现代科技推导、反感少年儿童主角视角的观众。'
    },
    seasons: [
      {
        seasonNumber: 4,
        episodesCount: 9,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 4, episode: 4, title: 'Chapter Four: Dear Billy', score: 9.6, votes: 85000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_st_1', source: 'douban', author: '谋杀电视机', rating: 10, date: '2022-06-01', content: '第四季第四集Kate Bush的歌声一出来，麦克斯拼命奔跑那一幕，看呆了！完全封神！', sentiment: 'positive', likes: 18200 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 30. 黑袍纠察队 (The Boys)
  {
    id: 'the-boys',
    title: '黑袍纠察队',
    originalTitle: 'The Boys',
    year: '2019 - 2026',
    totalSeasons: 4,
    totalEpisodes: 32,
    status: 'Returning Series',
    genres: ['动作', '喜剧', '科幻', '犯罪'],
    network: 'Amazon Prime',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '超级英雄被跨国企业沃特公司包装成神明，私下却道德沦丧肆意践踏凡人。普通人屠夫带领纠察队展开以凡人之躯猎杀伪善超能恶棍的狂暴反抗。',
    compositeScore: 9.0,
    verdictTier: 'must_watch',
    tagline: '对超英虚伪面具最血腥辛辣的撕扯，祖国人演技封神！',
    badges: ['反超英神作', '血浆讽刺爆表', '祖国人名场面', '亚马逊牌面'],
    ratings: {
      imdb: { score: 8.7, maxScore: 10, normalized: 8.7, voteCount: 680000, verdict: 'IMDb 8.7' },
      rottenTomatoes: { score: 93, maxScore: 100, normalized: 9.3, tomatometer: 93, popcornmeter: 80, criticsConsensus: '血肉横飞、尖锐讽刺，无情解构了消费主义与名人偶像狂热。', verdict: 'Certified Fresh' },
      metacritic: { score: 77, maxScore: 100, normalized: 7.7, metascore: 77, userScore: 7.8 },
      douban: { score: 8.6, maxScore: 10, normalized: 8.6, voteCount: 290000, starDistribution: [52, 33, 13, 1.5, 0.5] },
      tmdb: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 9500 }
    },
    radarDimensions: { criticPraise: 8.9, popularBuzz: 9.9, chineseTaste: 9.0, plotConsistency: 8.8, endingSatisfaction: 8.8 },
    aiInsight: {
      pros: ['安东尼·斯塔尔饰演的祖国人微表情演技出神入化，既恐怖又巨婴', '反传统超英套路，政治讽刺与B级暴力血浆尺度极大爽感十足'],
      cons: ['第四季部分政治讽刺过于直白刻意，主线推进略显拖沓'],
      audienceFit: '对传统漫威DC超级英雄审美疲劳、喜欢黑色幽默大尺度爽剧的观众。',
      avoidFit: '对人体爆裂血腥画面不适、追求伟光正英雄正义的观众。'
    },
    seasons: [
      {
        seasonNumber: 3,
        episodesCount: 8,
        averageScore: 8.9,
        trend: 'up',
        episodes: [
          { season: 3, episode: 6, title: 'Herogasm', score: 9.5, votes: 55000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_boys_1', source: 'douban', author: '亵渎电影', rating: 9, date: '2022-07-10', content: '祖国人绝对是近十年美剧最成功的反派角色，把自卑、巨婴和嗜血演到了骨子里！', sentiment: 'positive', likes: 11000 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 31. 白莲花度假村 (The White Lotus)
  {
    id: 'the-white-lotus',
    title: '白莲花度假村',
    originalTitle: 'The White Lotus',
    year: '2021 - ',
    totalSeasons: 2,
    totalEpisodes: 13,
    status: 'Returning Series',
    genres: ['喜剧', '剧情', '悬疑'],
    network: 'HBO / Max',
    poster: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    summary: '夏威夷与西西里岛奢华度假酒店中，富豪住客与卑微员工展开关于阶级特权、性欲支配与金钱伪善的荒诞黑色喜剧，每季以一具尸体倒叙开局。',
    compositeScore: 8.8,
    verdictTier: 'must_watch',
    tagline: 'HBO横扫艾美奖的黑色讽刺神作，詹妮佛·库里奇封神演出。',
    badges: ['艾美奖大满贯', '中产与富豪阶级讽刺', '詹妮佛·库里奇', 'HBO台柱'],
    ratings: {
      imdb: { score: 8.0, maxScore: 10, normalized: 8.0, voteCount: 220000, verdict: '艾美奖大满贯' },
      rottenTomatoes: { score: 92, maxScore: 100, normalized: 9.2, tomatometer: 92, popcornmeter: 82, criticsConsensus: '以令人心神不宁的刺痛感和顶级群戏，完成了对特权假象的犀利嘲讽。', verdict: 'Certified Fresh' },
      metacritic: { score: 82, maxScore: 100, normalized: 8.2, metascore: 82, userScore: 8.1 },
      douban: { score: 8.3, maxScore: 10, normalized: 8.3, voteCount: 180000, starDistribution: [40, 42, 16, 1.5, 0.5] },
      tmdb: { score: 7.7, maxScore: 10, normalized: 7.7, voteCount: 1600 }
    },
    radarDimensions: { criticPraise: 9.4, popularBuzz: 9.2, chineseTaste: 8.5, plotConsistency: 9.0, endingSatisfaction: 8.8 },
    aiInsight: {
      pros: ['麦克·怀特剧本对中产虚伪与阶级压榨剖析得入木三分，配乐诡异洗脑', '第二季西西里岛情欲与谋杀悬念拉满，詹妮佛·库里奇贡献终生难忘表演'],
      cons: ['剧情偏冷眼旁观式黑色讽刺，没有传统意义上的正面高光英雄'],
      audienceFit: '社会阶级讽刺、黑色幽默与高质量群戏爱好者。',
      avoidFit: '追求快节奏打怪升级、期待善恶有报大团圆的观众。'
    },
    seasons: [
      {
        seasonNumber: 2,
        episodesCount: 7,
        averageScore: 8.7,
        trend: 'up',
        episodes: [
          { season: 2, episode: 7, title: 'Arrivederci', score: 9.1, votes: 31000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_wl_1', source: 'douban', author: 'LOOK', rating: 9, date: '2022-12-15', content: '第二季比第一季更毒辣！把富人的傲慢与穷人的投机写得像刀子一样锋利。', sentiment: 'positive', likes: 7400 }
    ],
    lastUpdated: '2026-11-15 08:30'
  },

  // 32. 摩登家庭 (Modern Family)
  {
    id: 'modern-family',
    title: '摩登家庭',
    originalTitle: 'Modern Family',
    year: '2009 - 2020',
    totalSeasons: 11,
    totalEpisodes: 250,
    status: 'Ended',
    genres: ['喜剧', '家庭'],
    network: 'ABC / Disney+',
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
    summary: '伪纪录片形式记录加州普里切特三代家庭的爆笑日常：老少配跨国恋、传统模范家庭与同性收养家庭，在琐碎争吵中流淌着最温暖深沉的爱。',
    compositeScore: 9.5,
    verdictTier: 'masterpiece',
    tagline: '连续五年横扫艾美奖最佳喜剧，豆瓣9.8分无可撼动的家庭温情天花板。',
    badges: ['艾美奖五连冠', '豆瓣9.8分', '全网封神殿', '治愈下饭第一剧'],
    ratings: {
      imdb: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 520000, verdict: '家庭喜剧第一' },
      rottenTomatoes: { score: 85, maxScore: 100, normalized: 8.5, tomatometer: 85, popcornmeter: 89, criticsConsensus: '以敏锐的现代家庭视角与无懈可击的群像喜剧节奏带来长久温暖。', verdict: 'Certified Fresh' },
      metacritic: { score: 87, maxScore: 100, normalized: 8.7, metascore: 87, userScore: 8.6 },
      douban: { score: 9.8, maxScore: 10, normalized: 9.8, voteCount: 480000, starDistribution: [88, 10, 1.7, 0.2, 0.1] },
      tmdb: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 4600 }
    },
    radarDimensions: { criticPraise: 9.1, popularBuzz: 9.8, chineseTaste: 9.9, plotConsistency: 9.6, endingSatisfaction: 9.8 },
    aiInsight: {
      pros: ['伪纪录片对着镜头挑眉吐槽设计绝妙，菲尔、歌洛莉亚等每个人物都可爱至极', '笑中带泪，每集结尾的温情独白是全世界无数人沮丧时的精神避难所'],
      cons: ['篇幅达11季，后期部分孩子长大后的剧情有轻微重复套路'],
      audienceFit: '所有需要温暖治愈、下饭剧与学习地道美语口语的观众。',
      avoidFit: '追求严谨主线剧情、反感生活琐碎家常的观众。'
    },
    seasons: [
      {
        seasonNumber: 11,
        episodesCount: 18,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 11, episode: 18, title: 'Finale Part 2', score: 9.4, votes: 24000, isMilestone: true }
        ]
      }
    ],
    comments: [
      { id: 'c_mod_1', source: 'douban', author: '桃桃淘电影', rating: 10, date: '2020-04-10', content: '再见了邓菲一家！这十一年有你们的陪伴，生活好像也没那么糟糕了。', sentiment: 'positive', likes: 16500 }
    ],
    lastUpdated: '2026-11-15 08:30'
  }
];

