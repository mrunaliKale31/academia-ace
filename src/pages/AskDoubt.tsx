import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { addDoubt } from "@/lib/doubts";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "History"];
const urgencies = [
  { value: "low" as const, label: "Low", color: "bg-status-answered" },
  { value: "medium" as const, label: "Medium", color: "bg-status-pending" },
  { value: "high" as const, label: "High", color: "bg-destructive" },
];

function AskDoubtContent() {
  const { user } = useAuth();
  const [form, setForm] = useState({ subject: "", topic: "", title: "", description: "", urgency: "medium" as "low" | "medium" | "high" });
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.title || !form.description) { toast.error("Please fill required fields"); return; }
    setLoading(true);
    setTimeout(() => {
      addDoubt({ userId: user!.id, ...form, imageUrl: image || undefined });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setForm({ subject: "", topic: "", title: "", description: "", urgency: "medium" });
        setImage(null);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-bold mb-6">Ask a Doubt</h2>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass-card p-8 text-center mb-6">
            <CheckCircle className="w-12 h-12 text-status-answered mx-auto mb-3" />
            <p className="font-display font-semibold text-lg">Doubt Submitted!</p>
            <p className="text-sm text-muted-foreground">We'll get back to you soon.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Subject *</Label>
              <Select value={form.subject} onValueChange={(v) => set("subject", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>{subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Topic</Label>
              <Input placeholder="e.g. Calculus" value={form.topic} onChange={(e) => set("topic", e.target.value)} className="mt-1" />
            </div>
          </div>

          <div>
            <Label>Doubt Title *</Label>
            <Input placeholder="Brief title of your doubt" value={form.title} onChange={(e) => set("title", e.target.value)} className="mt-1" />
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea placeholder="Describe your doubt in detail..." value={form.description} onChange={(e) => set("description", e.target.value)} className="mt-1 min-h-[120px]" />
          </div>

          <div>
            <Label>Urgency</Label>
            <div className="flex gap-3 mt-2">
              {urgencies.map((u) => (
                <button
                  key={u.value}
                  type="button"
                  onClick={() => set("urgency", u.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${form.urgency === u.value ? "border-primary bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full ${u.color} mr-2`} />
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Attach Image (optional)</Label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="mt-2 border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              {image ? (
                <div className="relative inline-block">
                  <img src={image} alt="Preview" className="max-h-40 rounded-lg" />
                  <button type="button" onClick={(e) => { e.stopPropagation(); setImage(null); }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full gradient-bg text-primary-foreground border-0 rounded-full">
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Submitting...
              </span>
            ) : "Submit Doubt"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default function AskDoubt() {
  return <DashboardLayout><AskDoubtContent /></DashboardLayout>;
}
