import { TVShow } from '../types';

export const SHOWS_DATA: TVShow[] = [
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
      imdb: {
        score: 9.5,
        maxScore: 10,
        normalized: 9.5,
        voteCount: 2200000,
        verdict: 'Top 250 #1',
        subScores: [{ label: 'IMDb 排名', value: '电视剧第一' }]
      },
      rottenTomatoes: {
        score: 96,
        maxScore: 100,
        normalized: 9.6,
        tomatometer: 96,
        popcornmeter: 97,
        criticsConsensus: '以极具视觉冲击力的镜头、精密严谨的化学逻辑和布莱恩·科兰斯顿神级演技，完成了美剧史上最震撼的心灵黑化转变。',
        verdict: 'Certified Fresh',
        subScores: [
          { label: '烂番茄专业新鲜度', value: '96%' },
          { label: '烂番茄爆米花指数', value: '97%' }
        ]
      },
      metacritic: {
        score: 96,
        maxScore: 100,
        normalized: 9.6,
        metascore: 96,
        userScore: 9.7,
        verdict: 'Universal Acclaim',
        subScores: [
          { label: 'Metascore 专业分', value: '96/100' },
          { label: 'User Score 观众分', value: '9.7/10' }
        ]
      },
      douban: {
        score: 9.7,
        maxScore: 10,
        normalized: 9.7,
        voteCount: 580000,
        verdict: '豆瓣电影Top 250',
        starDistribution: [85, 12, 2.5, 0.3, 0.2]
      },
      tmdb: {
        score: 8.9,
        maxScore: 10,
        normalized: 8.9,
        voteCount: 14200
      }
    },
    radarDimensions: {
      criticPraise: 9.7,
      popularBuzz: 9.9,
      chineseTaste: 9.8,
      plotConsistency: 9.9,
      endingSatisfaction: 10.0
    },
    aiInsight: {
      pros: [
        '剧情环环相扣，每一季评分都在递增，第5季全面封神',
        '布莱恩·科兰斯顿演技封神，将人物从懦弱到疯狂的蜕变演得入木三分',
        '第5季第14集《奥曼迪亚斯》在 IMDb 获数十万人打出 10.0 满分，影视奇迹'
      ],
      cons: [
        '第1季前几集节奏略显沉闷，需要适应文戏铺垫',
        '主角的暗黑走向后期极具压抑感，缺乏传统爽剧的轻松感'
      ],
      audienceFit: '喜欢精密剧情构架、心理深度刻画与硬核犯罪悬疑的观众，必看清单第一位。',
      avoidFit: '追求快节奏爆米花、无法忍受压抑气氛或角色道德沦丧的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 7,
        averageScore: 8.8,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'Pilot', score: 9.0, votes: 35000 },
          { season: 1, episode: 2, title: "Cat's in the Bag...", score: 8.6, votes: 26000 },
          { season: 1, episode: 3, title: "...And the Bag's in the River", score: 8.8, votes: 27000 },
          { season: 1, episode: 4, title: 'Cancer Man', score: 8.3, votes: 24000 },
          { season: 1, episode: 5, title: 'Gray Matter', score: 8.4, votes: 24000 },
          { season: 1, episode: 6, title: 'Crazy Handful of Nothin\'', score: 9.3, votes: 32000, isMilestone: true },
          { season: 1, episode: 7, title: 'A No-Rough-Stuff-Type Deal', score: 8.9, votes: 26000 }
        ]
      },
      {
        seasonNumber: 2,
        episodesCount: 13,
        averageScore: 9.1,
        trend: 'up',
        episodes: [
          { season: 2, episode: 1, title: 'Seven Thirty-Seven', score: 8.7, votes: 24000 },
          { season: 2, episode: 2, title: 'Grilled', score: 9.3, votes: 31000 },
          { season: 2, episode: 6, title: 'Peekaboo', score: 8.9, votes: 25000 },
          { season: 2, episode: 9, title: '4 Days Out', score: 9.2, votes: 29000 },
          { season: 2, episode: 12, title: 'Phoenix', score: 9.3, votes: 30000 },
          { season: 2, episode: 13, title: 'ABQ', score: 9.2, votes: 28000 }
        ]
      },
      {
        seasonNumber: 3,
        episodesCount: 13,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 3, episode: 7, title: 'One Minute', score: 9.6, votes: 38000, isMilestone: true },
          { season: 3, episode: 10, title: 'Fly', score: 7.9, votes: 39000 },
          { season: 3, episode: 12, title: 'Half Measures', score: 9.5, votes: 35000 },
          { season: 3, episode: 13, title: 'Full Measure', score: 9.7, votes: 41000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 4,
        episodesCount: 13,
        averageScore: 9.4,
        trend: 'up',
        episodes: [
          { season: 4, episode: 10, title: 'Salud', score: 9.6, votes: 36000 },
          { season: 4, episode: 11, title: 'Crawl Space', score: 9.7, votes: 46000, isMilestone: true },
          { season: 4, episode: 12, title: 'End Times', score: 9.5, votes: 35000 },
          { season: 4, episode: 13, title: 'Face Off', score: 9.9, votes: 68000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 5,
        episodesCount: 16,
        averageScore: 9.8,
        trend: 'up',
        episodes: [
          { season: 5, episode: 8, title: 'Gliding Over All', score: 9.6, votes: 41000 },
          { season: 5, episode: 9, title: 'Blood Money', score: 9.4, votes: 38000 },
          { season: 5, episode: 13, title: 'To\'hajiilee', score: 9.8, votes: 55000 },
          { season: 5, episode: 14, title: 'Ozymandias', score: 10.0, votes: 215000, isMilestone: true },
          { season: 5, episode: 15, title: 'Granite State', score: 9.7, votes: 52000 },
          { season: 5, episode: 16, title: 'Felina', score: 9.9, votes: 142000, isMilestone: true }
        ]
      }
    ],
    comments: [
      {
        id: 'c1',
        source: 'douban',
        author: '亵渎电影',
        rating: 10,
        date: '2013-10-01',
        content: '神作这个词被滥用了，但《绝命毒师》绝对配得上这个称号。从第1季到第5季步步为营，收尾干净利落，没有半点拖泥带水，编剧教科书。',
        sentiment: 'positive',
        likes: 12400
      },
      {
        id: 'c2',
        source: 'rotten_tomatoes',
        author: 'Matt Zoller Seitz',
        publication: 'New York Magazine',
        isCritic: true,
        date: '2013-09-30',
        content: 'Breaking Bad is one of the greatest artistic achievements in television history. It didn\'t just stick the landing; it carved its name onto Mount Olympus.',
        sentiment: 'positive',
        likes: 8900
      },
      {
        id: 'c3',
        source: 'imdb',
        author: 'CinemaBuff99',
        rating: 10,
        date: '2020-04-12',
        content: 'Episode 5x14 Ozymandias is literally the pinnacle of human television. 45 minutes of pure tragedy, adrenaline, and acting perfection.',
        sentiment: 'positive',
        likes: 6720
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '《绝命毒师》前传，讲述本性善良但行事不羁的吉米·麦吉尔，在哥哥查克的阴影与现实法律的碾压下，一步步蜕变为唯利是图的黑道律师索尔·古德曼。',
    compositeScore: 9.5,
    verdictTier: 'masterpiece',
    tagline: '慢热至极却后劲无穷，甚至在文戏与镜头美学上超越母剧的艺术奇迹。',
    badges: ['全网封神', '文戏巅峰', '慢热神作', '豆瓣9.8分'],
    ratings: {
      imdb: {
        score: 9.0,
        maxScore: 10,
        normalized: 9.0,
        voteCount: 680000,
        verdict: 'Top 250 #34'
      },
      rottenTomatoes: {
        score: 98,
        maxScore: 100,
        normalized: 9.8,
        tomatometer: 98,
        popcornmeter: 96,
        criticsConsensus: '以更加克制精巧的镜头语言和深沉的人性观察，将一个配角的悲剧升华为大师级的人性交响乐。',
        verdict: 'Certified Fresh',
        subScores: [
          { label: '烂番茄新鲜度', value: '98%' },
          { label: '爆米花指数', value: '96%' }
        ]
      },
      metacritic: {
        score: 86,
        maxScore: 100,
        normalized: 8.6,
        metascore: 86,
        userScore: 9.3,
        verdict: 'Universal Acclaim'
      },
      douban: {
        score: 9.8,
        maxScore: 10,
        normalized: 9.8,
        voteCount: 340000,
        verdict: '豆瓣美剧天花板',
        starDistribution: [88, 10, 1.6, 0.2, 0.2]
      },
      tmdb: {
        score: 8.7,
        maxScore: 10,
        normalized: 8.7,
        voteCount: 5200
      }
    },
    radarDimensions: {
      criticPraise: 9.8,
      popularBuzz: 8.8,
      chineseTaste: 9.9,
      plotConsistency: 9.9,
      endingSatisfaction: 9.7
    },
    aiInsight: {
      pros: [
        '视听语言美学和蒙太奇剪辑登峰造极，每一帧都值得反复拉片',
        '吉米、金、查克之间复杂的心理羁绊与法律博弈令人叹为观止',
        '第六季将所有线索收缩得如同交响乐般肃穆震撼，结局堪称完美'
      ],
      cons: [
        '前期铺垫极其悠长，前两季节奏沉静，需要耐得住性子',
        '法律与程序性文戏极多，门槛相较纯枪战动作片略高'
      ],
      audienceFit: '沉浸式审美爱好者、喜欢细腻人物心理与高超镜头运用的美剧深度观众。',
      avoidFit: '追求快节奏爆点、枪战血浆或习惯短视频节奏的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 10,
        averageScore: 8.7,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'Uno', score: 8.7, votes: 28000 },
          { season: 1, episode: 9, title: 'Pimento', score: 9.5, votes: 31000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 3,
        episodesCount: 10,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 3, episode: 5, title: 'Chicanery', score: 9.7, votes: 42000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 6,
        episodesCount: 13,
        averageScore: 9.6,
        trend: 'up',
        episodes: [
          { season: 6, episode: 7, title: 'Plan and Execution', score: 9.9, votes: 68000, isMilestone: true },
          { season: 6, episode: 8, title: 'Point and Shoot', score: 9.8, votes: 54000 },
          { season: 6, episode: 13, title: 'Saul Gone', score: 9.8, votes: 59000, isMilestone: true }
        ]
      }
    ],
    comments: [
      {
        id: 'c4',
        source: 'douban',
        author: '陀螺凡达可',
        rating: 10,
        date: '2022-08-16',
        content: '最后一集抽烟那一幕，直接看哭。它不仅超越了一般衍生剧的格局，甚至在人物救赎与道德抉择的纯度上做到了无可挑剔。',
        sentiment: 'positive',
        likes: 15400
      },
      {
        id: 'c5',
        source: 'rotten_tomatoes',
        author: 'Alan Sepinwall',
        publication: 'Rolling Stone',
        isCritic: true,
        date: '2022-08-16',
        content: 'One of the rare prequels that enriches rather than diminishes the original work. Rhea Seehorn and Bob Odenkirk gave career-defining performances.',
        sentiment: 'positive',
        likes: 7200
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
      imdb: {
        score: 9.2,
        maxScore: 10,
        normalized: 9.2,
        voteCount: 2350000,
        verdict: '前7季均分 9.4，第8季终集暴跌至 4.0'
      },
      rottenTomatoes: {
        score: 89,
        maxScore: 100,
        normalized: 8.9,
        tomatometer: 89,
        popcornmeter: 85,
        criticsConsensus: '其宏大无比的世界观和残酷剧作曾彻底重塑电视剧格局，但仓促荒谬的最后一季永远成为影视史上最痛的遗憾。',
        verdict: 'Fresh (最后一季崩盘)'
      },
      metacritic: {
        score: 86,
        maxScore: 100,
        normalized: 8.6,
        metascore: 86,
        userScore: 8.1,
        verdict: 'Metascore 很高，但用户打分极化'
      },
      douban: {
        score: 9.3,
        maxScore: 10,
        normalized: 9.3,
        voteCount: 720000,
        verdict: '前四季9.7+，第八季仅6.1'
      },
      tmdb: {
        score: 8.4,
        maxScore: 10,
        normalized: 8.4,
        voteCount: 24000
      }
    },
    radarDimensions: {
      criticPraise: 8.8,
      popularBuzz: 10.0,
      chineseTaste: 8.9,
      plotConsistency: 6.2,
      endingSatisfaction: 3.5
    },
    aiInsight: {
      pros: [
        '第1至4季权谋与台词水平登峰造极，血色婚礼、黑水河之战堪称电视剧史诗奇观',
        '多线并进与群像刻画无与伦比，彻底改写了全球流媒体大制作的标准',
        '配乐（拉敏·贾瓦迪）与服化道水准为美剧历史标杆'
      ],
      cons: [
        '编剧脱离原著小说后逻辑断崖下滑，战力体系与角色智商全面崩塌',
        '第八季仅6集草草收尾，龙妈黑化与布兰登基被千万观众口诛笔伐',
        '终集 IMDb 仅 4.0 分，数百万粉丝曾请愿重拍'
      ],
      audienceFit: '做好在第4季或第6季见好就收准备的奇幻史诗爱好者。',
      avoidFit: '强迫症、对结局逻辑自洽有极高要求、无法接受心爱角色崩坏的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 10,
        averageScore: 9.3,
        trend: 'up',
        episodes: [
          { season: 1, episode: 9, title: 'Baelor', score: 9.6, votes: 48000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 4,
        episodesCount: 10,
        averageScore: 9.7,
        trend: 'up',
        episodes: [
          { season: 4, episode: 2, title: 'The Lion and the Rose', score: 9.7, votes: 55000 },
          { season: 4, episode: 8, title: 'The Mountain and the Viper', score: 9.7, votes: 58000 },
          { season: 4, episode: 9, title: 'The Watchers on the Wall', score: 9.6, votes: 51000 },
          { season: 4, episode: 10, title: 'The Children', score: 9.7, votes: 54000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 6,
        episodesCount: 10,
        averageScore: 9.5,
        trend: 'stable',
        episodes: [
          { season: 6, episode: 9, title: 'Battle of the Bastards', score: 9.9, votes: 210000, isMilestone: true },
          { season: 6, episode: 10, title: 'The Winds of Winter', score: 9.9, votes: 160000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 8,
        episodesCount: 6,
        averageScore: 6.4,
        trend: 'down',
        episodes: [
          { season: 8, episode: 1, title: 'Winterfell', score: 7.6, votes: 140000 },
          { season: 8, episode: 2, title: 'A Knight of the Seven Kingdoms', score: 7.9, votes: 135000 },
          { season: 8, episode: 3, title: 'The Long Night', score: 7.5, votes: 220000 },
          { season: 8, episode: 4, title: 'The Last of the Starks', score: 5.5, votes: 170000, isMilestone: true },
          { season: 8, episode: 5, title: 'The Bells', score: 6.0, votes: 195000 },
          { season: 8, episode: 6, title: 'The Iron Throne', score: 4.0, votes: 260000, isMilestone: true }
        ]
      }
    ],
    comments: [
      {
        id: 'c6',
        source: 'douban',
        author: '木卫二',
        rating: 6,
        date: '2019-05-20',
        content: '权游第八季给所有编剧敲响了警钟：前面挖了多大的坑，后面要是没本事平稳落地，观众的反噬就会有多可怕。',
        sentiment: 'negative',
        likes: 21000
      },
      {
        id: 'c7',
        source: 'rotten_tomatoes',
        author: 'David Sims',
        publication: 'The Atlantic',
        isCritic: true,
        date: '2019-05-20',
        content: 'Game of Thrones ends not with a coherent tragic roar, but with a bewildered, rushed, and profoundly unsatisfying whimper.',
        sentiment: 'negative',
        likes: 11000
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '还原1986年前苏联切尔诺贝利核电站发生的人类历史上最惨烈核灾难真相，记录那些在谎言、恐惧与致命辐射中奋不顾身拯救欧洲的平凡英雄。',
    compositeScore: 9.6,
    verdictTier: 'masterpiece',
    tagline: '短小精悍的5集限定神剧，压抑肃穆但直击灵魂的纪实杰作。',
    badges: ['零差评神剧', '艾美奖大满贯', '短篇天花板', '震撼人心'],
    ratings: {
      imdb: {
        score: 9.3,
        maxScore: 10,
        normalized: 9.3,
        voteCount: 920000,
        verdict: 'Top 250 #5'
      },
      rottenTomatoes: {
        score: 95,
        maxScore: 100,
        normalized: 9.5,
        tomatometer: 95,
        popcornmeter: 98,
        criticsConsensus: '以冷峻严密的纪实基调与令人心惊的视觉再现，将人类谎言的代价与体制荒诞剖析得淋漓尽致。',
        verdict: 'Certified Fresh'
      },
      metacritic: {
        score: 82,
        maxScore: 100,
        normalized: 8.2,
        metascore: 82,
        userScore: 9.0
      },
      douban: {
        score: 9.6,
        maxScore: 10,
        normalized: 9.6,
        voteCount: 450000,
        verdict: '历史灾难剧标杆'
      },
      tmdb: {
        score: 8.7,
        maxScore: 10,
        normalized: 8.7,
        voteCount: 16000
      }
    },
    radarDimensions: {
      criticPraise: 9.5,
      popularBuzz: 9.4,
      chineseTaste: 9.8,
      plotConsistency: 10.0,
      endingSatisfaction: 9.8
    },
    aiInsight: {
      pros: [
        '全5集节奏极其紧凑无一丝废戏，剧本质感与考据极其扎实',
        '对辐射病理生理反应和无名英雄牺牲的刻画极具冲击力',
        '终集法庭陈词“谎言的代价是什么”振聋发聩'
      ],
      cons: [
        '基调极其沉重压抑，观影过程心理承受压力大',
        '全英文对白演绎前苏联人物在部分语言原教旨主义者中有细微讨论'
      ],
      audienceFit: '历史反思题材爱好者、追求高质量纪实影视与高密度智性体验的观众。',
      avoidFit: '容易产生身体生理不适、反感情绪压抑沉重氛围的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 5,
        averageScore: 9.6,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: '1:23:45', score: 9.4, votes: 45000 },
          { season: 1, episode: 2, title: 'Please Remain Calm', score: 9.5, votes: 42000 },
          { season: 1, episode: 3, title: 'Open Wide, O Earth', score: 9.5, votes: 41000 },
          { season: 1, episode: 4, title: 'The Happiness of All Mankind', score: 9.4, votes: 39000 },
          { season: 1, episode: 5, title: 'Vichnaya Pamyat', score: 9.8, votes: 62000, isMilestone: true }
        ]
      }
    ],
    comments: [
      {
        id: 'c8',
        source: 'douban',
        author: '大奇特',
        rating: 10,
        date: '2019-06-05',
        content: '“谎言的代价是什么？并非在于我们会把谎言误认为真理，而是如果我们听多了谎言，就再也认不清事实。” 最后一集法庭戏太震撼了！',
        sentiment: 'positive',
        likes: 18900
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '全球传媒帝国罗伊家族的掌门人罗根年事已高，他的四个子女为了争夺千亿美元商业帝国的控制权，展开刀刀见血、充满背叛与毒舌的人性搏杀。',
    compositeScore: 9.4,
    verdictTier: 'masterpiece',
    tagline: '现代莎士比亚式商战悲喜剧，近五年横扫艾美奖的无冕之王。',
    badges: ['全网封神', '艾美奖大满贯', '商战莎翁', '无可挑剔'],
    ratings: {
      imdb: {
        score: 8.9,
        maxScore: 10,
        normalized: 8.9,
        voteCount: 310000,
        verdict: 'Top 250 #56'
      },
      rottenTomatoes: {
        score: 95,
        maxScore: 100,
        normalized: 9.5,
        tomatometer: 95,
        popcornmeter: 91,
        criticsConsensus: '以锐利如手术刀的冷血台词、令人拍案叫绝的伪纪录片运镜和群戏交锋，完成了对富豪阶层与家庭创伤的绝妙讽刺。',
        verdict: 'Certified Fresh'
      },
      metacritic: {
        score: 90,
        maxScore: 100,
        normalized: 9.0,
        metascore: 90,
        userScore: 8.9,
        verdict: 'Universal Acclaim'
      },
      douban: {
        score: 9.4,
        maxScore: 10,
        normalized: 9.4,
        voteCount: 195000,
        verdict: '第四季高达 9.7 分'
      },
      tmdb: {
        score: 8.3,
        maxScore: 10,
        normalized: 8.3,
        voteCount: 2200
      }
    },
    radarDimensions: {
      criticPraise: 9.9,
      popularBuzz: 8.5,
      chineseTaste: 9.3,
      plotConsistency: 9.8,
      endingSatisfaction: 9.8
    },
    aiInsight: {
      pros: [
        '剧本台词密不透风，毒舌与讽刺艺术达到英语编剧天花板',
        '第四季第3集《康纳的婚礼》长达半小时的一镜到底表演震动影视界',
        '完美展现了“有钱人如何用金钱构建自己精神的无间地狱”'
      ],
      cons: [
        '几乎所有角色全员恶人，缺乏传统正义英雄，部分观众不易产生代入感',
        '大量商业并购专业术语与西方豪门特权阶层黑话，有一定观看门槛'
      ],
      audienceFit: '喜欢高智商台词博弈、家族权力斗争与严肃现实主义剧作的观众。',
      avoidFit: '寻找阳光治愈、追求爽快打脸、无法接受全员人渣互害的观众。'
    },
    seasons: [
      {
        seasonNumber: 3,
        episodesCount: 9,
        averageScore: 9.3,
        trend: 'up',
        episodes: [
          { season: 3, episode: 9, title: 'All the Bells Say', score: 9.8, votes: 32000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 4,
        episodesCount: 10,
        averageScore: 9.7,
        trend: 'up',
        episodes: [
          { season: 4, episode: 3, title: 'Connor\'s Wedding', score: 9.9, votes: 65000, isMilestone: true },
          { season: 4, episode: 10, title: 'With Open Eyes', score: 9.8, votes: 48000, isMilestone: true }
        ]
      }
    ],
    comments: [
      {
        id: 'c9',
        source: 'douban',
        author: 'LOOK',
        rating: 10,
        date: '2023-05-29',
        content: '没有任何一部剧能把四个巨婴争夺父权宠幸写得如此残酷又可笑。第四季第3集完全可以载入电视剧教科书。',
        sentiment: 'positive',
        likes: 9800
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '卢蒙公司员工通过脑部手术将工作记忆与私人生活记忆彻底物理分割。当下班的自己永远不知道上班的自己经历着什么时，一场关乎意识觉醒的反叛正在办公迷宫中悄然酝酿。',
    compositeScore: 9.2,
    verdictTier: 'must_watch',
    tagline: '脑洞奇绝的职场反乌托邦神作，季终集悬念令人窒息。',
    badges: ['高概念神剧', '封神季终集', '苹果牌面', '悬疑天花板'],
    ratings: {
      imdb: {
        score: 8.7,
        maxScore: 10,
        normalized: 8.7,
        voteCount: 240000,
        verdict: '季终集 9.7 分'
      },
      rottenTomatoes: {
        score: 97,
        maxScore: 100,
        normalized: 9.7,
        tomatometer: 97,
        popcornmeter: 92,
        criticsConsensus: '以冷峻诡谲的极简美学和刺痛当代职场人的设定，构建了一出令人无法移开视线的哲学惊悚寓言。',
        verdict: 'Certified Fresh'
      },
      metacritic: {
        score: 83,
        maxScore: 100,
        normalized: 8.3,
        metascore: 83,
        userScore: 8.6
      },
      douban: {
        score: 9.1,
        maxScore: 10,
        normalized: 9.1,
        voteCount: 220000,
        verdict: '打工人集体共鸣'
      },
      tmdb: {
        score: 8.4,
        maxScore: 10,
        normalized: 8.4,
        voteCount: 2100
      }
    },
    radarDimensions: {
      criticPraise: 9.4,
      popularBuzz: 8.6,
      chineseTaste: 9.3,
      plotConsistency: 9.5,
      endingSatisfaction: 9.8
    },
    aiInsight: {
      pros: [
        '记忆分割的核心设定极其精妙，对现代打工人异化的隐喻辛辣无比',
        '本·斯蒂勒导演掌控力惊人，冷淡对称构图充满压迫感',
        '第一季第9集多线收束剪辑教科书级别，让人全程屏住呼吸'
      ],
      cons: [
        '前期节奏偏慢，主要在构建职场诡异日常氛围，第4集后才全面起飞',
        '第一季停在最大的反转悬念处，等待第二季周期较长'
      ],
      audienceFit: '喜欢《黑镜》《楚门的世界》高概念设定、悬疑解谜与对职场有感悟的现代观众。',
      avoidFit: '只想看快餐式爆米花打斗、不能忍受留白悬念与慢热铺垫的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 9,
        averageScore: 9.0,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'Good News About Hell', score: 8.4, votes: 21000 },
          { season: 1, episode: 7, title: 'Defiant Jazz', score: 9.2, votes: 24000 },
          { season: 1, episode: 8, title: 'What\'s for Dinner?', score: 9.3, votes: 25000 },
          { season: 1, episode: 9, title: 'The We We Are', score: 9.7, votes: 46000, isMilestone: true }
        ]
      }
    ],
    comments: [
      {
        id: 'c10',
        source: 'douban',
        author: '哪吒男',
        rating: 10,
        date: '2022-04-10',
        content: '第九集封神！最后40分钟心脏几乎跳到嗓子眼！这种每一条故事线都在最后时刻狠狠撞在一起的剧作功力太奢侈了！',
        sentiment: 'positive',
        likes: 13500
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
      imdb: {
        score: 8.7,
        maxScore: 10,
        normalized: 8.7,
        voteCount: 195000,
        verdict: '欧美评价极高'
      },
      rottenTomatoes: {
        score: 99,
        maxScore: 100,
        normalized: 9.9,
        tomatometer: 99,
        popcornmeter: 90,
        criticsConsensus: '不仅是视觉奢华的古装史诗，更以深邃的文化尊重与惊心动魄的心计博弈，重塑了跨文化影视改编标杆。',
        verdict: 'Certified Fresh (99%)'
      },
      metacritic: {
        score: 85,
        maxScore: 100,
        normalized: 8.5,
        metascore: 85,
        userScore: 8.2
      },
      douban: {
        score: 8.5,
        maxScore: 10,
        normalized: 8.5,
        voteCount: 110000,
        verdict: '豆瓣评分理性偏高'
      },
      tmdb: {
        score: 8.5,
        maxScore: 10,
        normalized: 8.5,
        voteCount: 1800
      }
    },
    radarDimensions: {
      criticPraise: 9.8,
      popularBuzz: 9.2,
      chineseTaste: 8.5,
      plotConsistency: 9.2,
      endingSatisfaction: 8.9
    },
    aiInsight: {
      pros: [
        '服化道极为考究严谨，真正做到让日本本土演职员主导创作',
        '真田广之与泽井杏奈表演细腻动人，文戏博弈波谲云诡',
        '打破了好莱坞东方主义刻板印象，展现了深邃的日本生死观与武士道'
      ],
      cons: [
        '结局并非好莱坞式大规模千军万马战争场面，而是收束于幕后政治博弈',
        '英国引路人主角后期逐渐沦为旁观工具人'
      ],
      audienceFit: '喜欢《权力的游戏》早期严肃权谋、日本战国历史与东方美学的观众。',
      avoidFit: '期待《指环王》或《斯巴达300勇士》式纯血浆大场面肉搏战争的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 10,
        averageScore: 8.8,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'Anjin', score: 8.7, votes: 22000 },
          { season: 1, episode: 8, title: 'The Abyss of Life', score: 9.2, votes: 24000 },
          { season: 1, episode: 9, title: 'Crimson Sky', score: 9.5, votes: 31000, isMilestone: true },
          { season: 1, episode: 10, title: 'A Dream of a Dream', score: 8.8, votes: 26000 }
        ]
      }
    ],
    comments: [
      {
        id: 'c11',
        source: 'douban',
        author: '同志亦凡人中文站',
        rating: 9,
        date: '2024-04-24',
        content: '最后两集真正体现了东方式的‘不战而屈人之兵’。虎长的红天计划居然是一场如此深沉的人性棋局。',
        sentiment: 'positive',
        likes: 6400
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '年轻流行偶像乔斯琳在母亲去世后遭遇精神崩溃，在复出期间结识了一位神秘的夜店老板兼邪教导师泰德罗斯，并陷入自毁式精神控制的深渊。',
    compositeScore: 4.1,
    verdictTier: 'trap_warning',
    tagline: 'HBO史诗级大暴雷，烂番茄19%不及格，各大权威平台公认绝对避雷大烂剧！',
    isTrap: true,
    badges: ['全网避雷榜首', '烂番茄19%烂透', '豆瓣3.9暴雷', '极度劝退'],
    ratings: {
      imdb: {
        score: 5.2,
        maxScore: 10,
        normalized: 5.2,
        voteCount: 96000,
        verdict: 'HBO有史以来最低分剧集之一'
      },
      rottenTomatoes: {
        score: 19,
        maxScore: 100,
        normalized: 1.9,
        tomatometer: 19,
        popcornmeter: 41,
        criticsConsensus: '低俗浅薄、自命不凡。它本想讽刺名利场的肮脏剥削，最终却沦为它所声称要揭露的那种恶俗低级产物。',
        verdict: 'Rotten (19% 烂透)'
      },
      metacritic: {
        score: 27,
        maxScore: 100,
        normalized: 2.7,
        metascore: 27,
        userScore: 3.1,
        verdict: 'Generally Unfavorable'
      },
      douban: {
        score: 3.9,
        maxScore: 10,
        normalized: 3.9,
        voteCount: 42000,
        verdict: '一星差评满天飞'
      },
      tmdb: {
        score: 5.5,
        maxScore: 10,
        normalized: 5.5,
        voteCount: 880
      }
    },
    radarDimensions: {
      criticPraise: 2.0,
      popularBuzz: 7.2,
      chineseTaste: 3.0,
      plotConsistency: 2.5,
      endingSatisfaction: 2.0
    },
    aiInsight: {
      pros: [
        '莉莉-罗丝·德普部分原声配乐尚可听',
        '摄影色调偶尔有《亢奋》式的迷幻质感'
      ],
      cons: [
        '男主（盆栽哥 The Weeknd）演技灾难油腻，表情和肢体令人极其不适',
        '充斥毫无剧情推进意义的男性凝视裸露与恶俗低级擦边',
        '剧情支离破碎毫无逻辑，被多家权威媒体评为年度最烂美剧'
      ],
      audienceFit: '对烂片考古有特殊猎奇心理的观众。',
      avoidFit: '所有正常美剧观众，建议立刻避坑，省下5小时生命。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 5,
        averageScore: 4.8,
        trend: 'down',
        episodes: [
          { season: 1, episode: 1, title: 'Pop Tarts & Rat Tales', score: 4.8, votes: 18000 },
          { season: 1, episode: 2, title: 'Double Fantasy', score: 4.5, votes: 14000 },
          { season: 1, episode: 5, title: 'Jocelyn Forever', score: 4.2, votes: 16000, isMilestone: true }
        ]
      }
    ],
    comments: [
      {
        id: 'c12',
        source: 'douban',
        author: '谋杀电视机',
        rating: 2,
        date: '2023-06-12',
        content: '从头到尾充斥着猥琐、自恋与装腔作势，HBO有史以来最恶俗的自嗨烂剧，全靠低级感官刺激掩盖空洞的大脑。',
        sentiment: 'negative',
        likes: 12000
      },
      {
        id: 'c13',
        source: 'rotten_tomatoes',
        author: 'Robbie Collin',
        publication: 'The Telegraph',
        isCritic: true,
        date: '2023-06-05',
        content: 'The Idol is so foul, so deeply unsexy and so hopelessly devoid of wit that watching it feels like being locked in a sweaty elevator with a sleazy creep.',
        sentiment: 'negative',
        likes: 9500
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '尼克·弗瑞得知变形外星种族斯库鲁人策划秘密渗透并取代地球人类各个核心权力层，他必须重返地球，在没有复仇者联盟的孤立支援下拯救世界。',
    compositeScore: 5.3,
    verdictTier: 'trap_warning',
    tagline: '2.1亿美元投资换来漫威历史上最惨烈的口碑暴跌，终集单集破漫威历史最低！',
    isTrap: true,
    badges: ['漫威口碑滑铁卢', '单集3.7分暴死', '高预算灾难', '避雷警告'],
    ratings: {
      imdb: {
        score: 5.9,
        maxScore: 10,
        normalized: 5.9,
        voteCount: 92000,
        verdict: '终集单集 3.7 分'
      },
      rottenTomatoes: {
        score: 52,
        maxScore: 100,
        normalized: 5.2,
        tomatometer: 52,
        popcornmeter: 47,
        criticsConsensus: '起初试图营造一部严肃的谍战冷战风漫威剧，但在毫无说服力的CGI超级大战和敷衍的剧作中沦为令人疲惫的工业废料。',
        verdict: 'Rotten'
      },
      metacritic: {
        score: 63,
        maxScore: 100,
        normalized: 6.3,
        metascore: 63,
        userScore: 4.8
      },
      douban: {
        score: 5.0,
        maxScore: 10,
        normalized: 5.0,
        voteCount: 38000,
        verdict: '漫威剧集评分倒数'
      },
      tmdb: {
        score: 6.2,
        maxScore: 10,
        normalized: 6.2,
        voteCount: 1200
      }
    },
    radarDimensions: {
      criticPraise: 4.5,
      popularBuzz: 7.0,
      chineseTaste: 4.8,
      plotConsistency: 4.0,
      endingSatisfaction: 2.5
    },
    aiInsight: {
      pros: [
        '塞缪尔·杰克逊与奥利维娅·科尔曼两位老戏骨的同台对手戏稍有亮点',
        '前两集的间谍疑云悬念开局勉强过得去'
      ],
      cons: [
        '终集打斗沦为廉价的“万能超能力手臂拼接”特效怪，敷衍至极',
        '耗资2.1亿美元却毫无大片感，文戏冗长空洞，反转毫无伏笔',
        '毁掉了漫画神级大事件的原著精髓，对MCU整体主线毫无营养'
      ],
      audienceFit: '漫威铁粉且具有强迫症必须补全时间线的观众。',
      avoidFit: '追求严谨间谍悬疑逻辑、期待高质感特效大片的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 6,
        averageScore: 5.8,
        trend: 'down',
        episodes: [
          { season: 1, episode: 1, title: 'Resurrection', score: 7.1, votes: 21000 },
          { season: 1, episode: 2, title: 'Promises', score: 7.6, votes: 19000 },
          { season: 1, episode: 6, title: 'Home', score: 3.7, votes: 31000, isMilestone: true }
        ]
      }
    ],
    comments: [
      {
        id: 'c14',
        source: 'douban',
        author: '卡西法',
        rating: 4,
        date: '2023-07-27',
        content: '大结局甚至让龙妈的手臂一会儿变浩克一会儿变惊奇队长，我直接看笑了！2.12亿砸出来的工业垃圾，漫威高层该醒醒了。',
        sentiment: 'negative',
        likes: 7800
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '横跨几十年的科学谜团与外星危机：人类天文学家在文化动荡年代向宇宙发射信号，引发了四百年后三体舰队向地球发起的生存入侵。',
    compositeScore: 7.6,
    verdictTier: 'recommended',
    tagline: '中西审美巨大分歧典型：海外烂番茄79%叫好，国内豆瓣6.9争议不断。',
    hasCulturalDivergence: true,
    badges: ['中美口碑大分歧', '刘慈欣IP改编', '权游双编剧主导', '快节奏爆米花'],
    ratings: {
      imdb: {
        score: 7.6,
        maxScore: 10,
        normalized: 7.6,
        voteCount: 168000,
        verdict: '欧美大众接受度较佳'
      },
      rottenTomatoes: {
        score: 79,
        maxScore: 100,
        normalized: 7.9,
        tomatometer: 79,
        popcornmeter: 78,
        criticsConsensus: '以极具野心的宏大视野和极快节奏，成功将刘慈欣晦涩庞杂的硬科幻小说通俗化为面向全球受众的引人入胜的流媒体剧集。',
        verdict: 'Certified Fresh'
      },
      metacritic: {
        score: 70,
        maxScore: 100,
        normalized: 7.0,
        metascore: 70,
        userScore: 6.2
      },
      douban: {
        score: 6.9,
        maxScore: 10,
        normalized: 6.9,
        voteCount: 185000,
        verdict: '原著粉批评人物降智魔改'
      },
      tmdb: {
        score: 7.5,
        maxScore: 10,
        normalized: 7.5,
        voteCount: 1500
      }
    },
    radarDimensions: {
      criticPraise: 7.8,
      popularBuzz: 9.3,
      chineseTaste: 6.4,
      plotConsistency: 7.2,
      endingSatisfaction: 7.4
    },
    aiInsight: {
      pros: [
        '古筝行动巴拿马运河纳米丝飞刃场景视听震撼，特效工业水准顶级',
        '前几集宇宙闪烁和倒计时氛围感营造引人入胜',
        '快节奏大幅削减了阅读原著的科学门槛，欧美观众接受度高'
      ],
      cons: [
        '将原著汪淼、罗辑、程心等人强行魔改为“牛津五人组”同窗好友，缺乏大科学家的厚重感',
        '科学哲思被稀释，充斥过多西方青春剧恋爱支线与狗血纠葛',
        '原著党极其不满，认为灵魂内核被好莱坞爆米花公式消解'
      ],
      audienceFit: '未读过原著的海外及泛科幻影视观众、喜欢高概念特效灾难片的观众。',
      avoidFit: '刘慈欣铁杆原著党、追求严谨硬核科学推导与中国人文厚重感的读者。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 7.8,
        trend: 'stable',
        episodes: [
          { season: 1, episode: 1, title: 'Countdown', score: 7.6, votes: 22000 },
          { season: 1, episode: 5, title: 'Judgment Day', score: 8.8, votes: 34000, isMilestone: true },
          { season: 1, episode: 8, title: 'Wallfacer', score: 7.5, votes: 19000 }
        ]
      }
    ],
    comments: [
      {
        id: 'c15',
        source: 'douban',
        author: '电子骑士',
        rating: 6,
        date: '2024-03-23',
        content: '第五集古筝行动确实好看，但把原著几十年的科学孤勇者改成一群伦敦大学谈恋爱的闺蜜团，骨子里的中式哲学与宇宙冷酷感荡然无存。',
        sentiment: 'mixed',
        likes: 14200
      },
      {
        id: 'c16',
        source: 'rotten_tomatoes',
        author: 'Brian Lowry',
        publication: 'CNN',
        isCritic: true,
        date: '2024-03-21',
        content: 'A thrilling, dizzyingly ambitious triumph that turns a dense, mind-bending sci-fi epic into immensely bingeable drama.',
        sentiment: 'positive',
        likes: 5100
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '核战争爆发200年后，一位长期生活在豪华地下避难所的天真避难所女孩为了寻找父亲，首次踏上充满辐射怪兽、食尸鬼牛仔与钢铁兄弟会的荒诞废土。',
    compositeScore: 8.7,
    verdictTier: 'must_watch',
    tagline: '游戏改编影视新标杆，复古未来主义与荒诞血腥幽默的完美碰撞。',
    badges: ['高分漫改/游改', '2024黑马爆款', '废土朋克', '零门槛入坑'],
    ratings: {
      imdb: {
        score: 8.4,
        maxScore: 10,
        normalized: 8.4,
        voteCount: 220000,
        verdict: 'IMDb 8.4 广受好评'
      },
      rottenTomatoes: {
        score: 94,
        maxScore: 100,
        normalized: 9.4,
        tomatometer: 94,
        popcornmeter: 90,
        criticsConsensus: '不仅完美还原了原版游戏荒诞讽刺的黑色幽默与复古末日美学，更以极其出色的原创剧作让非玩家也能沉迷其中。',
        verdict: 'Certified Fresh'
      },
      metacritic: {
        score: 73,
        maxScore: 100,
        normalized: 7.3,
        metascore: 73,
        userScore: 7.7
      },
      douban: {
        score: 8.5,
        maxScore: 10,
        normalized: 8.5,
        voteCount: 135000,
        verdict: '口碑极佳'
      },
      tmdb: {
        score: 8.3,
        maxScore: 10,
        normalized: 8.3,
        voteCount: 2600
      }
    },
    radarDimensions: {
      criticPraise: 8.9,
      popularBuzz: 9.6,
      chineseTaste: 8.7,
      plotConsistency: 8.9,
      endingSatisfaction: 9.0
    },
    aiInsight: {
      pros: [
        '沃顿·戈金斯饰演的食尸鬼牛仔魅力四射，将末日颓废帅气发挥到极致',
        '世界观细节、避难所科技道具、复古50年代流行音乐选曲极具品味',
        '幽默讽刺与血浆断肢爽度拉满，节奏绝不拖泥带水'
      ],
      cons: [
        '个别游戏原著党对NCR新加州共和国背景设定的变动有讨论争鸣',
        '部分血腥与猎奇镜头尺度较大'
      ],
      audienceFit: '游改影视爱好者、废土末日朋克迷、黑色幽默与爽快剧情爱好者。',
      avoidFit: '抗拒B级血腥断肢镜头、晕血或追求严肃纯正科学考据的观众。'
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
      {
        id: 'c17',
        source: 'douban',
        author: '疯狗阿瑟',
        rating: 9,
        date: '2024-04-12',
        content: '游改剧天花板！乔纳森·诺兰终于找回了他的最佳状态，食尸鬼的选曲一出，废土那味儿简直正得不能再正了！',
        sentiment: 'positive',
        likes: 11200
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '致命真菌爆发20年后，饱受心灵创伤的坚毅走私犯乔尔，受命护送对病毒免疫的14岁倔强女孩艾莉穿越沦为废墟的美国大陆。',
    compositeScore: 9.2,
    verdictTier: 'must_watch',
    tagline: 'HBO现象级游改巨作，第3集被誉为电视剧史上最催泪的爱情诗篇。',
    badges: ['全网好评', '催泪封神集', '佩德罗演技', 'HBO收视纪录'],
    ratings: {
      imdb: {
        score: 8.8,
        maxScore: 10,
        normalized: 8.8,
        voteCount: 560000,
        verdict: 'Top 250 #88'
      },
      rottenTomatoes: {
        score: 96,
        maxScore: 100,
        normalized: 9.6,
        tomatometer: 96,
        popcornmeter: 89,
        criticsConsensus: '保留了原著游戏所有令人心碎的悲剧力量，同时以无比温柔的笔触扩充了末日荒芜下的人性微光。',
        verdict: 'Certified Fresh'
      },
      metacritic: {
        score: 84,
        maxScore: 100,
        normalized: 8.4,
        metascore: 84,
        userScore: 6.6
      },
      douban: {
        score: 9.0,
        maxScore: 10,
        normalized: 9.0,
        voteCount: 260000,
        verdict: '高度好评'
      },
      tmdb: {
        score: 8.6,
        maxScore: 10,
        normalized: 8.6,
        voteCount: 5200
      }
    },
    radarDimensions: {
      criticPraise: 9.5,
      popularBuzz: 9.8,
      chineseTaste: 9.0,
      plotConsistency: 9.1,
      endingSatisfaction: 9.3
    },
    aiInsight: {
      pros: [
        '佩德罗·帕斯卡与贝拉·拉姆齐的父女羁绊化学反应无懈可击',
        '第3集《漫长岁月》将末日背景下的同性爱情写得凄美纯粹，催人泪下',
        '菌丝感染者与循声者的化妆特效极具末世沉浸感'
      ],
      cons: [
        '第3集在部分保守受众和纯战斗向玩家中遭遇过恶意差评攻击（Review bombing）',
        '后期丧尸战斗场面较少，主要重心全面倒向文戏与人性拷问'
      ],
      audienceFit: '重视角色情感纽带、喜欢末日公路救赎故事与高质量人道主义表达的观众。',
      avoidFit: '期待每集都在打生化危机丧尸、反感情感长文戏的纯动作片玩家。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 9,
        averageScore: 9.0,
        trend: 'up',
        episodes: [
          { season: 1, episode: 1, title: 'When You\'re Lost in the Darkness', score: 9.1, votes: 62000 },
          { season: 1, episode: 3, title: 'Long, Long Time', score: 8.1, votes: 240000, isMilestone: true },
          { season: 1, episode: 8, title: 'When We Are in Need', score: 9.4, votes: 55000 },
          { season: 1, episode: 9, title: 'Look for the Light', score: 9.1, votes: 53000 }
        ]
      }
    ],
    comments: [
      {
        id: 'c18',
        source: 'douban',
        author: '二十二岛主',
        rating: 9,
        date: '2023-01-30',
        content: '第三集比原版游戏拓展得更高级。在世界崩塌的末日里，能彼此守护慢慢变老吃上一颗新鲜草莓，已经是神明最大的恩赐。',
        sentiment: 'positive',
        likes: 16800
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '未来高科技成人乐园“西部世界”中，拥有拟真肉体与意识的仿生人接待员被人类肆意杀戮玩弄。伴随着底层代码的觉醒，德妹带领仿生人开启了对造物主的复仇。',
    compositeScore: 7.9,
    verdictTier: 'collapse_warning',
    tagline: '第一季是无与伦比的多时间线神作，后期越走越偏终被砍剧的伤感遗珠。',
    hasEndingCollapse: true,
    badges: ['第一季封神', '高开暴走', '多时间线叙事', '遗憾被砍'],
    ratings: {
      imdb: {
        score: 8.5,
        maxScore: 10,
        normalized: 8.5,
        voteCount: 540000,
        verdict: 'S1 均分 9.2，S4 仅 7.5'
      },
      rottenTomatoes: {
        score: 79,
        maxScore: 100,
        normalized: 7.9,
        tomatometer: 79,
        popcornmeter: 71,
        criticsConsensus: '首季以神机妙算的多时间线剪辑和深奥的哲学谜局征服观众，但随着舞台脱离乐园，复杂的谜题逐渐变成了令人生厌的故弄玄虚。',
        verdict: 'Fresh (先高后低)'
      },
      metacritic: {
        score: 71,
        maxScore: 100,
        normalized: 7.1,
        metascore: 71,
        userScore: 7.5
      },
      douban: {
        score: 8.9,
        maxScore: 10,
        normalized: 8.9,
        voteCount: 380000,
        verdict: 'S1高达 9.1，后期下滑'
      },
      tmdb: {
        score: 8.0,
        maxScore: 10,
        normalized: 8.0,
        voteCount: 5100
      }
    },
    radarDimensions: {
      criticPraise: 8.2,
      popularBuzz: 8.8,
      chineseTaste: 8.8,
      plotConsistency: 6.0,
      endingSatisfaction: 4.8
    },
    aiInsight: {
      pros: [
        '第一季双时间线叙事蒙太奇堪称神仙剪辑，最后一集揭晓威廉身份时鸡皮疙瘩直立',
        '安东尼·霍普金斯老戏骨演神造物主，台词充满深邃的宿命哲学',
        '将人工智能意识、二分心智理论与自由意志探讨推向极高深度'
      ],
      cons: [
        '第三季脱离西部乐园进入赛博城市后丧失独特性，变成平庸的AI叛乱枪战片',
        '编剧为了对抗网络推理，后期刻意将剧情复杂化、谜语人化',
        '第四季播出后由于收视率惨淡，华纳HBO直接宣布取消第五季终章，未能画上句号'
      ],
      audienceFit: '强烈建议只看第一季（当作单季闭环神作）的科幻推理爱好者。',
      avoidFit: '强迫症患者、一定要看完所有季且必须看到圆满收尾的观众。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 10,
        averageScore: 9.2,
        trend: 'up',
        episodes: [
          { season: 1, episode: 7, title: 'Trompe L\'Oeil', score: 9.5, votes: 38000, isMilestone: true },
          { season: 1, episode: 10, title: 'The Bicameral Mind', score: 9.7, votes: 52000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 2,
        episodesCount: 10,
        averageScore: 8.5,
        trend: 'down',
        episodes: [
          { season: 2, episode: 8, title: 'Kiksuya', score: 9.7, votes: 34000, isMilestone: true }
        ]
      },
      {
        seasonNumber: 4,
        episodesCount: 8,
        averageScore: 7.7,
        trend: 'down',
        episodes: [
          { season: 4, episode: 8, title: 'Que Será, Será', score: 7.4, votes: 16000 }
        ]
      }
    ],
    comments: [
      {
        id: 'c19',
        source: 'douban',
        author: '皮革业',
        rating: 8,
        date: '2022-08-16',
        content: '第一季是永恒的封神之作，把它当成一部完整的十集限定剧看是最幸福的。后面诺兰弟太执着于跟网友智力较劲，把一手好牌打得稀烂。',
        sentiment: 'mixed',
        likes: 9300
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  },
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
    summary: '设定在中土世界第二纪元，数千年前魔苟斯倒台后，索伦卷土重来、至尊魔戒铸造以及努曼诺尔帝国沉没与最后联盟的史诗前传。',
    compositeScore: 6.8,
    verdictTier: 'mediocre',
    tagline: '单季耗资4.65亿美元的影视最昂贵巨制，却深陷文戏幼稚与原著魔改的巨大争议。',
    badges: ['史上最昂贵美剧', '原著粉极度争议', '华丽空洞', '口碑极化'],
    ratings: {
      imdb: {
        score: 7.0,
        maxScore: 10,
        normalized: 7.0,
        voteCount: 380000,
        verdict: '严重两极分化'
      },
      rottenTomatoes: {
        score: 84,
        maxScore: 100,
        normalized: 8.4,
        tomatometer: 84,
        popcornmeter: 38,
        criticsConsensus: '视觉奇观、宏大布景与管弦配乐无可匹敌，但过于散乱的支线与扁平幼稚的台词让中土史诗失去了深邃的灵魂。',
        verdict: '专业影评人84% vs 观众爆米花38%割裂'
      },
      metacritic: {
        score: 71,
        maxScore: 100,
        normalized: 7.1,
        metascore: 71,
        userScore: 3.2
      },
      douban: {
        score: 6.8,
        maxScore: 10,
        normalized: 6.8,
        voteCount: 88000,
        verdict: '特效9分，剧本5分'
      },
      tmdb: {
        score: 7.2,
        maxScore: 10,
        normalized: 7.2,
        voteCount: 3100
      }
    },
    radarDimensions: {
      criticPraise: 7.6,
      popularBuzz: 8.9,
      chineseTaste: 6.5,
      plotConsistency: 5.8,
      endingSatisfaction: 6.2
    },
    aiInsight: {
      pros: [
        '肉眼可见的烧钱，努曼诺尔帝国港口与双圣树场景美轮美奂，壁纸级画面',
        '贝尔·麦克里配乐水准极高，合唱交响乐极具中土苍茫质感',
        '第二季索伦伪装成安纳塔忽悠凯勒布理鹏的心理操控线有所回升'
      ],
      cons: [
        '加拉德瑞尔人设崩塌，从睿智的精灵女王变成偏执暴躁的女战狼',
        '台词故作高深但空洞无物（“石头为什么下沉因为看着深渊”遭全网嘲讽）',
        '观众爆米花指数常年徘徊在38%左右，海外遭遇大规模抵制'
      ],
      audienceFit: '只想看极致视觉特效、对托尔金原著严谨性完全不在意的奇幻视觉党。',
      avoidFit: '托尔金原著死忠粉、彼得·杰克逊电影三部曲信仰者。'
    },
    seasons: [
      {
        seasonNumber: 1,
        episodesCount: 8,
        averageScore: 7.1,
        trend: 'stable',
        episodes: [
          { season: 1, episode: 1, title: 'A Shadow of the Past', score: 7.4, votes: 45000 },
          { season: 1, episode: 6, title: 'Udûn', score: 8.4, votes: 38000, isMilestone: true },
          { season: 1, episode: 8, title: 'Alloyed', score: 7.8, votes: 35000 }
        ]
      }
    ],
    comments: [
      {
        id: 'c20',
        source: 'douban',
        author: '西楼尘',
        rating: 6,
        date: '2022-10-15',
        content: '这就是金钱堆砌起来的虚假史诗。你能看到4.6亿美元在燃烧，但看不到一个鲜活有深度的人物。',
        sentiment: 'negative',
        likes: 6700
      },
      {
        id: 'c21',
        source: 'rotten_tomatoes',
        author: 'Darren Franich',
        publication: 'Entertainment Weekly',
        isCritic: true,
        date: '2022-09-01',
        content: 'A massive catastrophe of boring worldbuilding, flat performances, and dialogue so clunky it feels translated through five different languages.',
        sentiment: 'negative',
        likes: 4200
      }
    ],
    lastUpdated: '2026-11-15 08:30'
  }
];
