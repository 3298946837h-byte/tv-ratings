import React, { useState } from 'react';
import { TVShow, ReviewComment } from '../types';
import { PlatformRatingBar } from './PlatformRatingBar';
import { RadarChart } from './RadarChart';
import { EpisodeHeatmap } from './EpisodeHeatmap';
import { chatWithDeepSeek } from '../services/deepseek';
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
  const [activeCommentTab, setActiveCommentTab] = useState<'all' | 'douban' | 'rotten_tomatoes' | 'imdb'>('all');
  const [deepSeekAnalysis, setDeepSeekAnalysis] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

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

  const filteredComments = show.comments.filter((c) => {
    if (activeCommentTab === 'all') return true;
    return c.source === activeCommentTab;
  });

  const getSentimentBadge = (sentiment: ReviewComment['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">强烈推荐</span>;
      case 'negative':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">避雷差评</span>;
      default:
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">中立客观看待</span>;
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

            {/* Comments & Reviews Stream */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  各大平台精选评论与深度短评
                </h3>

                {/* Filter tabs */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setActiveCommentTab('all')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                      activeCommentTab === 'all'
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    全部评论
                  </button>
                  <button
                    onClick={() => setActiveCommentTab('douban')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                      activeCommentTab === 'douban'
                        ? 'bg-[#00b51d] text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    豆瓣高赞
                  </button>
                  <button
                    onClick={() => setActiveCommentTab('rotten_tomatoes')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                      activeCommentTab === 'rotten_tomatoes'
                        ? 'bg-red-500 text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    烂番茄顶级影评人
                  </button>
                  <button
                    onClick={() => setActiveCommentTab('imdb')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                      activeCommentTab === 'imdb'
                        ? 'bg-[#f5c518] text-black font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    IMDb 观众评析
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {filteredComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
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
                        <span className="text-xs font-bold text-slate-200">{comment.author}</span>
                        {comment.publication && (
                          <span className="text-xs text-sky-400 font-medium">({comment.publication})</span>
                        )}
                        {comment.rating && (
                          <span className="text-xs font-mono font-bold text-amber-400">
                            ★ {comment.rating}分
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {getSentimentBadge(comment.sentiment)}
                        <span className="text-xs text-slate-500 font-mono">{comment.date}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {comment.content}
                    </p>

                    {comment.likes && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.likes.toLocaleString()} 人赞同</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
