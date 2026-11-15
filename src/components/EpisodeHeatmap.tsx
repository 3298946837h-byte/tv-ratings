import React, { useState } from 'react';
import { SeasonInfo, EpisodeRating } from '../types';

interface EpisodeHeatmapProps {
  seasons: SeasonInfo[];
  title?: string;
}

export const EpisodeHeatmap: React.FC<EpisodeHeatmapProps> = ({ seasons, title = '全季单集口碑走势矩阵' }) => {
  const [activeEpisode, setActiveEpisode] = useState<EpisodeRating | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 9.8) return 'bg-amber-400 text-black font-extrabold shadow-sm shadow-amber-400/50';
    if (score >= 9.4) return 'bg-emerald-500 text-white font-bold';
    if (score >= 9.0) return 'bg-emerald-600 text-white font-medium';
    if (score >= 8.5) return 'bg-teal-600 text-white font-medium';
    if (score >= 8.0) return 'bg-cyan-700 text-slate-100';
    if (score >= 7.0) return 'bg-yellow-600/90 text-white';
    if (score >= 6.0) return 'bg-orange-600 text-white';
    return 'bg-red-600 text-white font-bold animate-pulse';
  };

  const getScoreTag = (score: number) => {
    if (score >= 9.8) return '👑 封神神回';
    if (score >= 9.0) return '🌟 极佳口碑';
    if (score >= 8.0) return '👍 质量扎实';
    if (score >= 7.0) return '😐 表现平庸';
    if (score >= 6.0) return '⚠️ 质量下滑';
    return '💥 暴跌雷区';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>📊</span> {title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            单集粒度热力图：一眼识别哪一集封神（金色/翠绿），哪一集崩盘（红色）
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-400 inline-block"></span> 9.8+ (神回)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span> 9.0-9.7
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-cyan-700 inline-block"></span> 8.0-8.9
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-yellow-600 inline-block"></span> 7.0-7.9
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-600 inline-block"></span> &lt; 6.0 (避雷)
          </span>
        </div>
      </div>

      {/* Season Rows */}
      <div className="space-y-3">
        {seasons.map((season) => (
          <div key={season.seasonNumber} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
            {/* Season label and average */}
            <div className="flex items-center justify-between sm:w-28 flex-shrink-0">
              <span className="text-xs font-bold text-slate-200">
                第 {season.seasonNumber} 季
              </span>
              <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                season.averageScore >= 9.0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                season.averageScore >= 8.0 ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                'bg-red-950 text-red-400 border border-red-800'
              }`}>
                均分 {season.averageScore.toFixed(1)}
              </span>
            </div>

            {/* Episode Cells */}
            <div className="flex items-center gap-1.5 flex-wrap flex-1">
              {season.episodes.map((ep) => (
                <button
                  key={`${ep.season}-${ep.episode}`}
                  onClick={() => setActiveEpisode(ep)}
                  onMouseEnter={() => setActiveEpisode(ep)}
                  className={`relative group px-2 py-1.5 rounded text-xs transition-transform hover:scale-110 active:scale-95 cursor-pointer ${getScoreColor(
                    ep.score
                  )}`}
                  title={`S${ep.season}E${ep.episode} "${ep.title}" - ${ep.score}分 (${ep.votes}人)`}
                >
                  <div className="flex items-center gap-1 font-mono">
                    <span className="text-[10px] opacity-80">E{ep.episode}</span>
                    <span className="font-bold">{ep.score.toFixed(1)}</span>
                  </div>
                  {ep.isMilestone && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-300 rounded-full ring-2 ring-slate-900" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Active episode preview card */}
      {activeEpisode && (
        <div className="mt-4 p-3.5 bg-slate-800/80 border border-sky-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className={`text-xl font-black px-2.5 py-1 rounded-lg ${getScoreColor(activeEpisode.score)}`}>
              {activeEpisode.score.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-400">
                  S{activeEpisode.season}E{activeEpisode.episode}
                </span>
                <span className="text-sm font-bold text-slate-100">
                  {activeEpisode.title}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-200">
                  {getScoreTag(activeEpisode.score)}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                IMDb 参评人数: <span className="text-slate-200 font-mono font-medium">{activeEpisode.votes.toLocaleString()} 人</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            {activeEpisode.score >= 9.8 && (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                🏆 电视剧史诗级单集巅峰，必看神回
              </span>
            )}
            {activeEpisode.score < 6.0 && (
              <span className="text-red-400 font-bold flex items-center gap-1">
                ⚠️ 口碑暴跌崩盘集，剧情有严重硬伤
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
