import React from "react";
import {
  Vote,
  Calendar,
  HelpCircle,
  RotateCcw,
  MapPin,
  Menu,
  X,
  LayoutDashboard,
  CalendarCheck,
  CheckSquare,
  AlertTriangle,
  Users,
} from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";
import { COUNTIES_CONFIG } from "../../data/mockCampaignData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenTestingGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenTestingGuide,
}) => {
  const {
    countyInfo,
    selectedCountyKey,
    setSelectedCountyKey,
    resetAllData,
    tasks,
    issues,
  } = useCampaign();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
    },
    {
      id: "issues",
      label: "Community Issues",
      icon: AlertTriangle,
      badge: criticalIssuesCount > 0 ? criticalIssuesCount : undefined,
      badgeVariant: "destructive" as const,
    },
    { id: "team", label: "Team", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950 text-white border-b border-zinc-800 shadow-md">
      {/* Top Banner / County Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & County Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
              <Vote className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base sm:text-lg">
                  County Campaign Manager
                </span>
                <span className="hidden sm:inline-flex text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                  2027 General Election
                </span>
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-emerald-400 shrink-0" />
                <span className="font-medium text-zinc-300">
                  {countyInfo.countyName}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="truncate max-w-[140px] sm:max-w-xs text-zinc-400">
                  {countyInfo.governorCandidate} Campaign
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Controls (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* County Switcher */}
            <div className="flex items-center bg-zinc-900 rounded-lg p-1 border border-zinc-800 text-xs">
              <span className="text-zinc-400 px-2 font-medium">County:</span>
              {(Object.keys(COUNTIES_CONFIG) as Array<keyof typeof COUNTIES_CONFIG>).map((cKey) => (
                <button
                  key={cKey}
                  onClick={() => setSelectedCountyKey(cKey)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    selectedCountyKey === cKey
                      ? "bg-emerald-700 text-white font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cKey}
                </button>
              ))}
            </div>

            {/* How to Test Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenTestingGuide}
              className="bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-white text-xs h-8 gap-1.5"
            >
              <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
              How to Test
            </Button>

            {/* Reset Demo Data Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm("Reset all campaign activities, tasks, issues, and team to sample data?")) {
                  resetAllData();
                }
              }}
              title="Reset to default fictional data"
              className="text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs h-8 px-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenTestingGuide}
              className="p-2 rounded-lg bg-zinc-900 text-emerald-400 border border-zinc-800 text-xs flex items-center gap-1"
              aria-label="How to test"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="text-xs font-medium text-zinc-200 hidden sm:inline">Test Guide</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Bar */}
        <div className="hidden lg:flex items-center space-x-1 border-t border-zinc-800/80 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-xs font-semibold"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-zinc-400"}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      item.badgeVariant === "destructive"
                        ? "bg-red-500 text-white"
                        : "bg-emerald-950 text-emerald-300 border border-emerald-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-3 pb-5 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-emerald-800 text-white font-semibold"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-emerald-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        item.badgeVariant === "destructive"
                          ? "bg-red-600 text-white"
                          : "bg-emerald-900 text-emerald-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Select County:</span>
              <div className="flex gap-1">
                {(Object.keys(COUNTIES_CONFIG) as Array<keyof typeof COUNTIES_CONFIG>).map((cKey) => (
                  <button
                    key={cKey}
                    onClick={() => setSelectedCountyKey(cKey)}
                    className={`px-2 py-1 rounded text-xs ${
                      selectedCountyKey === cKey
                        ? "bg-emerald-700 text-white font-medium"
                        : "bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {cKey}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs bg-zinc-900 border-zinc-800 text-zinc-300"
                onClick={() => {
                  onOpenTestingGuide();
                  setMobileMenuOpen(false);
                }}
              >
                <HelpCircle className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                How to Test App
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-zinc-400 hover:text-zinc-200"
                onClick={() => {
                  if (confirm("Reset to sample data?")) {
                    resetAllData();
                    setMobileMenuOpen(false);
                  }
                }}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
