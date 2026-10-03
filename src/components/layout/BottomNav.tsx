import React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  CheckSquare,
  AlertTriangle,
  Users,
} from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
}) => {
  const { tasks, issues } = useCampaign();

  const pendingTasksCount = tasks.filter((t) => t.status !== "Completed").length;
  const criticalIssuesCount = issues.filter(
    (i) => i.severity === "Critical" && i.status !== "Resolved/Addressed"
  ).length;

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "activities", label: "Activities", icon: CalendarCheck },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
    },
    {
      id: "issues",
      label: "Issues",
      icon: AlertTriangle,
      badge: criticalIssuesCount > 0 ? criticalIssuesCount : undefined,
      badgeAlert: true,
    },
    { id: "team", label: "Team", icon: Users },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 pb-safe">
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onNavigate(tab.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
                isActive
                  ? "text-emerald-400 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? "text-emerald-400 stroke-[2.2]" : "text-zinc-400"}`} />
                {tab.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2 text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center text-white ${
                      tab.badgeAlert ? "bg-red-600" : "bg-emerald-600"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 leading-tight tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
