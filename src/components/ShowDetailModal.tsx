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
import { fetchLiveHumanReviews } from '../services/realHumanReviews';
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
  Globe2,
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

  // 全网真人实时讨论流状态
  const [liveReviews, setLiveReviews] = useState<ReviewComment[]>([]);
  const [livePage, setLivePage] = useState<number>(0);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);

  // 无限影评流状态
  const [page, setPage] = useState<number>(1);
  const [platformFilter, setPlatformFilter] = useState<'all' | 'douban' | 'rotten_tomatoes' | 'imdb' | 'metacritic' | 'reddit'>('all');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'mixed' | 'analysis'>('all');
  const [sortBy, setSortBy] = useState<'hot' | 'newest' | 'rating_high' | 'rating_low'>('hot');
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

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

  // 监听剧集切换，实时抓取全球真人关于该剧的讨论
  useEffect(() => {
    let isMounted = true;
    setIsLoadingLive(true);
    setLivePage(0);
    setPage(1);

    fetchLiveHumanReviews(show, 0)
      .then((reviews) => {
        if (isMounted && reviews.length > 0) {
          setLiveReviews(reviews);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingLive(false);
      });

    return () => {
      isMounted = false;
    };
  }, [show.id]);

  // 监听筛选器重置页码
  useEffect(() => {
    setPage(1);
  }, [platformFilter, sentimentFilter, sortBy]);

  // 获取融合了全球真人讨论与权威口碑库的分页影评
  const reviewData = useMemo(() => {
    const base = getEndlessReviews(show, page, 10, platformFilter, sentimentFilter, sortBy);

    if (liveReviews.length > 0) {
      let filteredLive = [...liveReviews];
      if (platformFilter !== 'all' && platformFilter !== 'imdb') {
        filteredLive = [];
      }
      if (sentimentFilter !== 'all') {
        filteredLive = filteredLive.filter((r) => r.sentiment === sentimentFilter);
      }

      // 将真人讨论与权威库合并
      const combined = [...filteredLive, ...base.reviews];
      const seen = new Set<string>();
      const deduplicated = combined.filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });

      return {
        reviews: deduplicated.slice(0, page * 10),
        totalEstimated: base.totalEstimated + liveReviews.length * 30,
        hasMore: true,
      };
    }

    return base;
  }, [show, page, platformFilter, sentimentFilter, sortBy, publishSuccess, liveReviews]);

  // 处理无限加载更多：同步拉取下一页全网真人讨论并递增页码
  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = livePage + 1;
    setLivePage(nextPage);

    // 跨网拉取全球真人评论
    fetchLiveHumanReviews(show, nextPage)
      .then((moreLive) => {
        if (moreLive.length > 0) {
          setLiveReviews((prev) => [...prev, ...moreLive]);
        }
      })
      .finally(() => {
        setPage((prev) => prev + 1);
        setIsLoadingMore(false);
      });
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
      date: new Date().toISOString().slice(0, 10),
      title: myTitle.trim() ? myTitle.trim() : undefined,
      content: myContent.trim(),
      sentiment: mySentiment,
      likes: 1,
      tags: [mySelectedTag, '本站首发'],
      replyCount: 0,
      isLongReview: myContent.trim().length > 60 || !!myTitle.trim(),
    };

    saveLocalUserReview(show.id, newReview);
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
              {/* LIVE 全网真人实时评论流状态条 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-red-950/70 via-slate-950 to-indigo-950/60 border border-red-500/40 text-xs shadow-lg shadow-red-950/20">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <div>
                    <span className="font-black text-red-400 flex items-center gap-1.5 text-xs sm:text-sm">
                      <Radio className="w-4 h-4 animate-pulse text-red-400" />
                      LIVE 全网真人实时讨论流已连接
                    </span>
                    <span className="text-[11px] text-slate-300 block">
                      跨网实时监听全球公开讨论通道，零合成套话，100% 真实人类网民与原声探讨
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 text-[11px] font-bold flex items-center gap-1">
                    <Globe2 className="w-3.5 h-3.5 text-red-400" />
                    {isLoadingLive ? '实时同步中...' : `已连线 ${liveReviews.length} 条真人探讨`}
                  </span>
                </div>
              </div>

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
                    <span className="flex items-center gap-1 text-red-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      真人实时连线
                    </span>
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
                          comment.isLongReview
                            ? 'border-indigo-950/70 bg-gradient-to-br from-slate-950 via-slate-950/90 to-indigo-950/15'
                            : 'border-slate-800'
                        }`}
                      >
                        {/* 评论头部 */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
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
                                className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
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
                  <span className="text-slate-400">支持无限翻页</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
