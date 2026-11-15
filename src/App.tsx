import React, { useState, useMemo } from 'react';
import { TVShow, FilterOptions } from './types';
import { SHOWS_DATA } from './data/showsData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { ShowCard } from './components/ShowCard';
import { ShowDetailModal } from './components/ShowDetailModal';
import { CompareModal } from './components/CompareModal';
import { ScheduleModal } from './components/ScheduleModal';
import { Scale, Sparkles, Film } from 'lucide-react';

export function App() {
  const [shows, setShows] = useState<TVShow[]>(SHOWS_DATA);
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [comparedShows, setComparedShows] = useState<TVShow[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    genre: '全部',
    network: '全部',
    verdictTier: 'all',
    sortBy: 'composite',
    specialTag: 'all',
  });

  // Featured top show
  const featuredShow = useMemo(() => {
    return shows.find((s) => s.id === 'breaking-bad') || shows[0];
  }, [shows]);

  // Toggle compare item
  const handleToggleCompare = (show: TVShow) => {
    setComparedShows((prev) => {
      const exists = prev.some((s) => s.id === show.id);
      if (exists) {
        return prev.filter((s) => s.id !== show.id);
      }
      if (prev.length >= 3) {
        alert('最多支持同时对比 3 部美剧');
        return prev;
      }
      return [...prev, show];
    });
  };

  // Filtered & Sorted Shows
  const filteredShows = useMemo(() => {
    return shows
      .filter((show) => {
        // Search
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = show.title.toLowerCase().includes(q);
          const matchOriginal = show.originalTitle.toLowerCase().includes(q);
          const matchSummary = show.summary.toLowerCase().includes(q);
          const matchGenres = show.genres.some((g) => g.toLowerCase().includes(q));
          const matchNetwork = show.network.toLowerCase().includes(q);
          const matchBadges = show.badges.some((b) => b.toLowerCase().includes(q));
          if (!matchTitle && !matchOriginal && !matchSummary && !matchGenres && !matchNetwork && !matchBadges) {
            return false;
          }
        }

        // Genre
        if (filters.genre !== '全部' && !show.genres.includes(filters.genre)) {
          return false;
        }

        // Network
        if (filters.network !== '全部' && show.network !== filters.network) {
          return false;
        }

        // Special Tag
        if (filters.specialTag === 'masterpiece' && show.verdictTier !== 'masterpiece') {
          return false;
        }
        if (filters.specialTag === 'collapse' && !show.hasEndingCollapse) {
          return false;
        }
        if (filters.specialTag === 'trap' && !show.isTrap && show.compositeScore >= 7.0) {
          return false;
        }
        if (filters.specialTag === 'divergence' && !show.hasCulturalDivergence) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'composite':
            return b.compositeScore - a.compositeScore;
          case 'imdb':
            return b.ratings.imdb.score - a.ratings.imdb.score;
          case 'rottenTomatoes':
            return b.ratings.rottenTomatoes.tomatometer - a.ratings.rottenTomatoes.tomatometer;
          case 'douban':
            return b.ratings.douban.score - a.ratings.douban.score;
          case 'metacritic':
            return b.ratings.metacritic.metascore - a.ratings.metacritic.metascore;
          case 'year':
            return b.year.localeCompare(a.year);
          default:
            return b.compositeScore - a.compositeScore;
        }
      });
  }, [shows, filters]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters({ ...filters, searchQuery: q })}
        compareCount={comparedShows.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenSchedule={() => setIsScheduleModalOpen(true)}
        activeTag={filters.specialTag}
        onSelectTag={(tag) => setFilters({ ...filters, specialTag: tag })}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* Hero Spotlight & Category Shortcuts */}
        {!filters.searchQuery && filters.genre === '全部' && filters.specialTag === 'all' && (
          <HeroBanner
            featuredShow={featuredShow}
            onSelectShow={(show) => setSelectedShow(show)}
            activeTag={filters.specialTag}
            onSelectTag={(tag) => setFilters({ ...filters, specialTag: tag })}
          />
        )}

        {/* Filter Toolbar */}
        <FilterBar
          filters={filters}
          onChange={(newFilters) => setFilters(newFilters)}
          totalCount={filteredShows.length}
        />

        {/* Shows Grid */}
        {filteredShows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShows.map((show) => (
              <ShowCard
                key={show.id}
                show={show}
                onSelect={(s) => setSelectedShow(s)}
                isCompared={comparedShows.some((c) => c.id === show.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Film className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">未找到匹配的美剧</h3>
            <p className="text-xs text-slate-500">
              请尝试调整搜索关键词、取消题材类型或重置筛选条件
            </p>
            <button
              onClick={() =>
                setFilters({
                  searchQuery: '',
                  genre: '全部',
                  network: '全部',
                  verdictTier: 'all',
                  sortBy: 'composite',
                  specialTag: 'all',
                })
              }
              className="text-xs px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
            >
              重置所有条件
            </button>
          </div>
        )}
      </main>

      {/* Floating Compare Bar */}
      {comparedShows.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-amber-500/60 backdrop-blur-md rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-4 animate-bounce-short">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <div className="text-xs">
              <span className="font-bold text-white">已选择 {comparedShows.length}/3 部美剧</span>
              <span className="text-slate-400 hidden sm:inline ml-1">
                ({comparedShows.map((s) => s.title).join(' vs ')})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-1.5 rounded-xl transition-colors cursor-pointer shadow-md shadow-amber-400/20"
            >
              开始多维对比
            </button>
            <button
              onClick={() => setComparedShows([])}
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 cursor-pointer"
            >
              清空
            </button>
          </div>
        </div>
      )}

      {/* Show Detail Modal */}
      {selectedShow && (
        <ShowDetailModal
          show={selectedShow}
          onClose={() => setSelectedShow(null)}
          isCompared={comparedShows.some((c) => c.id === selectedShow.id)}
          onToggleCompare={handleToggleCompare}
        />
      )}

      {/* Compare Modal */}
      {isCompareModalOpen && (
        <CompareModal
          shows={comparedShows}
          onClose={() => setIsCompareModalOpen(false)}
          onRemove={(id) => setComparedShows((prev) => prev.filter((s) => s.id !== id))}
          onClear={() => {
            setComparedShows([]);
            setIsCompareModalOpen(false);
          }}
        />
      )}

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSyncComplete={() => {
          // Simulation of refreshing data timestamp
          setShows((prev) =>
            prev.map((s) => ({
              ...s,
              lastUpdated: new Date().toLocaleDateString() + ' 实时同步',
            }))
          );
        }}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-slate-300 font-bold flex items-center gap-2 justify-center md:justify-start">
              <span>美剧权威评分聚合平台</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">v2.4 Pro</span>
            </div>
            <p className="text-[11px] text-slate-500">
              数据来源打通：IMDb · Rotten Tomatoes 烂番茄 · Metacritic · 豆瓣电影 · TMDb
            </p>
            <p className="text-[10px] text-slate-600">
              天平归一化算法：IMDb 35% + 烂番茄 25% + 豆瓣 25% + Metacritic 15% 动态加权
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              自动同步配置
            </button>
            <span>•</span>
            <span className="text-slate-400 flex items-center gap-1">
              开源参考与技术架构已就绪
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
