import React, { useState, useEffect, useRef } from 'react';
import { TMDBMediaSearchResult, universalSearchMedia } from '../services/tmdbOmdbService';
import { Film, Tv, Star, Loader2, Sparkles } from 'lucide-react';

interface MediaAutocompleteDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: TMDBMediaSearchResult) => void;
  onSearchAll: (q: string) => void;
}

export const MediaAutocompleteDropdown: React.FC<MediaAutocompleteDropdownProps> = ({
  query,
  isOpen,
  onClose,
  onSelect,
  onSearchAll,
}) => {
  const [results, setResults] = useState<TMDBMediaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Debounced search
  useEffect(() => {
    const clean = query.trim().replace(/[《》]/g, '');
    if (!clean || clean.length < 1) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await universalSearchMedia(clean);
        if (!controller.signal.aborted) {
          setResults(data.slice(0, 8));
          setActiveIndex(-1);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.warn('Autocomplete fetch error:', err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        onSelect(results[activeIndex]);
      } else {
        onSearchAll(query);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen || (!isLoading && results.length === 0 && !query.trim())) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-900/98 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-800/80 animate-fadeIn"
    >
      {/* 头部状态 */}
      <div className="px-4 py-2 bg-slate-950/70 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          全网百万影视即时联想 (TMDb 官方数据)
        </span>
        {isLoading && (
          <span className="flex items-center gap-1 text-sky-400">
            <Loader2 className="w-3 h-3 animate-spin" />
            检索中...
          </span>
        )}
      </div>

      {/* 结果列表 */}
      {results.length > 0 ? (
        <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/50">
          {results.map((item, idx) => {
            const isMovie = item.mediaType === 'movie';
            const isActive = activeIndex === idx;

            return (
              <div
                key={`${item.mediaType}-${item.id}`}
                onClick={() => onSelect(item)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`p-3 flex items-center gap-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-sky-500/15 text-white' : 'hover:bg-slate-800/60 text-slate-200'
                }`}
              >
                {/* 海报缩略图 */}
                <div className="w-10 h-14 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-700/60 relative">
                  {item.poster ? (
                    <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">
                      无海报
                    </div>
                  )}
                </div>

                {/* 详情文本 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-white truncate">
                      {item.title}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-black flex items-center gap-0.5 flex-shrink-0 border ${
                        isMovie
                          ? 'bg-amber-950/70 text-amber-300 border-amber-700/50'
                          : 'bg-sky-950/70 text-sky-300 border-sky-700/50'
                      }`}
                    >
                      {isMovie ? <Film className="w-2.5 h-2.5" /> : <Tv className="w-2.5 h-2.5" />}
                      {isMovie ? '电影' : '剧集'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    {item.year && <span>{item.year} 年</span>}
                    {item.originalTitle && item.originalTitle !== item.title && (
                      <span className="truncate max-w-[150px] text-slate-500 hidden sm:inline">
                        {item.originalTitle}
                      </span>
                    )}
                    {item.voteAverage > 0 && (
                      <span className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {item.voteAverage} 分
                      </span>
                    )}
                  </div>
                </div>

                {/* 快捷点击箭头 */}
                <span className="text-slate-600 text-xs hidden sm:inline pr-1">
                  查看详情 →
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && query.trim() && (
          <div className="p-4 text-center text-xs text-slate-400">
            <span>未找到即时匹配，回车可在全网官方影视库中深度检索《{query}》</span>
          </div>
        )
      )}

      {/* 底部直接回车触发全网搜索栏 */}
      {query.trim() && (
        <div
          onClick={() => onSearchAll(query)}
          className="p-2.5 bg-slate-950 hover:bg-slate-900 flex items-center justify-between text-xs text-sky-400 font-bold cursor-pointer transition-colors"
        >
          <span>🚀 全网深度并发检索《{query}》...</span>
          <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Enter 键直达</span>
        </div>
      )}
    </div>
  );
};
