import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "../ui/dialog";
import {
  Smartphone,
  CalendarCheck,
  CheckSquare,
  AlertTriangle,
  Users,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  PanelLeft,
} from "lucide-react";
import { Button } from "../ui/button";

interface TestingGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TestingGuideModal: React.FC<TestingGuideModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogCloseButton onClick={() => onOpenChange(false)} />
      <DialogHeader>
        <div className="flex items-center gap-2 text-pink-600 mb-1">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Evaluation & Testing Guide
          </span>
        </div>
        <DialogTitle className="text-[#4c0519]">How to Test County Campaign Manager</DialogTitle>
        <DialogDescription className="text-rose-900/60">
          Walkthrough to test all 5 pages, the left sidebar navigation, forms, and mobile layouts in the new Pink, Light Blue, and Maroon theme.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 text-sm text-rose-950 max-h-[65vh] overflow-y-auto pr-1">
        {/* Step 1: Left Sidebar & Mobile Responsiveness */}
        <div className="p-3.5 rounded-lg border border-pink-200 bg-pink-50/40">
          <div className="flex items-center gap-2 font-bold text-[#4c0519] mb-1.5">
            <PanelLeft className="h-4 w-4 text-pink-600" />
            <span>1. Left Sidebar Navigation & Mobile Drawer</span>
          </div>
          <p className="text-xs text-rose-900/80 mb-2">
            The navigation bar is positioned as a <strong>side bar on the left</strong>:
          </p>
          <ul className="text-xs text-rose-900/70 space-y-1 list-disc pl-4">
            <li>
              <strong>On Desktop:</strong> The permanent maroon left sidebar gives one-click access to Dashboard, Activities, Tasks, Issues, Team, and the County switcher.
            </li>
            <li>
              <strong>On Mobile / Phone view:</strong> Click the top-left hamburger menu to slide open the Left Sidebar drawer.
            </li>
          </ul>
        </div>

        {/* Step 2: Dashboard */}
        <div className="p-3.5 rounded-lg border border-pink-100 bg-white">
          <div className="flex items-center gap-2 font-bold text-[#4c0519] mb-1.5">
            <CheckCircle2 className="h-4 w-4 text-sky-600" />
            <span>2. Test the Dashboard Page</span>
          </div>
          <ul className="text-xs text-rose-900/70 space-y-1 list-disc pl-4">
            <li>Review the candidate banner with the pink and light-blue voter outreach progress bar.</li>
            <li>Inspect the 4 KPI stat cards (Upcoming Events, Tasks, Community Grievances, Coordinators).</li>
            <li>Use the quick action buttons to instantly launch scheduling, task assignment, or grievance logging.</li>
          </ul>
        </div>

        {/* Step 3: Activities */}
        <div className="p-3.5 rounded-lg border border-pink-100 bg-white">
          <div className="flex items-center gap-2 font-bold text-[#4c0519] mb-1.5">
            <CalendarCheck className="h-4 w-4 text-pink-600" />
            <span>3. Test Activities Page & Scheduling Form</span>
          </div>
          <ul className="text-xs text-rose-900/70 space-y-1 list-disc pl-4">
            <li>Filter activities by <strong>Sub-County</strong> or <strong>Activity Type</strong>.</li>
            <li>Switch between <strong>Card View</strong> and <strong>Agenda List</strong>.</li>
            <li>Click <strong>"+ Schedule Activity"</strong>, submit a new event, and verify it appears immediately in the roster.</li>
            <li>Click <strong>"Mark Done"</strong> on an upcoming event to update its state.</li>
          </ul>
        </div>

        {/* Step 4: Tasks */}
        <div className="p-3.5 rounded-lg border border-pink-100 bg-white">
          <div className="flex items-center gap-2 font-bold text-[#4c0519] mb-1.5">
            <CheckSquare className="h-4 w-4 text-sky-600" />
            <span>4. Test Tasks & Volunteer Operations</span>
          </div>
          <ul className="text-xs text-rose-900/70 space-y-1 list-disc pl-4">
            <li>Filter tasks by status tabs (All, To Do, In Progress, Under Review, Completed) or category.</li>
            <li>Click the checkbox on any task to instantly toggle between To Do and Completed.</li>
            <li>Click <strong>"+ Add Task"</strong> to create a new task assigned to any team member.</li>
          </ul>
        </div>

        {/* Step 5: Community Issues */}
        <div className="p-3.5 rounded-lg border border-pink-100 bg-white">
          <div className="flex items-center gap-2 font-bold text-[#4c0519] mb-1.5">
            <AlertTriangle className="h-4 w-4 text-pink-600" />
            <span>5. Test Community Issues Tracker</span>
          </div>
          <ul className="text-xs text-rose-900/70 space-y-1 list-disc pl-4">
            <li>View grassroots voter grievances (roads, water boreholes, dispensaries, youth levies).</li>
            <li>Click <strong>"+1 Report"</strong> to simulate additional community endorsements.</li>
            <li>Elevate an issue to <strong>"Manifesto Priority"</strong> or <strong>"Pledged in Town Hall"</strong>.</li>
            <li>Click <strong>"+ Log Community Issue"</strong> to log a new ward petition.</li>
          </ul>
        </div>

        {/* Step 6: Team */}
        <div className="p-3.5 rounded-lg border border-pink-100 bg-white">
          <div className="flex items-center gap-2 font-bold text-[#4c0519] mb-1.5">
            <Users className="h-4 w-4 text-sky-600" />
            <span>6. Test Team Directory & Field Status</span>
          </div>
          <ul className="text-xs text-rose-900/70 space-y-1 list-disc pl-4">
            <li>Filter members by department or assigned sub-county.</li>
            <li>Change a coordinator's status between <strong>Active</strong>, <strong>On Field</strong>, and <strong>Standby</strong>.</li>
            <li>Click <strong>"+ Add Team Member"</strong> to add an officer.</li>
          </ul>
        </div>

        {/* Step 7: County Switcher & Reset */}
        <div className="p-3.5 rounded-lg border border-pink-100 bg-white">
          <div className="flex items-center gap-2 font-bold text-[#4c0519] mb-1.5">
            <RotateCcw className="h-4 w-4 text-pink-600" />
            <span>7. County Switcher & Reset Demo Data</span>
          </div>
          <p className="text-xs text-rose-900/80">
            Use the <strong>Switch County</strong> buttons in the left sidebar to toggle between Nyamira, Nairobi, and Nakuru counties. Click <strong>Reset Sample Data</strong> at any time to restore the defaults.
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Button
          onClick={() => onOpenChange(false)}
          className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-auto font-bold"
        >
          Got it, Close Guide
        </Button>
      </div>
    </Dialog>
  );
};
