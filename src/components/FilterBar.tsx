import React from 'react';
import { FilterOptions } from '../types';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface FilterBarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  totalCount: number;
}

const GENRES = ['全部', '犯罪', '剧情', '科幻', '悬疑', '历史', '奇幻', '动作', '惊悚'];
const NETWORKS = ['全部', 'HBO / Max', 'Netflix', 'Apple TV+', 'Amazon Prime', 'AMC', 'Disney+', 'FX'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  totalCount,
}) => {
  const hasActiveFilters =
    filters.genre !== '全部' ||
    filters.network !== '全部' ||
    filters.specialTag !== 'all' ||
    filters.searchQuery !== '';

  const handleReset = () => {
    onChange({
      searchQuery: '',
      genre: '全部',
      network: '全部',
      verdictTier: 'all',
      sortBy: 'composite',
      specialTag: 'all',
    });
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 space-y-4">
      {/* Top Filter Rows */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-400 font-medium mr-1 flex-shrink-0">
            题材类型:
          </span>
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => onChange({ ...filters, genre: g })}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                filters.genre === g
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-3 self-end lg:self-center flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>排序规则:</span>
          </div>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange({
                ...filters,
                sortBy: e.target.value as FilterOptions['sortBy'],
              })
            }
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="composite">🏆 聚合天平指数 (最高)</option>
            <option value="imdb">⭐ IMDb 评分最高</option>
            <option value="rottenTomatoes">🍅 烂番茄新鲜度最高</option>
            <option value="douban">🟢 豆瓣评分最高</option>
            <option value="metacritic">🟩 Metascore 权威分最高</option>
            <option value="year">📅 上线年份最新</option>
          </select>
        </div>
      </div>

      {/* Network Filter & Quick Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium mr-1 flex-shrink-0">
            播出流媒体:
          </span>
          {NETWORKS.map((net) => (
            <button
              key={net}
              onClick={() => onChange({ ...filters, network: net })}
              className={`text-xs px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filters.network === net
                  ? 'bg-slate-200 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {net}
            </button>
          ))}
        </div>

        {/* Count and Reset */}
        <div className="flex items-center gap-3 justify-between sm:justify-end text-xs">
          <span className="text-slate-400">
            共找到 <strong className="text-sky-400 font-mono text-sm">{totalCount}</strong> 部符合条件的美剧
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>清空筛选</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
