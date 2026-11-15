import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  X,
  Wifi,
  Globe,
  ShieldCheck,
  Gift,
  Smartphone,
  Laptop,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lanIp?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  lanIp = '10.3.207.107',
}) => {
  const [copiedGlobal, setCopiedGlobal] = useState(false);
  const [copiedLan, setCopiedLan] = useState(false);

  const globalUrl = 'https://3298946837h-byte.github.io/tv-ratings/';
  const lanUrl = `http://${lanIp}:5173/`;

  if (!isOpen) return null;

  const handleCopyGlobal = () => {
    navigator.clipboard.writeText(globalUrl);
    setCopiedGlobal(true);
    setTimeout(() => setCopiedGlobal(false), 2000);
  };

  const handleCopyLan = () => {
    navigator.clipboard.writeText(lanUrl);
    setCopiedLan(true);
    setTimeout(() => setCopiedLan(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border-t sm:border border-slate-700 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 rounded-full bg-slate-700 mx-auto my-2 sm:hidden flex-shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">分享给朋友 · 零门槛免登录直接用</h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                异地朋友点击即开 · 微信手机适配 · 100% 零 API 扣费
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4 overflow-y-auto">
          {/* Method 1: Global HTTPS Link for Remote Friends */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-slate-950 border border-sky-500/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-sky-400" />
                🌟 异地朋友永久公网链接（首选推荐）
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-mono font-bold">
                全球在线
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              发在微信、QQ 或任何聊天框中，朋友在<strong>手机或电脑浏览器直接点击打开就能使用</strong>，无需任何账号或密码：
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={globalUrl}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-sky-300 font-mono focus:outline-none select-all"
              />
              <button
                onClick={handleCopyGlobal}
                className="px-3.5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1 shadow-md shadow-sky-500/20 cursor-pointer flex-shrink-0"
              >
                {copiedGlobal ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedGlobal ? '已复制' : '一键复制'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> 完美支持微信/手机触屏
              </span>
              <span className="flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5 text-sky-400" /> 平板与电脑自适应
              </span>
            </div>
          </div>

          {/* Method 2: Local WiFi / LAN Share */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-emerald-400" />
                同 Wi-Fi / 热点局域网直连
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                同网络
              </span>
            </div>

            <p className="text-xs text-slate-400">
              身边的朋友手机连同一 Wi-Fi 或热点时，也可打开：
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={lanUrl}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-emerald-300 font-mono focus:outline-none select-all"
              />
              <button
                onClick={handleCopyLan}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
              >
                {copiedLan ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLan ? '已复制' : '复制局域网'}</span>
              </button>
            </div>
          </div>

          {/* Zero Cost Guarantee */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-slate-950 border border-emerald-800/40 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% 零扣费与安全保障</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              所有 60+ 部神剧全部评分、单集走势、优缺点及常见问答均已转为纯前端离线智库。朋友无论如何频繁使用，<strong>都不会扣取您任何 API 费用</strong>！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
