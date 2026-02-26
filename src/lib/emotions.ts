export type Emotion = 'happy' | 'sad' | 'anxious' | 'angry' | 'lonely' | 'stressed' | 'confused' | 'neutral';

export type Personality = 'mentor' | 'bestfriend' | 'sibling' | 'calm';

export const emotionConfig: Record<Emotion, { icon: string; label: string; color: string }> = {
  happy: { icon: 'sentiment_satisfied', label: 'Happy', color: 'text-emotion-happy' },
  sad: { icon: 'sentiment_dissatisfied', label: 'Sad', color: 'text-emotion-sad' },
  anxious: { icon: 'psychology', label: 'Anxious', color: 'text-emotion-anxious' },
  angry: { icon: 'mood_bad', label: 'Angry', color: 'text-emotion-angry' },
  lonely: { icon: 'sentiment_dissatisfied', label: 'Lonely', color: 'text-emotion-lonely' },
  stressed: { icon: 'psychology', label: 'Stressed', color: 'text-emotion-stressed' },
  confused: { icon: 'lightbulb', label: 'Confused', color: 'text-emotion-confused' },
  neutral: { icon: 'hearing', label: 'Neutral', color: 'text-foreground' },
};

export const personalityConfig: Record<Personality, { icon: string; label: string; description: string }> = {
  mentor: { icon: 'psychology', label: 'Mature Mentor', description: 'Wise & reflective' },
  bestfriend: { icon: 'favorite', label: 'Best Friend', description: 'Casual & warm' },
  sibling: { icon: 'shield', label: 'Big Sibling', description: 'Protective & firm' },
  calm: { icon: 'spa', label: 'Calm Listener', description: 'Soft & soothing' },
};

const emotionKeywords: Record<Emotion, string[]> = {
  happy: ['happy', 'great', 'amazing', 'wonderful', 'excited', 'joy', 'love', 'awesome', 'fantastic', 'good', 'blessed', 'grateful'],
  sad: ['sad', 'cry', 'crying', 'depressed', 'unhappy', 'heartbroken', 'miss', 'lost', 'grief', 'hurt', 'pain', 'tears'],
  anxious: ['anxious', 'worried', 'nervous', 'panic', 'fear', 'scared', 'overthinking', 'restless', 'uneasy', 'dread'],
  angry: ['angry', 'furious', 'mad', 'frustrated', 'irritated', 'annoyed', 'rage', 'hate', 'unfair', 'pissed'],
  lonely: ['lonely', 'alone', 'isolated', 'nobody', 'no one', 'abandoned', 'forgotten', 'left out', 'disconnected'],
  stressed: ['stressed', 'overwhelmed', 'pressure', 'burnout', 'exhausted', 'too much', 'deadline', 'overworked', 'can\'t handle'],
  confused: ['confused', 'lost', 'don\'t know', 'unsure', 'uncertain', 'stuck', 'indecisive', 'mixed feelings'],
  neutral: [],
};

export function detectEmotion(text: string): Emotion {
  const lower = text.toLowerCase();
  let bestMatch: Emotion = 'neutral';
  let bestScore = 0;

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (emotion === 'neutral') continue;
    const score = keywords.filter(k => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = emotion as Emotion;
    }
  }

  return bestMatch;
}

export function detectSelfHarm(text: string): boolean {
  const keywords = ['kill myself', 'suicide', 'end my life', 'want to die', 'self harm', 'self-harm', 'cut myself', 'no reason to live', 'better off dead'];
  const lower = text.toLowerCase();
  return keywords.some(k => lower.includes(k));
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotion?: Emotion;
  isGroupStart?: boolean;
}
