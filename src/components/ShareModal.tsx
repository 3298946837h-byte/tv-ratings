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
  Cpu,
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
  const [copied, setCopied] = useState(false);
  const shareUrl = `http://${lanIp}:5173/`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">分享给异地朋友 · 零成本免刷爆方案</h2>
              <p className="text-xs text-slate-400">
                GitHub Models 免费配额 + DeepSeek 双引擎 · 同 Wi-Fi 直连与公网托管
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
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Method 1: Local WiFi / LAN Share */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-emerald-400" />
                方案一：同 Wi-Fi / 局域网一键免配置秒连 (手机电脑通用)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                在线监听中
              </span>
            </div>

            <p className="text-xs text-slate-400">
              只要身边的朋友手机或电脑连接了您当前的同一个 Wi-Fi 热点，直接在浏览器打开以下地址即可使用：
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-sky-300 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-sky-500/20 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制' : '复制链接'}</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" /> 适配手机触屏
              </span>
              <span className="flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5 text-slate-400" /> 适配平板与电脑
              </span>
            </div>
          </div>

          {/* Method 2: GitHub Models Free Quota (Zero Cost) */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/40 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>方案二：异地朋友零成本使用 (GitHub Models 免费配额)</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              为了让异地朋友能无限制使用，同时<strong>绝不消耗您的 DeepSeek 账户余额</strong>：
            </p>

            <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc">
              <li>
                <strong>每个 GitHub 用户自带免费额度</strong>：朋友只需登录其自己的 GitHub 账号，在{' '}
                <span className="text-sky-300 font-mono">github.com/settings/tokens</span> 创建一个免费 Token。
              </li>
              <li>
                <strong>填入即享无限畅玩</strong>：朋友在右上角【AI 引擎配置】填入该 Token，即可免费调用微软与 GitHub 官方提供的 <strong>GPT-4o mini、Llama 3.1 70B</strong>，每天上百次免费额度，0 元成本！
              </li>
              <li>
                <strong>智能双引擎保护</strong>：系统优先走 GitHub 免费额度，DeepSeek 作为保底。
              </li>
            </ul>
          </div>

          {/* Method 3: Cloud Public Deployment for Remote Friends */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-sky-400" />
              方案三：公网 1 分钟免费部署 (生成永久 HTTPS 网址)
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              项目已包含完整的 Vercel 静态部署配置。您可以将当前目录上传至 GitHub 仓库，在{' '}
              <span className="text-sky-300 font-mono">vercel.com</span> 关联该仓库一键 Deploy。朋友无论身在何地，点击您专属的 <span className="text-emerald-400 font-mono">https://xxx.vercel.app</span> 即可永久在线使用！
            </p>
          </div>

          {/* Owner Protection Explanation */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>多级缓存保护机制已全面生效</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              全站已内置 60+ 部神作美剧各平台评分及单集热力图，所有已查询内容永久由本地 LocalStorage 拦截缓存。日常浏览、筛选对比 100% 零 Token 消耗！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
