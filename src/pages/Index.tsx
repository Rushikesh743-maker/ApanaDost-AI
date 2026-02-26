import { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Personality, detectEmotion, detectSelfHarm } from '@/lib/emotions';
import { streamChat } from '@/lib/chat';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import PersonalitySelector from '@/components/PersonalitySelector';
import TypingIndicator from '@/components/TypingIndicator';
import CrisisAlert from '@/components/CrisisAlert';
import ThemeToggle from '@/components/ThemeToggle';
import MaterialIcon from '@/components/MaterialIcon';

const WELCOME_MESSAGES: Message[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content: "Hey, I'm ApnaDost.",
    timestamp: new Date(),
    isGroupStart: true,
  },
  {
    id: 'welcome-2',
    role: 'assistant',
    content: "Whatever's on your mind, I'm here to listen.",
    timestamp: new Date(),
  },
  {
    id: 'welcome-3',
    role: 'assistant',
    content: "No judgment, just support. How are you feeling today?",
    timestamp: new Date(),
  },
];

type ChatHistories = Record<Personality, Message[]>;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const Index = () => {
  const [chatHistories, setChatHistories] = useState<ChatHistories>({
    mentor: [...WELCOME_MESSAGES],
    bestfriend: [...WELCOME_MESSAGES],
    sibling: [...WELCOME_MESSAGES],
    calm: [...WELCOME_MESSAGES],
  });
  const [personality, setPersonality] = useState<Personality>('bestfriend');
  const [isLoading, setIsLoading] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('apnadost-theme');
    return saved ? saved === 'dark' : true;
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = chatHistories[personality];
  const setMessages = useCallback((updater: Message[] | ((prev: Message[]) => Message[])) => {
    setChatHistories(prev => ({
      ...prev,
      [personality]: typeof updater === 'function' ? updater(prev[personality]) : updater,
    }));
  }, [personality]);

  // Apply theme classes to root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', !isDark);
    root.classList.remove('personality-mentor', 'personality-bestfriend', 'personality-sibling', 'personality-calm');
    root.classList.add(`personality-${personality}`);
    localStorage.setItem('apnadost-theme', isDark ? 'dark' : 'light');
  }, [isDark, personality]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
  }, []);

  useEffect(scrollToBottom, [messages, isLoading, isRevealing, scrollToBottom]);

  const revealBubbles = async (fullText: string, baseId: string) => {
    const parts = fullText.split('|||').map(s => s.trim()).filter(Boolean);
    if (parts.length === 0) return;

    setIsRevealing(true);

    for (let i = 0; i < parts.length; i++) {
      setIsLoading(true);
      await sleep(2000);
      setIsLoading(false);

      const msg: Message = {
        id: `${baseId}-${i}`,
        role: 'assistant',
        content: parts[i],
        timestamp: new Date(),
        isGroupStart: i === 0,
      };

      setMessages(prev => [...prev, msg]);
    }

    setIsRevealing(false);
  };

  const handleSend = async (text: string) => {
    if (isRevealing) return;

    const emotion = detectEmotion(text);
    const isCrisis = detectSelfHarm(text);
    if (isCrisis) setShowCrisis(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      emotion,
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let fullResponse = '';
    const assistantId = (Date.now() + 1).toString();

    const chatHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    const allMsgs = [...messages.filter(m => !m.id.startsWith('welcome')), userMsg];
    let currentRole: string | null = null;
    let currentContent = '';

    for (const m of allMsgs) {
      if (m.role === currentRole) {
        currentContent += '\n' + m.content;
      } else {
        if (currentRole) {
          chatHistory.push({ role: currentRole as 'user' | 'assistant', content: currentContent });
        }
        currentRole = m.role;
        currentContent = m.content;
      }
    }
    if (currentRole) {
      chatHistory.push({ role: currentRole as 'user' | 'assistant', content: currentContent });
    }

    await streamChat({
      messages: chatHistory,
      personality,
      emotion,
      onDelta: (chunk) => {
        fullResponse += chunk;
      },
      onDone: async () => {
        setIsLoading(false);
        await revealBubbles(fullResponse, assistantId);
      },
      onError: (err) => {
        setIsLoading(false);
        setMessages(prev => [
          ...prev,
          { id: assistantId, role: 'assistant', content: `Hmm, something went wrong. ${err}`, timestamp: new Date(), isGroupStart: true },
        ]);
      },
    });
  };

  return (
    <div className="h-dvh w-full bg-app-gradient flex flex-col relative overflow-hidden">
      <BackgroundOrbs />

      {/* Header */}
      <header className="relative z-10 glass-strong border-b border-border/30 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 icon-avatar animate-float">
              <MaterialIcon name="favorite" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold font-display text-foreground">ApnaDost</h1>
              <p className="text-[10px] text-muted-foreground">
                {isLoading || isRevealing ? 'typing...' : 'Your always-there friend'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(d => !d)} />
          </div>
        </div>
      </header>

      {/* Main chat area */}
      <main className="flex-1 overflow-hidden relative z-10">
        <div ref={scrollRef} className="h-full overflow-y-auto px-4 py-4">
          <div className="max-w-2xl mx-auto space-y-4">
            <PersonalitySelector personality={personality} onPersonalityChange={setPersonality} />

            <div className="space-y-2">
              {messages.map((msg, i) => {
                const isLastInGroup =
                  i === messages.length - 1 ||
                  messages[i + 1]?.role !== msg.role ||
                  messages[i + 1]?.isGroupStart;

                return (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    showAvatar={msg.isGroupStart !== false}
                    showTimestamp={isLastInGroup}
                  />
                );
              })}
              {isLoading && <TypingIndicator />}
              {showCrisis && <CrisisAlert />}
            </div>
          </div>
        </div>
      </main>

      {/* Input */}
      <footer className="relative z-10 px-4 pb-4 pt-2">
        <div className="max-w-2xl mx-auto">
          <ChatInput onSend={handleSend} isLoading={isLoading || isRevealing} />
        </div>
      </footer>
    </div>
  );
};

export default Index;
