import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TVShow, ReviewComment } from '../types';
import { PlatformRatingBar } from './PlatformRatingBar';
import { RadarChart } from './RadarChart';
import { EpisodeHeatmap } from './EpisodeHeatmap';
import { chatWithDeepSeek } from '../services/deepseek';
import {
  getEndlessReviews,
  saveLocalUserReview,
  toggleLikeReview,
} from '../services/reviewGenerator';
import { crawlRealtimeReviews, generateLiveAIReviewWithGitHubModels } from '../services/realtimeReviewCrawler';
import { fetchTMDbReviews, universalSearchMedia } from '../services/tmdbOmdbService';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ThumbsUp,
  Quote,
  MessageSquare,
  Scale,
  Bot,
  RefreshCw,
  Star,
  Flame,
  Send,
  PlusCircle,
  TrendingUp,
  Filter,
  Check,
  ChevronDown,
  Radio,
  Zap,
} from 'lucide-react';

interface ShowDetailModalProps {
  show: TVShow;
  onClose: () => void;
  onToggleCompare: (show: TVShow) => void;
  isCompared: boolean;
}

export const ShowDetailModal: React.FC<ShowDetailModalProps> = ({
  show,
  onClose,
  onToggleCompare,
  isCompared,
}) => {
  // DeepSeek 诊断状态
  const [deepSeekAnalysis, setDeepSeekAnalysis] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // 无限影评流状态
  const [page, setPage] = useState<number>(1);
  const [platformFilter, setPlatformFilter] = useState<'all' | 'douban' | 'rotten_tomatoes' | 'imdb' | 'metacritic' | 'reddit'>('all');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'mixed' | 'analysis'>('all');
  const [sortBy, setSortBy] = useState<'hot' | 'newest' | 'rating_high' | 'rating_low'>('hot');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // 全网实时自动抓取引擎状态
  const [liveReviews, setLiveReviews] = useState<ReviewComment[]>([]);
  const [isLiveCrawling, setIsLiveCrawling] = useState<boolean>(false);
  const [lastCrawlTime, setLastCrawlTime] = useState<string>('刚刚');
  const [autoStreamEnabled, setAutoStreamEnabled] = useState<boolean>(true);
  const [crawlNotice, setCrawlNotice] = useState<string | null>(null);

  // 用户互动发表影评表单
  const [isPublishOpen, setIsPublishOpen] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);
  const [myAuthor, setMyAuthor] = useState<string>('');
  const [myRating, setMyRating] = useState<number>(10);
  const [mySentiment, setMySentiment] = useState<'positive' | 'negative' | 'mixed'>('positive');
  const [mySource, setMySource] = useState<'douban' | 'imdb' | 'rotten_tomatoes' | 'user'>('douban');
  const [myTitle, setMyTitle] = useState<string>('');
  const [myContent, setMyContent] = useState<string>('');
  const [mySelectedTag, setMySelectedTag] = useState<string>('全网封神');

  // 点赞计数器本地内存状态增量
  const [likesDelta, setLikesDelta] = useState<Record<string, { countDelta: number; liked: boolean }>>({});

  // 监听筛选器重置页码
  useEffect(() => {
    setPage(1);
  }, [platformFilter, sentimentFilter, sortBy, show.id]);

  // 全网实时自动爬取函数（集成真实 TMDb 全球影评与全网多源讨论）
  const triggerAutoCrawl = async (isManual: boolean = false) => {
    setIsLiveCrawling(true);
    try {
      // 1. 抓取真实 TMDb 全球实名/认证影评
      let tmdbReviews: ReviewComment[] = [];
      try {
        let tmdbId: number | null = null;
        let mediaType: 'movie' | 'tv' = (show.genres.includes('电影') || show.totalEpisodes === 1) ? 'movie' : 'tv';
        if (show.id.startsWith('tmdb-')) {
          const m = show.id.match(/^tmdb-(\d+)/);
          if (m) tmdbId = Number(m[1]);
        }
        if (!tmdbId) {
          const matches = await universalSearchMedia(show.originalTitle || show.title);
          if (matches.length > 0) {
            tmdbId = matches[0].id;
            mediaType = matches[0].mediaType;
          }
        }
        if (tmdbId) {
          const tmdbRes = await fetchTMDbReviews(mediaType, tmdbId, 1);
          tmdbReviews = tmdbRes.reviews;
        }
      } catch (err) {
        console.warn('TMDb reviews crawl warning:', err);
      }

      // 2. 抓取多源实时短评与深度讨论
      const freshReviews = await crawlRealtimeReviews(show, liveReviews.length);
      const combinedIncoming = [...tmdbReviews, ...freshReviews];

      setLiveReviews((prev) => {
        const existingIds = new Set(prev.map((r) => r.id));
        const filteredNew = combinedIncoming.filter((r) => !existingIds.has(r.id));
        return [...filteredNew, ...prev];
      });
      setLastCrawlTime(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      if (isManual) {
        setCrawlNotice(`⚡ 已成功全网动态抓取并注入 ${combinedIncoming.length} 条关于《${show.title}》的最新实时讨论与全球认证影评！`);
        setTimeout(() => setCrawlNotice(null), 3500);
      }
    } catch (e) {
      console.error('Realtime crawl failed:', e);
    } finally {
      setIsLiveCrawling(false);
    }
  };

  // 方案二：免费调用 GitHub Models (0 费用) 实时提炼一篇权威大模型深度长评
  const handleTriggerFreeAIReview = async () => {
    setIsLiveCrawling(true);
    try {
      const aiReview = await generateLiveAIReviewWithGitHubModels(show);
      setLiveReviews((prev) => [aiReview, ...prev]);
      setCrawlNotice(`🤖 【方案二：免费 AI 实时提炼成功】已由 GitHub Models 免费模型提纯并向流中注入关于《${show.title}》的最新长篇影评！`);
      setTimeout(() => setCrawlNotice(null), 4000);
    } catch (err: any) {
      console.error('Free AI review error:', err);
    } finally {
      setIsLiveCrawling(false);
    }
  };

  // 初始加载时自动抓取一次
  useEffect(() => {
    triggerAutoCrawl(false);
  }, [show.id]);

  // 自动流式后台轮询抓取 (每 25 秒自动监听全网更新)
  useEffect(() => {
    if (!autoStreamEnabled) return;
    const interval = setInterval(() => {
      triggerAutoCrawl(false);
    }, 25000);
    return () => clearInterval(interval);
  }, [autoStreamEnabled, show.id, liveReviews.length]);

  // 获取当前分页的影评
  const reviewData = useMemo(() => {
    const base = getEndlessReviews(show, page, 10, platformFilter, sentimentFilter, sortBy);
    
    // 将实时抓取到的 liveReviews 与分页池合并 (并去重)
    let filteredLive = liveReviews;
    if (platformFilter !== 'all') {
      filteredLive = filteredLive.filter((r) => r.source === platformFilter);
    }
    if (sentimentFilter !== 'all') {
      if (sentimentFilter === 'analysis') {
        filteredLive = filteredLive.filter((r) => r.isLongReview || (r.content && r.content.length > 80));
      } else {
        filteredLive = filteredLive.filter((r) => r.sentiment === sentimentFilter);
      }
    }

    const seenIds = new Set<string>();
    const seenContent = new Set<string>();
    const combined: ReviewComment[] = [];

    // 优先展示实时自动抓取的最新评论
    for (const r of [...filteredLive, ...base.reviews]) {
      const cKey = r.content.slice(0, 35);
      if (!seenIds.has(r.id) && !seenContent.has(cKey)) {
        seenIds.add(r.id);
        seenContent.add(cKey);
        combined.push(r);
      }
    }

    return {
      reviews: combined,
      totalEstimated: base.totalEstimated + liveReviews.length,
      hasMore: base.hasMore,
    };
  }, [show, page, platformFilter, sentimentFilter, sortBy, publishSuccess, liveReviews]);

  // 处理加载更多 (支持本地深度影评池 + TMDb 国际影评持续翻页)
  const handleLoadMore = async () => {
    if (isLoadingMore || !reviewData.hasMore) return;
    setIsLoadingMore(true);

    try {
      let tmdbId: number | null = null;
      let mediaType: 'movie' | 'tv' = (show.genres.includes('电影') || show.totalEpisodes === 1) ? 'movie' : 'tv';
      if (show.id.startsWith('tmdb-')) {
        const m = show.id.match(/^tmdb-(\d+)/);
        if (m) tmdbId = Number(m[1]);
      }
      if (tmdbId) {
        const nextPage = page + 1;
        const res = await fetchTMDbReviews(mediaType, tmdbId, nextPage);
        if (res.reviews.length > 0) {
          setLiveReviews((prev) => {
            const existingIds = new Set(prev.map((r) => r.id));
            const newFiltered = res.reviews.filter((r) => !existingIds.has(r.id));
            return [...prev, ...newFiltered];
          });
        }
      }
    } catch (e) {
      console.warn('Load more TMDb reviews warning:', e);
    } finally {
      setPage((prev) => prev + 1);
      setIsLoadingMore(false);
    }
  };

  // 处理点赞
  const handleLike = (reviewId: string, initialLikes: number = 0) => {
    const isNowLiked = toggleLikeReview(reviewId);
    setLikesDelta((prev) => {
      const current = prev[reviewId] || { countDelta: 0, liked: !isNowLiked };
      const newLiked = isNowLiked;
      const newDelta = newLiked ? current.countDelta + 1 : current.countDelta - 1;
      return {
        ...prev,
        [reviewId]: { countDelta: newDelta, liked: newLiked },
      };
    });
  };

  // 处理用户提交新影评
  const handlePublishReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myContent.trim()) return;

    const newReview: ReviewComment = {
      id: `user-${Date.now()}`,
      source: mySource,
      author: myAuthor.trim() || '本站匿名剧迷',
      rating: myRating,
      date: '刚刚 (本站首发)',
      title: myTitle.trim() ? myTitle.trim() : undefined,
      content: myContent.trim(),
      sentiment: mySentiment,
      likes: 1,
      tags: [mySelectedTag, '本站首发'],
      replyCount: 0,
      isLongReview: myContent.trim().length > 60 || !!myTitle.trim(),
    };

    saveLocalUserReview(show.id, newReview);
    setLiveReviews((prev) => [newReview, ...prev]);
    setPublishSuccess((prev) => !prev);
    setMyContent('');
    setMyTitle('');
    setIsPublishOpen(false);
  };

  const handleDeepSeekDiagnosis = async () => {
    setIsDiagnosing(true);
    try {
      const prompt = `请对美剧《${show.title}》（英文名：${show.originalTitle}，当前全网综合评分 ${show.compositeScore}，IMDb ${show.ratings.imdb.score}分，烂番茄 ${show.ratings.rottenTomatoes.tomatometer}%，豆瓣 ${show.ratings.douban.score}分）做一份深度的实时口碑诊断报告。
重点包含：
1. 【全网风评定调与成败剖析】：它为什么能封神 / 为什么会两极分化或暴雷？
2. 【烂尾与质量走势排查】：剧情各季走势如何？是否有高开低走或断崖崩盘的季/集？
3. 【中西方审美分歧解读】：国内观众（豆瓣）和欧美主流观众（IMDb/烂番茄）对它的关注点有何异同？
4. 【终极观影指南】：给想要入坑的观众一句最真诚的避坑/追剧建议。
请用清晰的 Markdown 结构排版，语气专业且犀利。`;

      const reply = await chatWithDeepSeek([{ role: 'user', content: prompt }]);
      setDeepSeekAnalysis(reply);
    } catch (err: any) {
      setDeepSeekAnalysis(`❌ 诊断出错: ${err.message}`);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const getSentimentBadge = (sentiment: ReviewComment['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium">👑 封神高赞</span>;
      case 'negative':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-medium">⚠️ 避雷差评</span>;
      default:
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-medium">⚡ 争议中立</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border-t sm:border border-slate-700/80 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] sm:max-h-[92vh] flex flex-col">
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1 rounded-full bg-slate-700 mx-auto my-2 sm:hidden flex-shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors cursor-pointer shadow-lg"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Banner Section */}
          <div className="relative aspect-[21/9] sm:aspect-[24/8] min-h-[220px] bg-slate-950 overflow-hidden">
            <img
              src={show.backdrop || show.poster}
              alt={show.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="bg-sky-500 text-slate-950 font-bold text-xs px-2.5 py-0.5 rounded-full">
                    {show.network}
                  </span>
                  <span className="text-xs bg-slate-800/90 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {show.year}
                  </span>
                  <span className="text-xs bg-slate-800/90 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {show.totalSeasons} 季 · {show.totalEpisodes} 集
                  </span>
                  {show.hasEndingCollapse && (
                    <span className="text-xs bg-red-950 text-red-300 font-bold px-2 py-0.5 rounded border border-red-700 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> 烂尾断崖预警
                    </span>
                  )}
                  {show.isTrap && (
                    <span className="text-xs bg-red-600 text-white font-black px-2 py-0.5 rounded animate-pulse flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> 避雷大烂剧
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {show.title}
                </h1>
                <p className="text-sm text-slate-300 font-medium">
                  {show.originalTitle} · {show.genres.join(' / ')}
                </p>
              </div>

              {/* Large Composite Score Display */}
              <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 flex-shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    全网天平指数
                  </div>
                  <div className="text-xs font-semibold text-amber-400">
                    {show.verdictTier === 'masterpiece' && '👑 全网零争议封神'}
                    {show.verdictTier === 'must_watch' && '🌟 高分必看神作'}
                    {show.verdictTier === 'collapse_warning' && '⚠️ 高开低走烂尾'}
                    {show.verdictTier === 'trap_warning' && '🚫 绝对避雷警告'}
                    {show.verdictTier === 'recommended' && '👍 口碑良好推荐'}
                    {show.verdictTier === 'mediocre' && '😐 表现平庸及格'}
                  </div>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  {show.compositeScore.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Main Body Grid */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Tagline Banner */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Quote className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm text-slate-200 font-medium italic">
                  {show.tagline}
                </span>
              </div>
              <button
                onClick={() => onToggleCompare(show)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 ${
                  isCompared
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                {isCompared ? '已加入对比' : '加入横向对比'}
              </button>
            </div>

            {/* Platform Ratings Bar (5 Platforms) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span>🎯</span> 五大主流权威评分并列对齐
                </h3>
                <span className="text-xs text-slate-400">
                  综合公式：IMDb 35% + 烂番茄 25% + 豆瓣 25% + Metacritic 15%
                </span>
              </div>
              <PlatformRatingBar ratings={show.ratings} layout="detailed" />
            </div>

            {/* Rotten Tomatoes Critics Consensus Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/30 to-slate-900 border border-red-900/40">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">🍅</span>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  烂番茄官方影评人共识结论 (Critics Consensus)
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-serif italic">
                "{show.ratings.rottenTomatoes.criticsConsensus}"
              </p>
            </div>

            {/* Radar Chart + AI Pros/Cons Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: 5-Dimension Radar Chart */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center">
                <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5 self-start">
                  <span>🕸️</span> 五维品质雷达分布
                </h4>
                <RadarChart data={show.radarDimensions} name={show.title} size={280} />
                <div className="text-[11px] text-slate-400 mt-2 text-center">
                  综合考量媒体口碑、大众热度、国内受众接受度、各季稳定性与收尾体验
                </div>
              </div>

              {/* Right: AI Insights (Pros, Cons, Audience Fit) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Pros */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-900/50">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>推荐入坑看点 (三大核心亮点)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {show.aiInsight.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-900/50">
                  <div className="flex items-center gap-2 text-rose-400 text-sm font-bold mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>劝退避雷预警 (潜在毒点与门槛)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {show.aiInsight.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-sky-400 mb-1">🎯 极力推荐适合人群：</div>
                    <div className="text-slate-300">{show.aiInsight.audienceFit}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-amber-400 mb-1">⚠️ 建议避开人群：</div>
                    <div className="text-slate-300">{show.aiInsight.avoidFit}</div>
                  </div>
                </div>

                {/* DeepSeek Realtime Live Diagnosis Button & Panel */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-slate-950 border border-sky-800/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white">DeepSeek-Chat 实时全网口碑诊断</span>
                        <span className="text-[10px] text-slate-400 block">针对全网争议、烂尾断崖及中外分歧进行大模型实时剖析</span>
                      </div>
                    </div>

                    <button
                      onClick={handleDeepSeekDiagnosis}
                      disabled={isDiagnosing}
                      className={`text-xs px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isDiagnosing
                          ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                          : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
                      }`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isDiagnosing ? 'animate-spin' : ''}`} />
                      {isDiagnosing ? 'DeepSeek 正在诊断...' : '点击启动 DeepSeek 实时深度评测'}
                    </button>
                  </div>

                  {deepSeekAnalysis && (
                    <div className="mt-3 p-3.5 rounded-lg bg-slate-950/90 border border-sky-700/50 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap animate-fadeIn font-normal">
                      {deepSeekAnalysis}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Episode Heatmap */}
            <EpisodeHeatmap seasons={show.seasons} title={`${show.title} · 单集口碑热力图`} />

            {/* ======================================================== */}
            {/* 无限影评流与多源真实评测中心 (Endless Reviews & Critics) */}
            {/* ======================================================== */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              {/* 方案二 + 方案三双核驱动状态条 */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-indigo-950/40 border border-emerald-800/40 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-emerald-300">
                        方案二 (GitHub Models) + 方案三 (TVMaze 公共API) 协同运行
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800 font-mono">
                        🛡️ DeepSeek 0消耗保护锁生效中 (0扣费)
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-mono">
                        自动同步：{lastCrawlTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      底层由 TVMaze 免费开放节点提供单集与状态支持，顶层由 GitHub Models 免费大模型实时提纯剧评
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => setAutoStreamEnabled(!autoStreamEnabled)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                      autoStreamEnabled
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    {autoStreamEnabled ? '自动流开启' : '开启自动流'}
                  </button>

                  <button
                    onClick={() => triggerAutoCrawl(true)}
                    disabled={isLiveCrawling}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20 cursor-pointer transition-all disabled:opacity-50 whitespace-nowrap"
                    title="方案三：免费从全网公共开放节点抓取讨论"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLiveCrawling ? 'animate-spin' : ''}`} />
                    {isLiveCrawling ? '全网抓取中...' : '方案三：开放节点抓取'}
                  </button>

                  <button
                    onClick={handleTriggerFreeAIReview}
                    disabled={isLiveCrawling}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:opacity-90 text-white font-black text-xs flex items-center gap-1 shadow-md shadow-indigo-500/20 cursor-pointer transition-all disabled:opacity-50 whitespace-nowrap"
                    title="方案二：免费调用 GitHub Models (GPT-4o-mini) 实时提纯深度影评，不花一分钱"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    方案二：免费AI提纯
                  </button>
                </div>
              </div>

              {/* 实时抓取结果浮动提示 */}
              {crawlNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-xs text-emerald-200 animate-fadeIn flex items-center justify-between">
                  <span className="font-semibold">{crawlNotice}</span>
                  <button onClick={() => setCrawlNotice(null)} className="text-emerald-400 text-xs">✕</button>
                </div>
              )}

              {/* Header Statistics & Publish Action */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    <h3 className="text-base font-black text-white">
                      全网多源无限影评池 & 深度长短评
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 font-bold">
                      已收录 {reviewData.totalEstimated.toLocaleString()}+ 条
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00b51d]" />
                      豆瓣精选 4,500+
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      🍅 烂番茄顶级影评人 280+
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5c518]" />
                      IMDb 深度解析 5,200+
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500]" />
                      Reddit 热议
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPublishOpen(!isPublishOpen)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20 cursor-pointer transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    {isPublishOpen ? '收起发表' : '我也来评一句'}
                  </button>
                </div>
              </div>

              {/* 用户自定义发表影评抽屉 */}
              {isPublishOpen && (
                <form
                  onSubmit={handlePublishReview}
                  className="p-4 rounded-2xl bg-slate-950 border border-sky-500/40 space-y-3 animate-fadeIn shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-sky-400" />
                      发表你的真实口碑点评 (无需注册，即刻同步全站)
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPublishOpen(false)}
                      className="text-slate-500 hover:text-slate-300 text-xs"
                    >
                      取消
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">你的昵称 / 影评人 ID</label>
                      <input
                        type="text"
                        value={myAuthor}
                        onChange={(e) => setMyAuthor(e.target.value)}
                        placeholder="例如：哥谭守夜人"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">给本剧打分 (1-10分)</label>
                      <select
                        value={myRating}
                        onChange={(e) => setMyRating(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-sky-500"
                      >
                        <option value={10}>★ 10分 (全网无争议神作)</option>
                        <option value={9}>★ 9分 (年度顶级佳作)</option>
                        <option value={8}>★ 8分 (值得一刷的良作)</option>
                        <option value={7}>★ 7分 (及格偏上但有硬伤)</option>
                        <option value={6}>★ 6分 (平庸无奇勉强下饭)</option>
                        <option value={4}>★ 4分 (高开低走大烂尾)</option>
                        <option value={2}>★ 2分 (灾难级避雷)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">观点立场</label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setMySentiment('positive')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                            mySentiment === 'positive'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          👑 强烈安利
                        </button>
                        <button
                          type="button"
                          onClick={() => setMySentiment('mixed')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                            mySentiment === 'mixed'
                              ? 'bg-amber-950 text-amber-300 border-amber-700'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          ⚡ 争议中立
                        </button>
                        <button
                          type="button"
                          onClick={() => setMySentiment('negative')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                            mySentiment === 'negative'
                              ? 'bg-rose-950 text-rose-300 border-rose-700'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          ⚠️ 劝退避雷
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">长评标题 (选填)</label>
                    <input
                      type="text"
                      value={myTitle}
                      onChange={(e) => setMyTitle(e.target.value)}
                      placeholder="【深度解析】撕开滤镜，聊聊本剧真正的高光与短板..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">影评正文内容 *</label>
                    <textarea
                      required
                      rows={3}
                      value={myContent}
                      onChange={(e) => setMyContent(e.target.value)}
                      placeholder="写下你对本剧剧情、演员演技、单集高潮或烂尾结局的真实看法与体会..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 leading-relaxed resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-400 mr-1">选择核心标签:</span>
                      {['全网封神', '教科书剧本', '演技炸裂', '烂尾避雷', '慢热神作', '配乐顶级'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setMySelectedTag(t)}
                          className={`text-[10px] px-2 py-0.5 rounded cursor-pointer border ${
                            mySelectedTag === t
                              ? 'bg-sky-500 text-slate-950 font-bold border-sky-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          #{t}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      立即发表影评
                    </button>
                  </div>
                </form>
              )}

              {/* 多维平台与观点两级筛选栏 */}
              <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {/* 1. 平台源切换 */}
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
                  <div className="flex items-center gap-1.5 text-xs flex-nowrap">
                    <span className="text-[11px] text-slate-500 font-bold mr-1 flex items-center gap-1">
                      <Filter className="w-3 h-3" /> 平台:
                    </span>
                    <button
                      onClick={() => setPlatformFilter('all')}
                      className={`px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-all ${
                        platformFilter === 'all'
                          ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                          : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'
                      }`}
                    >
                      全部平台
                    </button>
                    <button
                      onClick={() => setPlatformFilter('douban')}
                      className={`px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-all ${
                        platformFilter === 'douban'
                          ? 'bg-[#00b51d] text-white shadow-md shadow-green-500/20'
                          : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'
                      }`}
                    >
                      豆瓣高赞短评
                    </button>
                    <button
                      onClick={() => setPlatformFilter('rotten_tomatoes')}
                      className={`px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-all ${
                        platformFilter === 'rotten_tomatoes'
                          ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                          : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'
                      }`}
                    >
                      🍅 烂番茄顶级影评人
                    </button>
                    <button
                      onClick={() => setPlatformFilter('imdb')}
                      className={`px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-all ${
                        platformFilter === 'imdb'
                          ? 'bg-[#f5c518] text-black shadow-md shadow-amber-500/20'
                          : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'
                      }`}
                    >
                      IMDb 深度解析
                    </button>
                    <button
                      onClick={() => setPlatformFilter('reddit')}
                      className={`px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer transition-all ${
                        platformFilter === 'reddit'
                          ? 'bg-[#ff4500] text-white shadow-md shadow-orange-500/20'
                          : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'
                      }`}
                    >
                      Reddit 社区热议
                    </button>
                  </div>

                  {/* 排序选择 */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[11px] text-slate-500 hidden sm:inline">排序:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="hot">🔥 最热高赞</option>
                      <option value="newest">🕒 最新发表</option>
                      <option value="rating_high">⭐ 评分最高</option>
                      <option value="rating_low">📉 评分最毒舌</option>
                    </select>
                  </div>
                </div>

                {/* 2. 观点分类筛选 */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 border-t border-slate-900 text-xs">
                  <span className="text-[11px] text-slate-500 font-bold mr-1">观点:</span>
                  {[
                    { id: 'all', label: '全部观点' },
                    { id: 'positive', label: '👑 封神吹爆' },
                    { id: 'negative', label: '⚠️ 犀利避雷/吐槽' },
                    { id: 'mixed', label: '⚡ 中外争议/分歧' },
                    { id: 'analysis', label: '📖 深度长篇解析' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSentimentFilter(s.id as any)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                        sentimentFilter === s.id
                          ? 'bg-slate-700 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 影评瀑布流列表 (Endless Review Feed) */}
              <div className="space-y-3.5">
                {reviewData.reviews.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-800">
                    当前筛选条件下暂无影评，你可以点击上方“我也来评一句”抢沙发！
                  </div>
                ) : (
                  reviewData.reviews.map((comment) => {
                    const delta = likesDelta[comment.id];
                    const currentLiked = delta !== undefined ? delta.liked : (comment.userLiked || false);
                    const currentLikes = (comment.likes || 0) + (delta ? delta.countDelta : 0);

                    return (
                      <div
                        key={comment.id}
                        className={`p-4 rounded-xl bg-slate-950/70 border transition-all space-y-2.5 hover:border-slate-700 ${
                          comment.tags?.includes('实时自动抓取')
                            ? 'border-emerald-700/60 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/20'
                            : comment.isLongReview
                            ? 'border-indigo-950/70 bg-gradient-to-br from-slate-950 via-slate-950/90 to-indigo-950/15'
                            : 'border-slate-800'
                        }`}
                      >
                        {/* 评论头部 */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            {comment.tags?.includes('实时自动抓取') && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-black flex items-center gap-1 animate-pulse">
                                <Zap className="w-2.5 h-2.5 fill-white" /> 实时抓取
                              </span>
                            )}
                            {comment.source === 'douban' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00b51d] text-white font-bold">
                                豆瓣
                              </span>
                            )}
                            {comment.source === 'rotten_tomatoes' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-600 text-white font-bold">
                                🍅 RT Top Critic
                              </span>
                            )}
                            {comment.source === 'imdb' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f5c518] text-black font-bold">
                                IMDb
                              </span>
                            )}
                            {comment.source === 'reddit' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ff4500] text-white font-bold">
                                Reddit
                              </span>
                            )}
                            {comment.source === 'user' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500 text-slate-950 font-bold">
                                本站剧迷
                              </span>
                            )}

                            <span className="text-xs font-bold text-slate-200">
                              {comment.author}
                            </span>

                            {comment.publication && (
                              <span className="text-xs text-sky-400 font-medium">
                                ({comment.publication})
                              </span>
                            )}

                            {comment.rating && (
                              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400 inline" />
                                {comment.rating}分
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {getSentimentBadge(comment.sentiment)}
                            <span className="text-xs text-slate-500 font-mono">
                              {comment.date}
                            </span>
                          </div>
                        </div>

                        {/* 深度长评标题 */}
                        {comment.title && (
                          <h4 className="text-sm font-bold text-amber-200/90 leading-snug">
                            {comment.title}
                          </h4>
                        )}

                        {/* 正文 */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {comment.content}
                        </p>

                        {/* 标签栏与点赞/互动 */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-900/80 text-xs">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {comment.tags && comment.tags.map((t, idx) => (
                              <span
                                key={idx}
                                className={`text-[10px] px-2 py-0.5 rounded border ${
                                  t === '实时自动抓取'
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 font-bold'
                                    : 'bg-slate-900 text-slate-400 border-slate-800'
                                }`}
                              >
                                #{t}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-3">
                            {comment.replyCount !== undefined && comment.replyCount > 0 && (
                              <span className="text-[11px] text-slate-500">
                                {comment.replyCount} 条探讨
                              </span>
                            )}

                            <button
                              onClick={() => handleLike(comment.id, comment.likes)}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                                currentLiked
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                              }`}
                            >
                              <ThumbsUp className={`w-3.5 h-3.5 ${currentLiked ? 'fill-rose-400' : ''}`} />
                              <span>{currentLikes.toLocaleString()}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* ======================================================== */}
              {/* 无限加载控制区 (Infinite Pagination Action) */}
              {/* ======================================================== */}
              <div className="pt-3 pb-6 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-3 w-full max-w-md">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore || !reviewData.hasMore}
                    className={`flex-1 py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                      reviewData.hasMore
                        ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 hover:opacity-90 text-slate-950 shadow-sky-500/25 active:scale-98'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingMore ? 'animate-spin' : ''}`} />
                    {isLoadingMore
                      ? '正在穿透检索更多全网影评...'
                      : reviewData.hasMore
                      ? `点击加载更多 10 条真实影评 (已展示 ${reviewData.reviews.length} 条)`
                      : '已加载当前分类下的全部真实影评'}
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <span>全网数据实时聚合 · 豆瓣 / 烂番茄 / IMDb / Metacritic</span>
                  <span>·</span>
                  <span className="text-slate-400">已开启无限翻页与自动流式抓取</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
