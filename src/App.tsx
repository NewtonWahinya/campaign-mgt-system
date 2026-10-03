/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CampaignProvider } from "./context/CampaignContext";
import { Sidebar } from "./components/layout/Sidebar";
import { MobileTopBar } from "./components/layout/MobileTopBar";
import { DashboardView } from "./components/views/DashboardView";
import { ActivitiesView } from "./components/views/ActivitiesView";
import { TasksView } from "./components/views/TasksView";
import { CommunityIssuesView } from "./components/views/CommunityIssuesView";
import { TeamView } from "./components/views/TeamView";
import { TestingGuideModal } from "./components/modals/TestingGuideModal";
import { NewActivityModal } from "./components/modals/NewActivityModal";
import { NewTaskModal } from "./components/modals/NewTaskModal";
import { NewIssueModal } from "./components/modals/NewIssueModal";
import { NewTeamMemberModal } from "./components/modals/NewTeamMemberModal";
import { ShieldCheck, Info } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modal open states
  const [testingGuideOpen, setTestingGuideOpen] = useState(false);
  const [newActivityOpen, setNewActivityOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [newIssueOpen, setNewIssueOpen] = useState(false);
  const [newTeamMemberOpen, setNewTeamMemberOpen] = useState(false);

  return (
    <CampaignProvider>
      <div className="min-h-screen bg-[#fdfafb] flex text-[#1e050e] selection:bg-pink-200 selection:text-pink-900">
        {/* Left Sidebar Navigation (Desktop permanent side bar & mobile slide-out drawer) */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => setCurrentPage(page)}
          onOpenTestingGuide={() => setTestingGuideOpen(true)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area (Offset by left sidebar on desktop) */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64 xl:pl-72 transition-all">
          {/* Mobile Top Bar with Hamburger for Left Sidebar */}
          <MobileTopBar
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            onOpenTestingGuide={() => setTestingGuideOpen(true)}
            currentPage={currentPage}
          />

          {/* Main Content Viewport */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
            {currentPage === "dashboard" && (
              <DashboardView
                onNavigate={(page) => setCurrentPage(page)}
                onOpenScheduleActivity={() => setNewActivityOpen(true)}
                onOpenAssignTask={() => setNewTaskOpen(true)}
                onOpenLogIssue={() => setNewIssueOpen(true)}
                onOpenAddTeamMember={() => setNewTeamMemberOpen(true)}
              />
            )}

            {currentPage === "activities" && (
              <ActivitiesView
                onOpenScheduleActivity={() => setNewActivityOpen(true)}
              />
            )}

            {currentPage === "tasks" && (
              <TasksView
                onOpenAssignTask={() => setNewTaskOpen(true)}
              />
            )}

            {currentPage === "issues" && (
              <CommunityIssuesView
                onOpenLogIssue={() => setNewIssueOpen(true)}
              />
            )}

            {currentPage === "team" && (
              <TeamView
                onOpenAddTeamMember={() => setNewTeamMemberOpen(true)}
              />
            )}
          </main>

          {/* Footer with Disclaimer */}
          <footer className="mt-auto border-t border-pink-100 bg-white py-6 text-center text-xs text-rose-900/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-rose-950 font-bold">
                <ShieldCheck className="h-4 w-4 text-pink-600" />
                <span>County Campaign Manager • Working Prototype</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-900/50 text-[11px]">
                <Info className="h-3.5 w-3.5 text-sky-600" />
                <span>Theme: Pink, Light Blue & Maroon • Left Sidebar Navigation</span>
              </div>
              <div className="flex items-center gap-3 text-rose-900/60">
                <button
                  onClick={() => setTestingGuideOpen(true)}
                  className="hover:text-pink-600 underline transition-colors font-medium"
                >
                  Testing Guide
                </button>
                <span>•</span>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-rose-950"
                >
                  Back to top ↑
                </button>
              </div>
            </div>
          </footer>
        </div>

        {/* Interactive Modals */}
        <TestingGuideModal
          open={testingGuideOpen}
          onOpenChange={setTestingGuideOpen}
        />

        <NewActivityModal
          open={newActivityOpen}
          onOpenChange={setNewActivityOpen}
        />

        <NewTaskModal
          open={newTaskOpen}
          onOpenChange={setNewTaskOpen}
        />

        <NewIssueModal
          open={newIssueOpen}
          onOpenChange={setNewIssueOpen}
        />

        <NewTeamMemberModal
          open={newTeamMemberOpen}
          onOpenChange={setNewTeamMemberOpen}
        />
      </div>
    </CampaignProvider>
  );
}
