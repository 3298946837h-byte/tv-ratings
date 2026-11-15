import React, { useState, useRef, useEffect } from 'react';
import {
  chatWithAI,
  getDeepSeekApiKey,
  setDeepSeekApiKey,
  getGeminiApiKey,
  setGeminiApiKey,
  getGitHubToken,
  setGitHubToken,
  getAIProvider,
  setAIProvider,
  getGitHubModel,
  setGitHubModel,
  AIProvider,
  DeepSeekMessage,
  getDailyUsage,
  resetDailyUsage,
  DAILY_BUDGET_CAP_CNY,
  DAILY_MAX_CALLS,
  maskApiKey,
  isDeepSeekPaused,
  setDeepSeekPaused,
  DeepSeekDailyUsage,
} from '../services/deepseek';
import {
  Bot,
  Send,
  Sparkles,
  X,
  Key,
  Flame,
  AlertTriangle,
  RotateCcw,
  Check,
  Cpu,
  Gift,
  HelpCircle,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  PauseCircle,
  PlayCircle,
  Zap,
} from 'lucide-react';

interface DeepSeekAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_QUESTIONS = [
  '👑 推荐几部像《绝命毒师》《风骚律师》那样慢热但后期全面封神的高口碑美剧',
  '⚠️ 《权力的游戏》和《西部世界》到底从哪一集开始崩盘烂尾的？原因是什么？',
  '🚫 盘点近年高预算宣发但全网大翻车的避雷美剧（除了《偶像涡流》还有哪些）？',
  '⚡ 为什么《三体 英文版》烂番茄给到 79% 叫好，但国内豆瓣仅 6.9 争议极大？',
  '🎯 喜欢高概念悬疑反乌托邦，求一部比《黑镜》更震撼的新美剧推荐！',
];

