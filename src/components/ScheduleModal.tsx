import React, { useState } from 'react';
import {
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  Calendar,
  Zap,
  Server,
  X,
  Play,
} from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete?: () => void;
}

interface SyncLog {
  id: string;
  time: string;
  type: string;
  status: 'success' | 'running' | 'failed';
  message: string;
  affectedCount: number;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onSyncComplete,
}) => {
  const [cronExpression, setCronExpression] = useState('0 3 * * *');
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([
    {
      id: 'log-1',
      time: '2026-11-15 03:00:12',
      type: '定时增量同步',
      status: 'success',
      message: '成功同步 12 部热播美剧最新集数评分，发现《幕府将军》烂番茄新鲜度稳定在 99%',
      affectedCount: 12,
    },
    {
      id: 'log-2',
      time: '2026-11-14 03:00:08',
      type: '全量基准校验',
      status: 'success',
      message: 'IMDb Top 250 数据对齐完成，《绝命毒师》全网天平指数保持 9.6 稳居榜首',
      affectedCount: 20,
    },
  ]);

  if (!isOpen) return null;

  const handleManualTrigger = () => {
    setIsSyncing(true);
    setCurrentStep('1/5: 正在连接 TMDb API，拉取最新季集列表与流行度指标...');

    setTimeout(() => {
      setCurrentStep('2/5: 正在请求 OMDb / IMDb 数据接口，获取最新加权分与总投票数...');
    }, 1000);

    setTimeout(() => {
      setCurrentStep('3/5: 正在解析烂番茄 (Rotten Tomatoes) 影评人共识与爆米花指数...');
    }, 2000);

    setTimeout(() => {
      setCurrentStep('4/5: 正在请求豆瓣 Rexxar 接口，更新 5 星打分分布与最新高赞短评...');
    }, 3000);

    setTimeout(() => {
      setCurrentStep('5/5: 正在重算聚合天平指数、更新雷达图并重新扫描断崖式烂尾预警...');
    }, 4000);

    setTimeout(() => {
      setIsSyncing(false);
      setCurrentStep('');
      const newLog: SyncLog = {
        id: `log-${Date.now()}`,
        time: new Date().toLocaleString(),
        type: '手动全量触发',
        status: 'success',
        message: '全网五大权威平台（IMDb、烂番茄、Metacritic、豆瓣、TMDb）数据同步完毕，全部 12 部美剧指数已对齐！',
        affectedCount: 12,
      };
      setSyncLogs((prev) => [newLog, ...prev]);
      if (onSyncComplete) onSyncComplete();
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white">多平台数据定时自动同步控制台</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Cron Config Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>后台自动定时调度策略 (Cron Schedule)</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  每日固定时段自动抓取各大平台最新评分，自动纠偏中外审美分歧与烂尾预警
                </div>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => setScheduleEnabled(!scheduleEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  scheduleEnabled ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    scheduleEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Cron 定时表达式</label>
                <input
                  type="text"
                  value={cronExpression}
                  onChange={(e) => setCronExpression(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  当前预设：每日凌晨 03:00 自动触发全量更新
                </span>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">同步周期预设</label>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setCronExpression('0 */6 * * *')}
                    className="text-xs px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer"
                  >
                    每6小时
                  </button>
                  <button
                    onClick={() => setCronExpression('0 3 * * *')}
                    className="text-xs px-2.5 py-1.5 rounded bg-sky-950 border border-sky-800 text-sky-300 font-bold cursor-pointer"
                  >
                    每日凌晨
                  </button>
                  <button
                    onClick={() => setCronExpression('0 3 * * 1')}
                    className="text-xs px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer"
                  >
                    每周一
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Manual Trigger Section */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 to-slate-950 border border-sky-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>立即触发多源数据刷新</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                模拟实时并发调用 IMDb, 烂番茄, Metacritic, 豆瓣, TMDb 五大平台接口
              </div>
            </div>

            <button
              onClick={handleManualTrigger}
              disabled={isSyncing}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isSyncing
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 shadow-lg shadow-sky-500/20'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? '正在同步数据中...' : '立即同步最新评分'}
            </button>
          </div>

          {/* Sync in progress indicator */}
          {isSyncing && (
            <div className="p-3.5 bg-slate-950 border border-sky-500/40 rounded-xl space-y-2 animate-pulse">
              <div className="flex items-center justify-between text-xs text-sky-400 font-medium">
                <span className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5" />
                  {currentStep}
                </span>
                <span className="font-mono">处理中...</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-sky-400 h-full w-2/3 animate-pulse rounded-full" />
              </div>
            </div>
          )}

          {/* Platform Health Status */}
          <div>
            <div className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              各大权威数据源接入节点健康度
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-[#f5c518] font-bold">IMDb (OMDb)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="正常连接" />
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-red-400 font-bold">烂番茄 (RT)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="正常连接" />
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-emerald-400 font-bold">Metacritic</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="正常连接" />
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-[#00b51d] font-bold">豆瓣 (Rexxar)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="已配置缓存代理" />
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-cyan-400 font-bold">TMDb v3 API</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="正常连接" />
              </div>
            </div>
          </div>

          {/* Sync History Logs */}
          <div>
            <div className="text-xs font-bold text-slate-300 mb-2">最近同步记录日志</div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {syncLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="font-bold text-slate-200">{log.type}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] pl-5">{log.message}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 flex-shrink-0">
                    更新 {log.affectedCount} 部
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
