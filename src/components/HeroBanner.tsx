import React from 'react';
import { TVShow } from '../types';
import {
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';

interface HeroBannerProps {
  featuredShow: TVShow;
  onSelectShow: (show: TVShow) => void;
  activeTag: string;
  onSelectTag: (tag: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredShow,
  onSelectShow,
  activeTag,
  onSelectTag,
}) => {
  return (
    <div className="relative mb-6 sm:mb-8 space-y-4 sm:space-y-6">
      {/* Featured Masterpiece Spotlight */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={featuredShow.backdrop}
            alt={featuredShow.title}
            className="w-full h-full object-cover opacity-30 sm:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="relative p-4 sm:p-8 max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1 shadow-md shadow-amber-400/20">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 殿堂级标杆美剧
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
              综合各大权威平台加权计算
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {featuredShow.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
            {featuredShow.summary}
          </p>

          {/* Quick Score Bars (Mobile Optimized 2x2 or row) */}
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap py-1.5 sm:py-2">
            <div className="flex items-baseline gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-slate-800 sm:bg-transparent sm:p-0 sm:border-0">
              <span className="text-xl sm:text-3xl font-black text-amber-400">
                {featuredShow.compositeScore.toFixed(1)}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">聚合天平分</span>
            </div>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono w-full sm:w-auto">
              <div className="bg-slate-900/70 sm:bg-transparent px-2 py-0.5 rounded border border-slate-800 sm:border-0">
                <span className="text-[#f5c518] font-bold">IMDb:</span> {featuredShow.ratings.imdb.score.toFixed(1)}
              </div>
              <div className="bg-slate-900/70 sm:bg-transparent px-2 py-0.5 rounded border border-slate-800 sm:border-0">
                <span className="text-red-400 font-bold">烂番茄:</span> {featuredShow.ratings.rottenTomatoes.tomatometer}%
              </div>
              <div className="bg-slate-900/70 sm:bg-transparent px-2 py-0.5 rounded border border-slate-800 sm:border-0">
                <span className="text-emerald-400 font-bold">Metascore:</span> {featuredShow.ratings.metacritic.metascore}
              </div>
              <div className="bg-slate-900/70 sm:bg-transparent px-2 py-0.5 rounded border border-slate-800 sm:border-0">
                <span className="text-[#00b51d] font-bold">豆瓣:</span> {featuredShow.ratings.douban.score.toFixed(1)}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-1 sm:pt-2 flex items-center gap-3">
            <button
              onClick={() => onSelectShow(featuredShow)}
              className="w-full sm:w-auto justify-center bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-sky-500/25 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>查看完整神剧口碑报告与热评</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Feature Tiers Shortcut Bar (Mobile 2x2 Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Tier 1: 封神殿 */}
        <button
          onClick={() => onSelectTag(activeTag === 'masterpiece' ? 'all' : 'masterpiece')}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
            activeTag === 'masterpiece'
              ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm sm:text-base">
              👑
            </span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">全网封神殿 (9.0+)</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
              各大平台一致零差评神作
            </div>
          </div>
        </button>

        {/* Tier 2: 烂尾预警 */}
        <button
          onClick={() => onSelectTag(activeTag === 'collapse' ? 'all' : 'collapse')}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
            activeTag === 'collapse'
              ? 'bg-orange-950/40 border-orange-500 shadow-lg shadow-orange-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm sm:text-base">
              ⚠️
            </span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">烂尾断崖预警</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
              前几季封神后半程暴跌
            </div>
          </div>
        </button>

        {/* Tier 3: 避雷雷区 */}
        <button
          onClick={() => onSelectTag(activeTag === 'trap' ? 'all' : 'trap')}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
            activeTag === 'trap'
              ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm sm:text-base">
              🚫
            </span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">踩坑大避雷 (&lt;7.0)</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
              高投资却翻车帮省时间
            </div>
          </div>
        </button>

        {/* Tier 4: 中外审美分歧 */}
        <button
          onClick={() => onSelectTag(activeTag === 'divergence' ? 'all' : 'divergence')}
          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
            activeTag === 'divergence'
              ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm sm:text-base">
              ⚡
            </span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">中外审美分歧</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
              烂番茄叫好但豆瓣翻车
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
