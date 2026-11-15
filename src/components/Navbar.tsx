import React from 'react';
import {
  Film,
  Search,
  Scale,
  Clock,
  Bot,
  PlusCircle,
  Share2,
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenSchedule: () => void;
  onOpenAdvisor: () => void;
  onOpenAddShow: () => void;
  onOpenShare: () => void;
  activeTag: string;
  onSelectTag: (tag: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  compareCount,
  onOpenCompare,
  onOpenSchedule,
  onOpenAdvisor,
  onOpenAddShow,
  onOpenShare,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-amber-400 p-0.5 shadow-md shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Film className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-lg text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
                美剧权威评分
              </span>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                PRO 聚合
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              IMDb · 烂番茄 · Metacritic · 豆瓣 · TMDb
            </p>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜索美剧中文名、英文名、导演、演员、类型..."
              className="w-full bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 focus:border-sky-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* DeepSeek / GitHub Models AI Advisor Button */}
          <button
            onClick={onOpenAdvisor}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600/90 to-indigo-600/90 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-sky-600/25 transition-all cursor-pointer border border-sky-400/30"
            title="打开 AI 避雷问答助手"
          >
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200" />
            <span className="text-[11px] sm:text-xs">AI 避雷</span>
          </button>

          {/* Add Show with AI (Desktop) */}
          <button
            onClick={onOpenAddShow}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:text-white transition-all cursor-pointer"
            title="实时收录新剧"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI 收录</span>
          </button>

          {/* Scheduled Sync Button (Desktop) */}
          <button
            onClick={onOpenSchedule}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/90 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            title="定时自动同步与数据更新中心"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>定时同步</span>
          </button>

          {/* Compare Button (Desktop) */}
          <button
            onClick={onOpenCompare}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              compareCount > 0
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 hover:bg-amber-400'
                : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>对比</span>
            {compareCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-slate-950 text-amber-300 text-[10px] flex items-center justify-center font-bold">
                {compareCount}
              </span>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 border border-emerald-400/30 transition-all cursor-pointer"
            title="分享给朋友 & 零门槛使用说明"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-100" />
            <span className="text-[11px] sm:text-xs">分享</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (Cleaner, touch-optimized) */}
      <div className="px-3 pb-2.5 md:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索美剧名、演员、类型或标签..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
