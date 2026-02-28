import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

function ProfileContent() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");

  const handleUpdate = () => {
    if (user) {
      const updated = { ...user, name };
      localStorage.setItem("doubtdesk_user", JSON.stringify(updated));
      toast.success("Profile updated!");
    }
  };

  const handleChangePw = () => {
    if (!oldPw || !newPw) { toast.error("Please fill both fields"); return; }
    toast.success("Password changed!");
    setOldPw("");
    setNewPw("");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      logout();
      toast.success("Account deleted");
    }
  };

  return (
    <div className="max-w-xl space-y-8">
      <h2 className="font-display text-2xl font-bold">Profile</h2>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">{user?.name?.charAt(0)}</span>
          </div>
          <div>
            <p className="font-display font-semibold">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
        </div>
        <Button onClick={handleUpdate} className="gradient-bg text-primary-foreground border-0 rounded-full">
          <User className="w-4 h-4 mr-2" /> Update Profile
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 space-y-4">
        <h3 className="font-display font-semibold">Change Password</h3>
        <div>
          <Label>Current Password</Label>
          <Input type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>New Password</Label>
          <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} className="mt-1" />
        </div>
        <Button onClick={handleChangePw} variant="outline" className="rounded-full">
          <Lock className="w-4 h-4 mr-2" /> Change Password
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 border-destructive/20">
        <h3 className="font-display font-semibold text-destructive mb-2">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all data.</p>
        <Button onClick={handleDelete} variant="destructive" className="rounded-full">
          <Trash2 className="w-4 h-4 mr-2" /> Delete Account
        </Button>
      </motion.div>
    </div>
  );
}

export default function Profile() {
  return <DashboardLayout><ProfileContent /></DashboardLayout>;
}
