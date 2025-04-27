export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}

export interface Task {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
  created_at: string;
  updated_at: string;
  deadline?: string;
  priority?: 'high' | 'medium' | 'low';
  source?: string;
  sender?: string;
  email_id?: string;
  notes: Array<{ text: string; timestamp: string }>;
}