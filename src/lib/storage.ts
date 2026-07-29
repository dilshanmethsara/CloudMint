export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  contacted: boolean;
  createdAt: string;
}

const MESSAGES_KEY = "cloudmint_messages";
const VISITS_KEY = "cloudmint_visits";

export function getMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function addMessage(msg: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
  const messages = getMessages();
  const newMsg: ContactMessage = { ...msg, contacted: false, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  messages.unshift(newMsg);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  return newMsg;
}

export function deleteMessage(id: string): void {
  const messages = getMessages().filter(m => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function toggleContacted(id: string): void {
  const messages = getMessages().map(m => m.id === id ? { ...m, contacted: !m.contacted } : m);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function getContactedCount(): number {
  return getMessages().filter(m => m.contacted).length;
}

export function getVisitCount(): number {
  try {
    return parseInt(localStorage.getItem(VISITS_KEY) || "0", 10);
  } catch { return 0; }
}

export function incrementVisit(): void {
  localStorage.setItem(VISITS_KEY, String(getVisitCount() + 1));
}
