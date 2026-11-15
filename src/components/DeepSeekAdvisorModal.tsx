import React, { useState, useRef, useEffect } from 'react';
import {
  chatWithAI,
  getDeepSeekApiKey,
  setDeepSeekApiKey,
  getGitHubToken,
  setGitHubToken,
  getAIProvider,
  setAIProvider,
  getGitHubModel,
  setGitHubModel,
  AIProvider,
  DeepSeekMessage,
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
  const [customGitHubToken, setCustomGitHubToken] = useState(getGitHubToken());
  const [githubModel, setGitHubModelState] = useState(getGitHubModel());
  const [keySaved, setKeySaved] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    }
  };

  const handleSaveConfig = () => {
    setAIProvider(provider);
    setDeepSeekApiKey(customDeepSeekKey.trim());
    setGitHubToken(customGitHubToken.trim());
    setGitHubModel(githubModel);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyConfig(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col h-[90vh] sm:h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
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
              <span className="hidden sm:inline">AI 引擎配置</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
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
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setProviderState('auto')}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  provider === 'auto'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">智能双引擎 (推荐)</div>
                <div className="text-[10px] text-slate-400 scale-95">优先 GitHub 免费，备用 DeepSeek</div>
              </button>

              <button
                type="button"
                onClick={() => setProviderState('github_models')}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  provider === 'github_models'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">GitHub Models</div>
                <div className="text-[10px] text-emerald-400 scale-95">100% 免费配额 (0 成本)</div>
              </button>

              <button
                type="button"
                onClick={() => setProviderState('deepseek')}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  provider === 'deepseek'
                    ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">DeepSeek-V3</div>
                <div className="text-[10px] text-slate-400 scale-95">官方极速智能模型</div>
              </button>
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
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">DeepSeek API Key</span>
                <span className="text-[10px] text-slate-400">已默认预装站长专属 Key</span>
              </div>
              <input
                type="password"
                value={customDeepSeekKey}
                onChange={(e) => setCustomDeepSeekKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex justify-end">
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
