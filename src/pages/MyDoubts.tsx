import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Calendar, Tag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getDoubts, Doubt } from "@/lib/doubts";
import DashboardLayout from "@/components/DashboardLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function MyDoubtsContent() {
  const { user } = useAuth();
  const doubts = getDoubts(user?.id);
  const [selected, setSelected] = useState<Doubt | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? doubts : doubts.filter((d) => d.status === filter);

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="font-display text-2xl font-bold">My Doubts</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="answered">Answered</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center text-muted-foreground">No doubts found.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(d)}
              className="glass-card p-5 cursor-pointer hover-lift"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-medium text-sm line-clamp-2">{d.title}</h3>
                <span className={`status-${d.status} shrink-0`}>{d.status}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{d.subject}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">{selected.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`status-${selected.status}`}>{selected.status}</span>
                  <span className="text-xs text-muted-foreground">{selected.subject} · {selected.topic || "General"}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
                {selected.imageUrl && <img src={selected.imageUrl} alt="Doubt attachment" className="rounded-lg max-h-48 object-cover" />}
                {selected.answer && (
                  <div className="bg-accent rounded-xl p-4">
                    <p className="text-xs font-semibold text-accent-foreground mb-2">Answer</p>
                    <p className="text-sm leading-relaxed">{selected.answer}</p>
                    <button className="flex items-center gap-1 text-xs text-primary mt-3 hover:underline">
                      <Star className="w-3 h-3" /> Mark as helpful
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function MyDoubts() {
  return <DashboardLayout><MyDoubtsContent /></DashboardLayout>;
}
