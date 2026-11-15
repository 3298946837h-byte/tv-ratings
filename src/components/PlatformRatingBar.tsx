import React from 'react';
import { TVShow } from '../types';

interface PlatformRatingBarProps {
  ratings: TVShow['ratings'];
  layout?: 'compact' | 'detailed';
}

export const PlatformRatingBar: React.FC<PlatformRatingBarProps> = ({
  ratings,
  layout = 'detailed',
}) => {
  const { imdb, rottenTomatoes, metacritic, douban, tmdb } = ratings;

  // Helpers for coloring Metascore
  const getMetacriticBg = (score: number) => {
    if (score >= 61) return 'bg-[#66cc33] text-black';
    if (score >= 40) return 'bg-[#ffcc33] text-black';
    return 'bg-[#ff0000] text-white';
  };

  if (layout === 'compact') {
    return (
      <div className="grid grid-cols-4 gap-1.5 text-xs">
        {/* IMDb */}
        <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 flex items-center justify-between">
          <span className="font-bold text-[#f5c518] tracking-tight">IMDb</span>
          <span className="font-semibold text-slate-100">{imdb.score.toFixed(1)}</span>
        </div>

        {/* Rotten Tomatoes */}
        <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 flex items-center justify-between">
          <span className="font-bold text-red-500 flex items-center gap-1">
            🍅
          </span>
          <span className="font-semibold text-slate-100">{rottenTomatoes.tomatometer}%</span>
        </div>

        {/* Metacritic */}
        <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 flex items-center justify-between">
          <span className="font-bold text-emerald-400">MTC</span>
          <span className="font-semibold text-slate-100">{metacritic.metascore}</span>
        </div>

        {/* 豆瓣 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 flex items-center justify-between">
          <span className="font-bold text-[#00b51d]">豆瓣</span>
          <span className="font-semibold text-slate-100">{douban.score.toFixed(1)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* 1. IMDb */}
      <div className="bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/50 transition-colors rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#f5c518] text-black font-extrabold text-xs px-1.5 py-0.5 rounded tracking-wide">
              IMDb
            </span>
            <span className="text-xs text-slate-400">全球大众基准</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">/ 10</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-100">{imdb.score.toFixed(1)}</span>
          {imdb.verdict && (
            <span className="text-xs text-amber-400 font-medium truncate max-w-[120px]">
              {imdb.verdict}
            </span>
          )}
        </div>
        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>参评人数</span>
          <span className="font-mono text-slate-300">
            {imdb.voteCount ? `${(imdb.voteCount / 10000).toFixed(1)}万` : '若干'}
          </span>
        </div>
      </div>

      {/* 2. Rotten Tomatoes 烂番茄 */}
      <div className="bg-slate-900/80 border border-slate-800/90 hover:border-red-500/50 transition-colors rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🍅</span>
            <span className="font-bold text-xs text-red-400">烂番茄</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">{rottenTomatoes.verdict || '新鲜度'}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">影评人新鲜度</div>
            <div className="text-2xl font-black text-red-400">{rottenTomatoes.tomatometer}%</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1">
              <span>🍿</span> 爆米花指数
            </div>
            <div className="text-2xl font-black text-amber-300">{rottenTomatoes.popcornmeter}%</div>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
          <span>专业 vs 爆米花</span>
          <span className={Math.abs(rottenTomatoes.tomatometer - rottenTomatoes.popcornmeter) > 20 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
            分歧 {Math.abs(rottenTomatoes.tomatometer - rottenTomatoes.popcornmeter)}%
          </span>
        </div>
      </div>

      {/* 3. Metacritic */}
      <div className="bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/50 transition-colors rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs px-1.5 py-0.5 rounded">
              MTC
            </span>
            <span className="text-xs text-slate-400">权威媒体严苛分</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">/ 100</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-black text-lg ${getMetacriticBg(metacritic.metascore)}`}>
            {metacritic.metascore}
          </div>
          <div>
            <div className="text-[11px] text-slate-400">用户评分</div>
            <div className="text-base font-bold text-slate-200">{metacritic.userScore.toFixed(1)} / 10</div>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
          <span>媒体共识</span>
          <span className="text-slate-300 truncate max-w-[100px]">{metacritic.verdict || '评分汇总'}</span>
        </div>
      </div>

      {/* 4. 豆瓣 Douban */}
      <div className="bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/50 transition-colors rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#00b51d] text-white font-bold text-xs px-1.5 py-0.5 rounded">
              豆瓣
            </span>
            <span className="text-xs text-slate-400">国内剧迷口碑</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">/ 10</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-[#00b51d]">{douban.score.toFixed(1)}</span>
          <div className="flex text-amber-400 text-xs">
            {'★'.repeat(Math.round(douban.score / 2))}
            <span className="text-slate-600">{'★'.repeat(5 - Math.round(douban.score / 2))}</span>
          </div>
        </div>
        {/* Star distribution mini-bar */}
        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-1">
          {(douban.starDistribution || [65, 20, 10, 3, 2]).map((ratio, idx) => (
            <div
              key={idx}
              title={`${5 - idx}星占比: ${ratio}%`}
              className="h-1.5 rounded-full bg-emerald-500"
              style={{
                width: `${ratio}%`,
                opacity: 1 - idx * 0.18,
              }}
            />
          ))}
        </div>
      </div>

      {/* 5. TMDb */}
      <div className="bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 transition-colors rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-gradient-to-r from-[#01b4e4] to-[#90cea1] text-black font-extrabold text-xs px-1.5 py-0.5 rounded">
              TMDb
            </span>
            <span className="text-xs text-slate-400">分季分集元数据</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">/ 10</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-cyan-400">{tmdb.score.toFixed(1)}</span>
          <span className="text-xs text-slate-400 font-medium">综合评分</span>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
          <span>元数据基底</span>
          <span className="text-cyan-400">开放 API 对接</span>
        </div>
      </div>
    </div>
  );
};
