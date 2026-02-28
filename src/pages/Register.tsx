import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const pwChecks = [
  { label: "8+ characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Number", test: (p: string) => /\d/.test(p) },
];

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", grade: "", stream: "" });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.grade || !form.stream) { toast.error("Please fill all fields"); return; }
    if (form.password !== form.confirm) { toast.error("Passwords don't match"); return; }
    if (!agreed) { toast.error("Please accept the terms"); return; }
    setLoading(true);
    await register({ ...form, password: form.password });
    setLoading(false);
    toast.success("Account created!");
    navigate("/dashboard");
  };

  const strength = pwChecks.filter((c) => c.test(form.password)).length;

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-lg p-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="font-display text-2xl font-bold mb-1">Create your account</h1>
        <p className="text-sm text-muted-foreground mb-6">Join DoubtDesk and start learning</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="John Doe" value={form.name} onChange={(e) => set("name", e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Grade</Label>
              <Select value={form.grade} onValueChange={(v) => set("grade", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {["9th", "10th", "11th", "12th"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Stream</Label>
              <Select value={form.stream} onValueChange={(v) => set("stream", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {["Science", "Commerce", "Arts"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Password</Label>
            <div className="relative mt-1">
              <Input type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => set("password", e.target.value)} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {form.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? (strength === 3 ? "bg-status-answered" : strength === 2 ? "bg-status-pending" : "bg-destructive") : "bg-muted"}`} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-1">
                  {pwChecks.map((c) => (
                    <span key={c.label} className="flex items-center gap-1 text-xs text-muted-foreground">
                      {c.test(form.password) ? <Check className="w-3 h-3 text-status-answered" /> : <X className="w-3 h-3 text-destructive" />}
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input type="password" placeholder="••••••••" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} className="mt-1" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
            <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">I agree to the Terms & Conditions</Label>
          </div>
          <Button type="submit" disabled={loading} className="w-full gradient-bg text-primary-foreground border-0 rounded-full">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
