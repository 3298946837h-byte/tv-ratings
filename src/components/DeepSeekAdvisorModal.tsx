import React, { useState, useRef, useEffect } from 'react';
import {
  chatWithDeepSeek,
  getDeepSeekApiKey,
  setDeepSeekApiKey,
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
        '👋 你好！我是 **DeepSeek 权威美剧口碑与避雷分析专家**。\n\n我已全面接入各大主流评分平台（**IMDb、烂番茄 Rotten Tomatoes、Metacritic、豆瓣电影、TMDb**）的数据与影评人共识。无论是找神作、避大坑、分析单集口碑走势还是探讨中西审美分歧，都可以随时问我！',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [customKey, setCustomKey] = useState(getDeepSeekApiKey());
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
      const reply = await chatWithDeepSeek(newMsgs);
      setMessages([...newMsgs, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          content: `❌ 请求出错: ${err.message || '请检查网络或 API Key'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = () => {
    setDeepSeekApiKey(customKey.trim());
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
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">DeepSeek 权威剧荒与避雷顾问</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DeepSeek-Chat 在线
                </span>
              </div>
              <p className="text-xs text-slate-400">
                各大平台评分对齐 · 烂尾断崖排查 · 中外口碑解构
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="配置 API Key"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">API 设置</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* API Key Config Dropdown */}
        {showKeyConfig && (
          <div className="p-4 bg-slate-950 border-b border-slate-800 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">DeepSeek API Key 设置</span>
              <span className="text-[11px] text-emerald-400">已默认预装您的 API Key</span>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="sk-..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={handleSaveKey}
                className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                {keySaved ? <Check className="w-3.5 h-3.5 text-black" /> : null}
                {keySaved ? '已保存' : '保存'}
              </button>
            </div>
          </div>
        )}

        {/* Message Flow */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-sky-600/30">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-sky-500 text-slate-950 font-medium'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 shadow-md'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Loading bubble */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-sky-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>DeepSeek 正在综合全网权威平台评分与影评人长评进行深度分析...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 flex-shrink-0 font-medium mr-1">
            <Flame className="w-3 h-3 text-amber-400" />
            快速提问:
          </span>
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 whitespace-nowrap transition-colors cursor-pointer flex-shrink-0 hover:text-white"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
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
              placeholder="输入任何想查的美剧（如：'《流人》值得看吗？' 或 '2024最值得看的美剧是什么'）..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-center cursor-pointer ${
                input.trim() && !isLoading
                  ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
