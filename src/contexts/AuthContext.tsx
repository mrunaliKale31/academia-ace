import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  grade: string;
  stream: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("doubtdesk_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login
    const users = JSON.parse(localStorage.getItem("doubtdesk_users") || "[]");
    const found = users.find((u: any) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem("doubtdesk_user", JSON.stringify(found));
      return true;
    }
    // Demo login
    const demoUser: User = { id: "1", name: "Student", email, grade: "12th", stream: "Science" };
    setUser(demoUser);
    localStorage.setItem("doubtdesk_user", JSON.stringify(demoUser));
    return true;
  };

  const register = async (data: Omit<User, "id"> & { password: string }) => {
    const newUser: User = { id: Date.now().toString(), name: data.name, email: data.email, grade: data.grade, stream: data.stream };
    const users = JSON.parse(localStorage.getItem("doubtdesk_users") || "[]");
    users.push(newUser);
    localStorage.setItem("doubtdesk_users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("doubtdesk_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("doubtdesk_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
