import React from "react";
import {
  Vote,
  LayoutDashboard,
  CalendarCheck,
  CheckSquare,
  AlertTriangle,
  Users,
  MapPin,
  HelpCircle,
  RotateCcw,
  X,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";
import { COUNTIES_CONFIG } from "../../data/mockCampaignData";
import { Button } from "../ui/button";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenTestingGuide: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onOpenTestingGuide,
  mobileOpen,
  onCloseMobile,
}) => {
  const {
    countyInfo,
    selectedCountyKey,
    setSelectedCountyKey,
    resetAllData,
    tasks,
    issues,
  } = useCampaign();

  const pendingTasksCount = tasks.filter((t) => t.status !== "Completed").length;
  const criticalIssuesCount = issues.filter(
    (i) => i.severity === "Critical" && i.status !== "Resolved/Addressed"
  ).length;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "activities", label: "Activities", icon: CalendarCheck },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
      badgeColor: "bg-sky-400 text-sky-950 font-bold",
    },
    {
      id: "issues",
      label: "Community Issues",
      icon: AlertTriangle,
      badge: criticalIssuesCount > 0 ? criticalIssuesCount : undefined,
      badgeColor: "bg-pink-500 text-white font-bold animate-pulse",
    },
    { id: "team", label: "Team", icon: Users },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#4c0519] text-white border-r border-[#701a31] select-none">
      {/* Brand & County Info Header */}
      <div className="p-5 border-b border-[#701a31]/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 via-rose-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-pink-950/40">
              <Vote className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="font-extrabold tracking-tight text-white text-base leading-tight">
                Campaign Manager
              </h2>
              <span className="text-[11px] font-bold text-pink-300 tracking-wide uppercase">
                County Election 2027
              </span>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-pink-200 hover:text-white hover:bg-rose-900/60 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Candidate & Slogan Card */}
        <div className="mt-4 p-3 rounded-xl bg-[#360312] border border-[#881337] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-sky-300 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {countyInfo.countyName}
            </span>
            <span className="text-[10px] bg-pink-900/80 text-pink-200 border border-pink-700/60 px-1.5 py-0.5 rounded font-bold">
              HQ Active
            </span>
          </div>
          <p className="text-xs font-bold text-white truncate">
            {countyInfo.governorCandidate}
          </p>
          <p className="text-[11px] text-pink-200/80 italic truncate">
            &ldquo;{countyInfo.campaignSlogan}&rdquo;
          </p>
        </div>

        {/* County Switcher Selector */}
        <div className="mt-3">
          <label className="block text-[11px] font-medium text-pink-200 mb-1">
            Switch County:
          </label>
          <div className="grid grid-cols-3 gap-1 bg-[#360312] p-1 rounded-lg border border-[#881337]">
            {(Object.keys(COUNTIES_CONFIG) as Array<keyof typeof COUNTIES_CONFIG>).map((cKey) => (
              <button
                key={cKey}
                onClick={() => setSelectedCountyKey(cKey)}
                className={`py-1 text-xs rounded font-medium transition-all ${
                  selectedCountyKey === cKey
                    ? "bg-pink-600 text-white font-bold shadow-xs"
                    : "text-pink-200/80 hover:text-white hover:bg-rose-900/40"
                }`}
              >
                {cKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-pink-300/80">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-pink-600 to-rose-700 text-white shadow-md shadow-pink-950/30 translate-x-1"
                  : "text-pink-100 hover:bg-rose-900/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4.5 w-4.5 ${
                    isActive ? "text-sky-200" : "text-pink-300"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Controls / Help / Reset */}
      <div className="p-4 border-t border-[#701a31]/80 space-y-2.5 bg-[#3b0414]">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onOpenTestingGuide();
            onCloseMobile();
          }}
          className="w-full bg-[#4c0519] border-pink-400/40 text-pink-100 hover:bg-pink-600 hover:text-white text-xs h-9 justify-start gap-2"
        >
          <HelpCircle className="h-4 w-4 text-sky-300 shrink-0" />
          <span>How to Test Application</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm("Reset all campaign activities, tasks, issues, and team to sample data?")) {
              resetAllData();
              onCloseMobile();
            }
          }}
          className="w-full text-pink-200 hover:text-white hover:bg-rose-900/60 text-xs h-8 justify-start gap-2"
        >
          <RotateCcw className="h-3.5 w-3.5 text-pink-300 shrink-0" />
          <span>Reset Sample Data</span>
        </Button>

        <div className="pt-2 border-t border-rose-900/60 flex items-center justify-between text-[11px] text-pink-300/70">
          <span>Palette: Pink • Sky • Maroon</span>
          <span className="font-semibold text-sky-300">v1.2</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Left Sidebar (Always visible on lg screens) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 xl:w-72 z-40 shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Left sidebar slide-out when mobileOpen is true) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Sidebar Drawer */}
          <aside className="relative w-72 max-w-[85vw] h-full z-50 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
