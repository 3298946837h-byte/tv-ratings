import React from 'react';
import { TVShow } from '../types';
import { RadarChart } from './RadarChart';
import { X, Scale, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CompareModalProps {
  shows: TVShow[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  shows,
  onClose,
  onRemove,
  onClear,
}) => {
  if (shows.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">美剧多维横向对比台</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              已选 {shows.length} 部剧 (上限3部)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              清空对比
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Shows Header Grid */}
          <div
            className={`grid gap-4 ${
              shows.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
            }`}
          >
            {shows.map((show) => (
              <div
                key={show.id}
                className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
              >
                <button
                  onClick={() => onRemove(show.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 flex items-center justify-center transition-colors cursor-pointer"
                  title="移除对比"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-3 items-center">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                      {show.network}
                    </span>
                    <h3 className="text-base font-black text-white mt-1 line-clamp-1">
                      {show.title}
                    </h3>
                    <p className="text-xs text-slate-400">{show.year}</p>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-amber-400">
                        {show.compositeScore.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-slate-400">综合天平分</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Radar Overlay for 2 shows */}
          {shows.length === 2 && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
              <h4 className="text-sm font-bold text-slate-200 mb-2">
                五维品质雷达直观重叠比对
              </h4>
              <RadarChart
                data={shows[0].radarDimensions}
                compareData={shows[1].radarDimensions}
                name={shows[0].title}
                compareName={shows[1].title}
                size={300}
              />
            </div>
          )}

          {/* Detailed Platform Ratings Table */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-300">
              主流权威评分全面对齐对比表
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800/80 text-slate-400 bg-slate-950/40">
                    <th className="p-3 w-32">评分平台 / 维度</th>
                    {shows.map((show) => (
                      <th key={show.id} className="p-3 font-bold text-slate-200">
                        {show.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {/* IMDb */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-[#f5c518] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#f5c518]" /> IMDb (10分制)
                    </td>
                    {shows.map((show) => (
                      <td key={show.id} className="p-3 font-mono text-sm font-bold text-slate-100">
                        {show.ratings.imdb.score.toFixed(1)}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          ({show.ratings.imdb.voteCount ? `${(show.ratings.imdb.voteCount / 10000).toFixed(0)}万人` : '-'})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* 烂番茄 */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-red-400">
                      🍅 烂番茄新鲜度 / 爆米花
                    </td>
                    {shows.map((show) => (
                      <td key={show.id} className="p-3 font-mono text-sm font-bold text-slate-100">
                        <span className="text-red-400">{show.ratings.rottenTomatoes.tomatometer}%</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="text-amber-300">{show.ratings.rottenTomatoes.popcornmeter}%</span>
                      </td>
                    ))}
                  </tr>

                  {/* Metacritic */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-emerald-400">
                      Metacritic (Metascore)
                    </td>
                    {shows.map((show) => (
                      <td key={show.id} className="p-3 font-mono text-sm font-bold text-slate-100">
                        {show.ratings.metacritic.metascore} / 100
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          (用户: {show.ratings.metacritic.userScore.toFixed(1)})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* 豆瓣 */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-[#00b51d]">
                      豆瓣评分 (10分制)
                    </td>
                    {shows.map((show) => (
                      <td key={show.id} className="p-3 font-mono text-sm font-bold text-[#00b51d]">
                        {show.ratings.douban.score.toFixed(1)}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          ({show.ratings.douban.voteCount ? `${(show.ratings.douban.voteCount / 10000).toFixed(0)}万评价` : '-'})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* TMDb */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-cyan-400">
                      TMDb 用户均分
                    </td>
                    {shows.map((show) => (
                      <td key={show.id} className="p-3 font-mono text-sm font-bold text-slate-100">
                        {show.ratings.tmdb.score.toFixed(1)}
                      </td>
                    ))}
                  </tr>

                  {/* 烂尾与分歧预警 */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-slate-400">
                      避雷预警与特征
                    </td>
                    {shows.map((show) => (
                      <td key={show.id} className="p-3 text-xs">
                        {show.hasEndingCollapse && (
                          <span className="text-red-400 font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> 存在烂尾断崖
                          </span>
                        )}
                        {show.isTrap && (
                          <span className="text-red-500 font-bold flex items-center gap-1">
                            🚫 避雷大烂剧
                          </span>
                        )}
                        {show.hasCulturalDivergence && (
                          <span className="text-indigo-400 font-bold">
                            ⚡ 中美口碑大分歧
                          </span>
                        )}
                        {!show.hasEndingCollapse && !show.isTrap && !show.hasCulturalDivergence && (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 口碑平稳零硬伤
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Pros & Cons Side-by-Side */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300">
              AI 优劣势与看点横向比较
            </h4>
            <div
              className={`grid gap-4 ${
                shows.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
              }`}
            >
              {shows.map((show) => (
                <div key={show.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h5 className="font-bold text-sm text-sky-400">{show.title} 看点与毒点</h5>
                  
                  {/* Pros */}
                  <div>
                    <div className="text-[11px] font-bold text-emerald-400 mb-1">主要亮点：</div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {show.aiInsight.pros.slice(0, 2).map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <div className="text-[11px] font-bold text-rose-400 mb-1">潜在毒点/门槛：</div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {show.aiInsight.cons.slice(0, 2).map((c, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
