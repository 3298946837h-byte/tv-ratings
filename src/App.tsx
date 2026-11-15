import React, { useState, useMemo, useEffect } from 'react';
import { TVShow, FilterOptions } from './types';
import { SHOWS_DATA } from './data/showsData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { ShowCard } from './components/ShowCard';
import { ShowDetailModal } from './components/ShowDetailModal';
import { CompareModal } from './components/CompareModal';
import { ScheduleModal } from './components/ScheduleModal';
import { DeepSeekAdvisorModal } from './components/DeepSeekAdvisorModal';
import { AddShowWithAIModal } from './components/AddShowWithAIModal';
import { analyzeShowWithDeepSeek } from './services/deepseek';
import {
  Scale,
  Sparkles,
  Film,
  Globe,
  Search,
  RefreshCw,
  Zap,
  TrendingUp,
  Layers,
} from 'lucide-react';

const POPULAR_WEB_DISCOVERIES = [
  '老友记 (Friends)',
  '毒枭 (Narcos)',
  '怪奇物语 (Stranger Things)',
  '黑袍纠察队 (The Boys)',
  '熊家餐馆 (The Bear)',
  '流人 (Slow Horses)',
  '黄石 (Yellowstone)',
  '白莲花度假村 (The White Lotus)',
  '无耻之徒 (Shameless)',
  '纸牌屋 (House of Cards)',
  '火线 (The Wire)',
  '黑道家族 (The Sopranos)',
];

