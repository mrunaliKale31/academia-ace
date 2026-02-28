import { motion } from "framer-motion";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getDoubts } from "@/lib/doubts";
import DashboardLayout from "@/components/DashboardLayout";

function DashboardContent() {
  const { user } = useAuth();
  const doubts = getDoubts(user?.id);
  const total = doubts.length;
  const answered = doubts.filter((d) => d.status === "answered").length;
  const pending = doubts.filter((d) => d.status === "pending").length;

  const stats = [
    { label: "Total Doubts", value: total, icon: FileText, color: "text-primary" },
    { label: "Solved", value: answered, icon: CheckCircle, color: "text-status-answered" },
    { label: "Pending", value: pending, icon: Clock, color: "text-status-pending" },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-3xl font-display font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold">Recent Doubts</h3>
          <Link to="/my-doubts" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {doubts.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No doubts yet. Ask your first doubt!</p>
            <Link to="/ask" className="text-primary text-sm hover:underline mt-2 inline-block">Ask a doubt →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {doubts.slice(0, 5).map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 flex items-center justify-between gap-4 hover-lift">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.subject} · {new Date(d.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`status-${d.status} shrink-0`}>
                  {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardLayout><DashboardContent /></DashboardLayout>;
}