export const DeepSeekAdvisorModal: React.FC<DeepSeekAdvisorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<DeepSeekMessage[]>([
    {
      role: 'assistant',
      content:
        '👋 你好！我是 **美剧权威口碑与避雷 AI 专家**。\n\n已支持 **GitHub Models（免费配额）+ DeepSeek-V3 双引擎驱动**！\n我已全面接入各大主流评分平台（**IMDb、烂番茄 Rotten Tomatoes、Metacritic、豆瓣电影、TMDb**）的数据与影评人共识。无论是找神作、避大坑、排查烂尾断崖还是探讨中外审美分歧，都可以随时问我！',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeEngineTag, setActiveEngineTag] = useState<string>('双引擎就绪');

  // AI Configuration State
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [provider, setProviderState] = useState<AIProvider>(getAIProvider());
  const [customDeepSeekKey, setCustomDeepSeekKey] = useState(getDeepSeekApiKey());
  const [customGeminiKey, setCustomGeminiKey] = useState(getGeminiApiKey());
  const [customGitHubToken, setCustomGitHubToken] = useState(getGitHubToken());
  const [githubModel, setGitHubModelState] = useState(getGitHubModel());
  const [keySaved, setKeySaved] = useState(false);

  // 一角钱熔断与安全状态
  const [dailyUsage, setDailyUsage] = useState<DeepSeekDailyUsage>(getDailyUsage());
  const [isPaused, setIsPaused] = useState<boolean>(isDeepSeekPaused());
  const [showRawKey, setShowRawKey] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 每次打开弹窗或状态变化时同步最新真实配额
  useEffect(() => {
    setDailyUsage(getDailyUsage());
    setIsPaused(isDeepSeekPaused());
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (userText: string = input) => {
    if (!userText.trim() || isLoading) return;

    const newMsgs: DeepSeekMessage[] = [...messages, { role: 'user', content: userText.trim() }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);

    try {
      const res = await chatWithAI(newMsgs);
      setActiveEngineTag(res.engineUsed);
      setMessages([...newMsgs, { role: 'assistant', content: res.reply }]);
    } catch (err: any) {
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          content: `❌ 请求出错: ${err.message || '请检查网络或 API Key / GitHub Token'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
      setDailyUsage(getDailyUsage());
    }
  };

  const handleSaveConfig = () => {
    setAIProvider(provider);
    setDeepSeekApiKey(customDeepSeekKey.trim());
    setGeminiApiKey(customGeminiKey.trim());
    setGitHubToken(customGitHubToken.trim());
    setGitHubModel(githubModel);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyConfig(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border-t sm:border border-slate-700/80 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col h-[94vh] sm:h-[85vh] overflow-hidden">
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 rounded-full bg-slate-700 mx-auto my-2 sm:hidden flex-shrink-0" />

        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-black text-white">美剧口碑顾问 (双引擎)</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {activeEngineTag}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                  <Gift className="w-3 h-3 text-amber-400" />
                  支持 GitHub Models 免费配额
                </span>
              </div>
              <p className="text-xs text-slate-400">
                GitHub 免费大模型 + DeepSeek 官方 · IMDb/烂番茄/豆瓣评分对齐 · 烂尾断崖排查
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="配置 AI 引擎与 Key"
            >
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">AI 引擎与限额</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 站长赞助与朋友提醒横幅 */}
        <div className="px-3.5 sm:px-4 py-2 bg-gradient-to-r from-amber-950/80 via-slate-900 to-sky-950/80 border-b border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              站长友情赞助提醒:
            </span>
            <span className="text-slate-200">
              站长每日赞助 <strong className="text-amber-300">¥0.10（一角钱）</strong> DeepSeek 额度，用完后请朋友们切换使用 <strong className="text-sky-300 font-bold">⚡ Flash 免费模型</strong>（100% 免费无限畅聊）！
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setProviderState('gemini_flash');
              setAIProvider('gemini_flash');
              setActiveEngineTag('⚡ Gemini Flash 免费');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors border whitespace-nowrap self-end sm:self-center ${
              provider === 'gemini_flash'
                ? 'bg-sky-500 text-slate-950 border-sky-400'
                : 'bg-sky-950/80 text-sky-300 border-sky-500/40 hover:bg-sky-900/80'
            }`}
          >
            ⚡ 一键使用 Flash 免费模型
          </button>
        </div>

        {/* 一角钱每日硬熔断监控栏 (Daily Budget & Circuit Breaker Monitor) */}
        <div className="px-3.5 sm:px-4 py-2.5 bg-slate-950/95 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-200 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              对话安全限额:
            </span>
            <span className="font-mono text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
              ¥{dailyUsage.estimatedCostCNY.toFixed(4)} / ¥0.100 (上限一角钱)
            </span>
            <span className="font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              已调用 {dailyUsage.callCount} / {DAILY_MAX_CALLS} 次
            </span>
            <span className="text-[10px] text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800 font-medium">
              ⚡ 搜索建档：DeepSeek Flash 不限额
            </span>
            {dailyUsage.isCircuitBroken ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800 font-bold flex items-center gap-1 animate-pulse">
                🛑 站长今日一角钱额度已用完！请朋友们切换使用 Flash 免费模型继续畅聊（0成本）
              </span>
            ) : isPaused ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                ⏸️ 已暂停扣费调用
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold flex items-center gap-1">
                🟢 一角钱保护生效中 (剩余额度: ¥{dailyUsage.remainingCostCNY.toFixed(4)})
              </span>
            )}
          </div>

          {/* Progress Bar & Actions */}
          <div className="flex items-center gap-2 w-full sm:w-52 flex-shrink-0">
            <div className="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-500 ${
                  dailyUsage.estimatedCostCNY >= 0.08
                    ? 'bg-red-500'
                    : dailyUsage.estimatedCostCNY >= 0.05
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{
                  width: `${Math.min(100, Math.max(5, (dailyUsage.estimatedCostCNY / DAILY_BUDGET_CAP_CNY) * 100))}%`,
                }}
              />
            </div>
            <button
              onClick={() => {
                const next = !isPaused;
                setIsPaused(next);
                setDeepSeekPaused(next);
              }}
              className={`text-[10px] px-2 py-1 rounded font-bold cursor-pointer transition-colors border ${
                isPaused
                  ? 'bg-emerald-900 text-emerald-200 border-emerald-700 hover:bg-emerald-800'
                  : 'bg-amber-950 text-amber-300 border-amber-800 hover:bg-amber-900'
              }`}
              title="一键急停开关"
            >
              {isPaused ? '恢复扣费' : '一键急停'}
            </button>
          </div>
        </div>

        {/* AI Key & Dual Engine Config Dropdown */}
        {showKeyConfig && (
          <div className="p-4 bg-slate-950 border-b border-slate-800 space-y-4 animate-fadeIn text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-400" />
                AI 模型引擎与免费配额管理
              </span>
              <span className="text-[11px] text-emerald-400">设置将保存在当前浏览器</span>
            </div>

            {/* Provider Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setProviderState('auto')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  provider === 'auto'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-[11px]">智能双引擎 (推荐)</div>
                <div className="text-[9px] text-slate-400 scale-95">优先 Flash 免费，备用一角钱</div>
              </button>

              <button
                type="button"
                onClick={() => setProviderState('gemini_flash')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  provider === 'gemini_flash'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-[11px] flex items-center justify-center gap-0.5">
                  <Zap className="w-3 h-3 text-amber-400" /> Flash 免费模型
                </div>
                <div className="text-[9px] text-amber-400 scale-95">推荐朋友用 · 每日1500次</div>
              </button>

              <button
                type="button"
                onClick={() => setProviderState('github_models')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  provider === 'github_models'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-[11px]">GitHub Models</div>
                <div className="text-[9px] text-emerald-400 scale-95">免费配额 (GPT-4o mini)</div>
              </button>

              <button
                type="button"
                onClick={() => setProviderState('deepseek')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  provider === 'deepseek'
                    ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-[11px]">DeepSeek-V3</div>
                <div className="text-[9px] text-slate-400 scale-95">站长一角钱硬熔断</div>
              </button>
            </div>

            {/* 1. Gemini Flash Config */}
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Google Gemini 1.5/2.0 Flash 免费 Key (推荐朋友使用)
                </span>
                <span className="text-[10px] text-amber-400 font-bold">100% 永久免费 · 每天 1500 次配额</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={customGeminiKey}
                  onChange={(e) => setCustomGeminiKey(e.target.value)}
                  placeholder="AIzaSy... (Google AI Studio 免费 Key)"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
                />
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 text-[11px] rounded-lg transition-colors whitespace-nowrap flex items-center border border-slate-700 font-bold"
                >
                  免费领取 Key ↗
                </a>
              </div>
              <p className="text-[10px] text-slate-400">
                💡 <strong>给朋友的提示</strong>：站长的一角钱 DeepSeek 额度用完后，大家可以在 Google AI Studio 免费生成 Flash Key，每天享有高达 1500 次极速调用，完全 0 费用！
              </p>
            </div>

            {/* GitHub Token Config */}
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-emerald-400" />
                  GitHub Token (用于调用 GitHub Models 免费额度)
                </span>
                <span className="text-[10px] text-emerald-400">免费领取 · 每天百次额度</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={customGitHubToken}
                  onChange={(e) => setCustomGitHubToken(e.target.value)}
                  placeholder="ghp_... (GitHub Personal Access Token)"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
                />
                <select
                  value={githubModel}
                  onChange={(e) => setGitHubModelState(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="gpt-4o-mini">GPT-4o mini (推荐/最快)</option>
                  <option value="Meta-Llama-3.1-70B-Instruct">Llama 3.1 70B</option>
                  <option value="Mistral-large-2407">Mistral Large</option>
                </select>
              </div>
              <p className="text-[10px] text-slate-400">
                💡 <strong>异地朋友使用提示</strong>：任何拥有 GitHub 账号的人，仅需在{' '}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 underline"
                >
                  github.com/settings/tokens
                </a>{' '}
                生成一个免费 Token，即可享受完全免费的顶级大模型服务，不消耗站长任何资金！
              </p>
            </div>

            {/* DeepSeek API Key Config */}
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  DeepSeek 官方 API Key (已启用每日一角钱硬熔断保护)
                </span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800">
                  每日硬顶: ¥0.10 / 50次
                </span>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showRawKey ? 'text' : 'password'}
                    value={customDeepSeekKey}
                    onChange={(e) => setCustomDeepSeekKey(e.target.value)}
                    placeholder="sk-2f4f... (DeepSeek API Key)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-3 pr-8 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRawKey(!showRawKey)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    title={showRawKey ? '隐藏 Key' : '显示完整 Key'}
                  >
                    {showRawKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCustomDeepSeekKey('sk-2f4f22b6aeca4ad4b34f0092043ea9f9');
                  }}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-slate-700"
                  title="恢复站长专属 Key"
                >
                  填入站长 Key
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                <span>🛡️ 六重防消耗体系：零后台静默调用 · 5秒防抖 · 500Token严格截断 · 离线知识库拦截</span>
                <button
                  type="button"
                  onClick={() => {
                    resetDailyUsage();
                    setDailyUsage(getDailyUsage());
                  }}
                  className="text-amber-400 hover:underline cursor-pointer flex-shrink-0"
                >
                  重置今日测试用量
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">
                当前掩码状态: <code className="text-sky-300 font-mono">{maskApiKey(customDeepSeekKey)}</code>
              </span>
              <button
                type="button"
                onClick={handleSaveConfig}
                className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-sky-500/20 cursor-pointer"
              >
                {keySaved ? <Check className="w-3.5 h-3.5 text-black" /> : null}
                <span>{keySaved ? '设置已保存' : '保存双引擎配置'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Message Flow */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role !== 'user' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-500/20">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-sky-600/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none space-y-2 whitespace-pre-wrap'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-sky-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>AI 双引擎分析全网评分、烂尾走势与影评人共识中...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-2 sm:px-4 border-t border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none flex items-center gap-2">
          {PRESET_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Bottom Input Box */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="问问美剧：哪部烂尾了？《权游》第几季崩溃？某剧豆瓣和烂番茄差距为何很大？"
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">发送</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
