export interface Doubt {
  id: string;
  userId: string;
  subject: string;
  topic: string;
  title: string;
  description: string;
  imageUrl?: string;
  urgency: "low" | "medium" | "high";
  status: "pending" | "answered" | "rejected";
  answer?: string;
  createdAt: string;
}

const STORAGE_KEY = "doubtdesk_doubts";

export function getDoubts(userId?: string): Doubt[] {
  const all: Doubt[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return userId ? all.filter((d) => d.userId === userId) : all;
}

export function addDoubt(doubt: Omit<Doubt, "id" | "createdAt" | "status">): Doubt {
  const newDoubt: Doubt = {
    ...doubt,
    id: Date.now().toString(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const all = getDoubts();
  all.unshift(newDoubt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return newDoubt;
}

export function seedDoubts(userId: string) {
  const existing = getDoubts(userId);
  if (existing.length > 0) return;

  const seeds: Doubt[] = [
    { id: "s1", userId, subject: "Mathematics", topic: "Calculus", title: "How to solve integration by parts?", description: "I'm confused about when to use integration by parts vs substitution.", urgency: "high", status: "answered", answer: "Use integration by parts when you have a product of two functions where one simplifies when differentiated. The formula is ∫u dv = uv - ∫v du.", createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: "s2", userId, subject: "Physics", topic: "Mechanics", title: "Newton's Third Law confusion", description: "If every action has an equal and opposite reaction, why do objects move?", urgency: "medium", status: "answered", answer: "The action and reaction forces act on different objects! When you push a wall, the wall pushes back on you - but since the forces are on different objects, they don't cancel.", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: "s3", userId, subject: "Computer Science", topic: "Data Structures", title: "When to use HashMap vs TreeMap?", description: "What are the performance trade-offs?", urgency: "low", status: "pending", createdAt: new Date().toISOString() },
    { id: "s4", userId, subject: "Biology", topic: "Genetics", title: "Difference between DNA and RNA", description: "Can someone explain the structural and functional differences?", urgency: "medium", status: "rejected", createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
  ];

  const all = getDoubts();
  all.push(...seeds);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
