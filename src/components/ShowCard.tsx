import React from 'react';
import { TVShow } from '../types';
import { PlatformRatingBar } from './PlatformRatingBar';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles, Scale } from 'lucide-react';

interface ShowCardProps {
  show: TVShow;
  onSelect: (show: TVShow) => void;
  isCompared: boolean;
  onToggleCompare: (show: TVShow) => void;
}

export const ShowCard: React.FC<ShowCardProps> = ({
  show,
  onSelect,
  isCompared,
  onToggleCompare,
}) => {
  const getBadgeStyle = (tier: TVShow['verdictTier']) => {
    switch (tier) {
      case 'masterpiece':
        return 'bg-gradient-to-r from-amber-500 to-yellow-300 text-black font-extrabold shadow-amber-500/20 shadow-md';
      case 'must_watch':
        return 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold';
      case 'recommended':
        return 'bg-sky-600 text-white font-medium';
      case 'mediocre':
        return 'bg-slate-700 text-slate-200';
      case 'collapse_warning':
        return 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold animate-pulse';
      case 'trap_warning':
        return 'bg-gradient-to-r from-red-600 to-rose-700 text-white font-extrabold animate-pulse';
      default:
        return 'bg-slate-700 text-slate-200';
    }
  };

  const getTierLabel = (tier: TVShow['verdictTier']) => {
    switch (tier) {
      case 'masterpiece':
        return '👑 全网封神殿';
      case 'must_watch':
        return '🌟 必看高质量';
      case 'recommended':
        return '👍 值得一看';
      case 'mediocre':
        return '😐 中规中矩';
      case 'collapse_warning':
        return '⚠️ 烂尾断崖预警';
      case 'trap_warning':
        return '🚫 踩坑大避雷';
      default:
        return '综合收录';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9.0) return 'text-amber-400 border-amber-400/50 bg-amber-950/30';
    if (score >= 8.0) return 'text-emerald-400 border-emerald-400/50 bg-emerald-950/30';
    if (score >= 7.0) return 'text-sky-400 border-sky-400/50 bg-sky-950/30';
    return 'text-red-400 border-red-500/50 bg-red-950/30';
  };

  return (
    <div className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-sky-950/30 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between">
      {/* Top Image & Floating Badges */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
        <img
          src={show.backdrop || show.poster}
          alt={show.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className={`text-xs px-2.5 py-1 rounded-full ${getBadgeStyle(show.verdictTier)}`}>
            {getTierLabel(show.verdictTier)}
          </span>
          {show.hasEndingCollapse && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950/90 text-red-300 border border-red-800 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> 高开低走
            </span>
          )}
          {show.hasCulturalDivergence && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950/90 text-indigo-300 border border-indigo-800 font-bold">
              ⚡ 中外分歧
            </span>
          )}
        </div>

        {/* Network & Year */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="text-xs bg-slate-900/80 backdrop-blur border border-slate-700/80 text-slate-200 px-2 py-0.5 rounded font-medium">
            {show.network}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="pr-3">
            <h3 className="text-lg font-black text-white group-hover:text-sky-300 transition-colors line-clamp-1">
              {show.title}
            </h3>
            <p className="text-xs text-slate-400 font-medium line-clamp-1">
              {show.originalTitle} · {show.year} · {show.totalSeasons}季共{show.totalEpisodes}集
            </p>
          </div>

          {/* Composite Score Circle */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl border flex flex-col items-center justify-center backdrop-blur-md ${getScoreColor(
              show.compositeScore
            )}`}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">综合分</span>
            <span className="text-lg font-black leading-none">{show.compositeScore.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
        {/* Tagline / Verdict */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed italic bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
          "{show.tagline}"
        </p>

        {/* 4 Platforms mini rating bar */}
        <div>
          <div className="text-[11px] text-slate-400 mb-1.5 font-medium flex items-center justify-between">
            <span>主流权威评分对齐</span>
            <span className="text-[10px] text-slate-500">已归一化</span>
          </div>
          <PlatformRatingBar ratings={show.ratings} layout="compact" />
        </div>

        {/* AI Pros & Cons Highlights */}
        <div className="space-y-1.5 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <div className="flex items-start gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300 line-clamp-1">{show.aiInsight.pros[0]}</span>
          </div>
          <div className="flex items-start gap-1.5 text-rose-400">
            {show.isTrap ? (
              <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-rose-500" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
            )}
            <span className="text-slate-300 line-clamp-1">{show.aiInsight.cons[0]}</span>
          </div>
        </div>

        {/* Genres & Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {show.genres.map((g) => (
            <span
              key={g}
              className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-medium"
            >
              {g}
            </span>
          ))}
          {show.badges.slice(0, 2).map((b) => (
            <span
              key={b}
              className="text-[10px] px-2 py-0.5 bg-sky-950/60 border border-sky-800/60 text-sky-300 rounded"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => onSelect(show)}
            className="flex-1 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-sky-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            深度口碑与评论
          </button>

          <button
            onClick={() => onToggleCompare(show)}
            className={`text-xs py-2 px-3 rounded-lg border font-medium transition-all flex items-center gap-1 cursor-pointer ${
              isCompared
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                : 'border-slate-700 hover:border-slate-600 text-slate-300 hover:bg-slate-800'
            }`}
            title={isCompared ? '从对比栏移除' : '加入对比 (最多3部)'}
          >
            <Scale className="w-3.5 h-3.5" />
            {isCompared ? '已对比' : '对比'}
          </button>
        </div>
      </div>
    </div>
  );
};
