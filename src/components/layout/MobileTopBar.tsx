import React from "react";
import { Menu, Vote, MapPin, HelpCircle } from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";

interface MobileTopBarProps {
  onOpenSidebar: () => void;
  onOpenTestingGuide: () => void;
  currentPage: string;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  onOpenSidebar,
  onOpenTestingGuide,
  currentPage,
}) => {
  const { countyInfo } = useCampaign();

  const pageNames: Record<string, string> = {
    dashboard: "Dashboard",
    activities: "Activities",
    tasks: "Tasks",
    issues: "Community Issues",
    team: "Team",
  };

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-[#4c0519] text-white border-b border-[#701a31] px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-lg bg-[#3b0414] text-pink-200 hover:text-white border border-[#881337] active:scale-95 transition-transform"
            aria-label="Open Left Sidebar Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-pink-500 to-sky-400 flex items-center justify-center text-white shadow-xs">
              <Vote className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight">
                  County Campaign
                </span>
                <span className="text-[10px] bg-pink-500 text-white px-1.5 py-0.2 rounded font-semibold">
                  {pageNames[currentPage] || "Manager"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-pink-200">
                <MapPin className="h-3 w-3 text-sky-300" />
                <span className="truncate max-w-[130px] font-medium">
                  {countyInfo.countyName}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenTestingGuide}
          className="p-2 rounded-lg bg-[#3b0414] text-sky-300 border border-[#881337] flex items-center gap-1 text-xs font-medium hover:bg-rose-900/60"
          title="Testing Guide"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Guide</span>
        </button>
      </div>
    </header>
  );
};