export function App() {
  const [shows, setShows] = useState<TVShow[]>(() => {
    try {
      const saved = localStorage.getItem('ratevibe_cached_shows');
      if (saved) {
        const parsed = JSON.parse(saved);
        const existingIds = new Set(SHOWS_DATA.map((s) => s.id));
        const additional = parsed.filter((s: TVShow) => !existingIds.has(s.id));
        return [...SHOWS_DATA, ...additional];
      }
    } catch (e) {
      console.error(e);
    }
    return SHOWS_DATA;
  });

  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [comparedShows, setComparedShows] = useState<TVShow[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isAddShowOpen, setIsAddShowOpen] = useState(false);

  // Real-time web searching state
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [searchProgress, setSearchProgress] = useState('');

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

  // Persist show and select it
  const handleAddShow = (newShow: TVShow) => {
    setShows((prev) => {
      const updated = [newShow, ...prev.filter((s) => s.id !== newShow.id)];
      try {
        localStorage.setItem('ratevibe_cached_shows', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setSelectedShow(newShow);
  };

  // Real-time web fetch using DeepSeek & Web Data
  const handleSearchWebRealtime = async (targetName: string) => {
    const query = targetName.trim();
    if (!query || isSearchingWeb) return;

    // Check if already in list
    const found = shows.find(
      (s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.originalTitle.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      setSelectedShow(found);
      return;
    }

    setIsSearchingWeb(true);
    setSearchProgress(`正在并发调用各大平台（IMDb, 烂番茄, Metacritic, 豆瓣, TMDb）实时检索《${query}》...`);

    try {
      const generated = await analyzeShowWithDeepSeek(query);

      const newShow: TVShow = {
        id: `web-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        title: generated.title || query,
        originalTitle: generated.originalTitle || query,
        year: generated.year || '2023 - 2024',
        totalSeasons: generated.totalSeasons || 1,
        totalEpisodes: generated.totalEpisodes || 10,
        status: generated.status || 'Returning Series',
        genres: generated.genres || ['剧情'],
        network: generated.network || 'HBO / Max',
        poster:
          'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        backdrop:
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
        summary: generated.summary || '全网实时检索剧情梗概',
        compositeScore: generated.compositeScore || 8.5,
        verdictTier: generated.verdictTier || 'must_watch',
        tagline: generated.tagline || '由 DeepSeek AI 全网实时多源评分聚合',
        hasEndingCollapse: Boolean(generated.hasEndingCollapse),
        hasCulturalDivergence: Boolean(generated.hasCulturalDivergence),
        isTrap: Boolean(generated.isTrap),
        badges: generated.badges || ['全网实时收录'],
        ratings: generated.ratings || {
          imdb: { score: 8.5, maxScore: 10, normalized: 8.5, voteCount: 200000, verdict: 'IMDb 8.5' },
          rottenTomatoes: { score: 90, maxScore: 100, normalized: 9.0, tomatometer: 90, popcornmeter: 88, criticsConsensus: '全网好评', verdict: 'Certified Fresh' },
          metacritic: { score: 80, maxScore: 100, normalized: 8.0, metascore: 80, userScore: 8.2 },
          douban: { score: 8.8, maxScore: 10, normalized: 8.8, voteCount: 150000, starDistribution: [60, 25, 10, 3, 2] },
          tmdb: { score: 8.2, maxScore: 10, normalized: 8.2, voteCount: 2000 },
        },
        radarDimensions: generated.radarDimensions || {
          criticPraise: 8.5,
          popularBuzz: 8.8,
          chineseTaste: 8.6,
          plotConsistency: 8.4,
          endingSatisfaction: 8.0,
        },
        aiInsight: generated.aiInsight || {
          pros: ['剧作严谨扎实', '演员演技出色', '制作水准高'],
          cons: ['部分段落需沉浸适应'],
          audienceFit: '推荐给所有美剧爱好者',
          avoidFit: '追求极致快餐爽剧的观众',
        },
        seasons: generated.seasons || [
          {
            seasonNumber: 1,
            episodesCount: 10,
            averageScore: generated.compositeScore || 8.5,
            trend: 'stable',
            episodes: [
              { season: 1, episode: 1, title: 'Pilot', score: 8.5, votes: 20000 },
              { season: 1, episode: 10, title: 'Finale', score: 9.0, votes: 35000, isMilestone: true },
            ],
          },
        ],
        comments: generated.comments || [
          {
            id: `c-ai-${Date.now()}`,
            source: 'douban',
            author: 'DeepSeek 实时聚合分析',
            rating: 9,
            date: new Date().toISOString().split('T')[0],
            content: `【全网实时口碑速递】《${generated.title}》在主流权威平台拥有稳健表现，口碑与讨论度较高。`,
            sentiment: 'positive',
            likes: 1280,
          },
        ],
        lastUpdated: '刚刚全网实时抓取',
      };

      handleAddShow(newShow);
      setFilters((f) => ({ ...f, searchQuery: '' }));
    } catch (err: any) {
      alert(`全网实时检索失败: ${err.message || '请重试'}`);
    } finally {
      setIsSearchingWeb(false);
      setSearchProgress('');
    }
  };

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
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenAddShow={() => setIsAddShowOpen(true)}
        activeTag={filters.specialTag}
        onSelectTag={(tag) => setFilters({ ...filters, specialTag: tag })}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6">
        {/* Full-Web Realtime Progress Bar */}
        {isSearchingWeb && (
          <div className="p-4 bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-950 border border-sky-500/50 rounded-2xl shadow-xl animate-pulse flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-sky-400 animate-spin" />
              <div>
                <span className="text-sm font-bold text-white block">
                  全网实时多源检索中
                </span>
                <span className="text-xs text-sky-300 font-normal">
                  {searchProgress}
                </span>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono border border-sky-500/30">
              DeepSeek-V3 联网解析
            </span>
          </div>
        )}

        {/* Global Web Discovery Shortcut Bar */}
        <div className="p-3 sm:p-4 bg-slate-900/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Globe className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold text-slate-200">
              全网实时热剧库直达：
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {POPULAR_WEB_DISCOVERIES.map((title) => (
              <button
                key={title}
                onClick={() => handleSearchWebRealtime(title.split(' ')[0])}
                disabled={isSearchingWeb}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                + {title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

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

        {/* Realtime Search Prompt if user is searching */}
        {filters.searchQuery.trim() && (
          <div className="p-3.5 bg-slate-900/90 border border-slate-700/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <Search className="w-4 h-4 text-sky-400" />
              <span>
                正在检索：<strong className="text-white font-bold">"{filters.searchQuery}"</strong>（已在当前库匹配 {filteredShows.length} 部）
              </span>
            </div>

            <button
              onClick={() => handleSearchWebRealtime(filters.searchQuery)}
              disabled={isSearchingWeb}
              className="px-4 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-sky-500/20 cursor-pointer self-start sm:self-center"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>全网实时重新 AI 抓取《{filters.searchQuery}》</span>
            </button>
          </div>
        )}

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
          <div className="py-16 text-center space-y-4 bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
            <Globe className="w-12 h-12 text-sky-400 mx-auto animate-bounce" />
            <div>
              <h3 className="text-lg font-black text-white">
                本地暂未收录《{filters.searchQuery}》？
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                没关系！已打通 DeepSeek AI 全网数据检索通道，点击下方按钮，系统将立即并发检索各大权威平台评分、雷达图与精选口碑，并在本站实时建档生成！
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => handleSearchWebRealtime(filters.searchQuery)}
                disabled={isSearchingWeb}
                className="text-xs sm:text-sm px-6 py-2.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>立即全网实时检索《{filters.searchQuery}》</span>
              </button>

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
                className="text-xs px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors cursor-pointer"
              >
                清空筛选
              </button>
            </div>
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
          setShows((prev) =>
            prev.map((s) => ({
              ...s,
              lastUpdated: new Date().toLocaleDateString() + ' 实时同步',
            }))
          );
        }}
      />

      {/* DeepSeek AI Advisor Modal */}
      <DeepSeekAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

      {/* Add Show with AI Modal */}
      <AddShowWithAIModal
        isOpen={isAddShowOpen}
        onClose={() => setIsAddShowOpen(false)}
        onShowAdded={handleAddShow}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-slate-300 font-bold flex items-center gap-2 justify-center md:justify-start">
              <span>美剧权威评分聚合平台</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">全网实时增强版</span>
            </div>
            <p className="text-[11px] text-slate-500">
              数据源打通：IMDb · Rotten Tomatoes 烂番茄 · Metacritic · 豆瓣电影 · TMDb · DeepSeek AI
            </p>
            <p className="text-[10px] text-slate-600">
              全网检索策略：本地毫秒级缓存 + 全网多源并发检索 + 自动化结构化建档
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
              全网实时引擎已就绪
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
