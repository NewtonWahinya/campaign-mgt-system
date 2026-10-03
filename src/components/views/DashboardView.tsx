import React from "react";
import {
  CalendarCheck,
  CheckSquare,
  AlertTriangle,
  Users,
  ChevronRight,
  Plus,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  ThumbsUp,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface DashboardViewProps {
  onNavigate: (page: string) => void;
  onOpenScheduleActivity: () => void;
  onOpenAssignTask: () => void;
  onOpenLogIssue: () => void;
  onOpenAddTeamMember: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenScheduleActivity,
  onOpenAssignTask,
  onOpenLogIssue,
  onOpenAddTeamMember,
}) => {
  const {
    countyInfo,
    activities,
    tasks,
    issues,
    team,
    updateTaskStatus,
    incrementIssueReport,
  } = useCampaign();

  const upcomingActivities = activities
    .filter((a) => a.status === "Upcoming" || a.status === "In Progress")
    .slice(0, 3);

  const urgentTasks = tasks
    .filter((t) => t.status !== "Completed")
    .sort((a, b) => (a.priority === "Urgent" ? -1 : 1))
    .slice(0, 4);

  const topIssues = [...issues]
    .sort((a, b) => b.reportedCount - a.reportedCount)
    .slice(0, 3);

  const completedTasksCount = tasks.filter((t) => t.status === "Completed").length;
  const criticalIssuesCount = issues.filter(
    (i) => i.severity === "Critical" && i.status !== "Resolved/Addressed"
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Candidate Hero Card with Election Countdown (Maroon, Pink & Light Blue) */}
      <div className="rounded-2xl bg-[#4c0519] text-white p-5 sm:p-7 border border-[#701a31] shadow-lg relative overflow-hidden">
        {/* Decorative glows in pink and light blue */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-20 bottom-0 w-52 h-52 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#360312] border border-pink-500/40 text-pink-200 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-300" />
              <span>County Campaign HQ</span>
              <span className="text-pink-400">•</span>
              <span className="text-sky-300 font-bold">128 Days to General Election</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {countyInfo.governorCandidate}
            </h1>
            <p className="text-sm sm:text-base text-pink-100 italic font-medium">
              &ldquo;{countyInfo.campaignSlogan}&rdquo;
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-pink-200/90">
              <span>Running Mate: <strong className="text-white">{countyInfo.runningMateCandidate}</strong></span>
              <span>•</span>
              <span>County: <strong className="text-white">{countyInfo.countyName}</strong></span>
              <span>•</span>
              <span>Sub-Counties: <strong className="text-sky-300">{countyInfo.subCounties.length}</strong></span>
            </div>
          </div>

          {/* Quick Election Target Gauge in Maroon & Light Blue & Pink */}
          <div className="bg-[#360312]/95 border border-[#881337] p-4 rounded-xl min-w-[280px] space-y-3 shadow-md">
            <div className="flex justify-between items-center text-xs">
              <span className="text-pink-200 font-medium">Voter Outreach Target</span>
              <span className="text-sky-300 font-bold">148,250 / 240,000 (61.8%)</span>
            </div>
            {/* Progress Bar with Pink & Light Blue gradient */}
            <div className="w-full bg-[#20010a] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#701a31]">
              <div
                className="bg-gradient-to-r from-pink-500 to-sky-400 h-full rounded-full transition-all duration-500 shadow-xs"
                style={{ width: "61.8%" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[#701a31] text-pink-200">
              <div>
                <span className="block text-pink-300/70">Registered Baseline:</span>
                <span className="font-semibold text-white">345,000 Voters</span>
              </div>
              <div>
                <span className="block text-pink-300/70">Wards Activated:</span>
                <span className="font-bold text-sky-300">17 of 20 Wards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-6 pt-5 border-t border-[#701a31] flex flex-wrap gap-2.5">
          <Button
            onClick={onOpenScheduleActivity}
            size="sm"
            className="bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-xs text-xs h-9 border border-pink-400/40"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Schedule Activity
          </Button>

          <Button
            onClick={onOpenAssignTask}
            size="sm"
            variant="outline"
            className="bg-[#360312] border-sky-400/40 text-sky-200 hover:bg-sky-500 hover:text-white text-xs h-9"
          >
            <CheckSquare className="h-3.5 w-3.5 mr-1.5 text-sky-300" />
            Assign Task
          </Button>

          <Button
            onClick={onOpenLogIssue}
            size="sm"
            variant="outline"
            className="bg-[#360312] border-pink-400/40 text-pink-200 hover:bg-pink-600 hover:text-white text-xs h-9"
          >
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-pink-400" />
            Log Community Issue
          </Button>

          <Button
            onClick={onOpenAddTeamMember}
            size="sm"
            variant="outline"
            className="bg-[#360312] border-[#881337] text-white hover:bg-rose-900/60 text-xs h-9"
          >
            <Users className="h-3.5 w-3.5 mr-1.5 text-pink-300" />
            Add Team Member
          </Button>
        </div>
      </div>

      {/* KPI 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Activities (Maroon & Pink accent) */}
        <Card
          className="cursor-pointer hover:border-pink-400 transition-all border-rose-100 bg-white shadow-xs hover:shadow-md"
          onClick={() => onNavigate("activities")}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-900">Upcoming Events</span>
              <div className="p-2 rounded-lg bg-pink-100 text-pink-700">
                <CalendarCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#4c0519]">
                {activities.filter((a) => a.status === "Upcoming").length}
              </span>
              <span className="text-xs text-pink-700 font-semibold flex items-center">
                {activities.length} Total
                <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </div>
            <p className="mt-1 text-xs text-rose-800/70">Rallies, town halls & walks</p>
          </CardContent>
        </Card>

        {/* Card 2: Tasks (Light Blue accent) */}
        <Card
          className="cursor-pointer hover:border-sky-400 transition-all border-sky-100 bg-white shadow-xs hover:shadow-md"
          onClick={() => onNavigate("tasks")}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-950">Pending Tasks</span>
              <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
                <CheckSquare className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#4c0519]">
                {tasks.filter((t) => t.status !== "Completed").length}
              </span>
              <span className="text-xs text-sky-700 font-semibold flex items-center">
                {completedTasksCount} Done
                <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </div>
            <p className="mt-1 text-xs text-sky-900/70">
              {tasks.filter((t) => t.priority === "Urgent" && t.status !== "Completed").length} urgent priority
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Issues (Pink & Maroon accent) */}
        <Card
          className="cursor-pointer hover:border-pink-400 transition-all border-pink-100 bg-white shadow-xs hover:shadow-md"
          onClick={() => onNavigate("issues")}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-900">Community Issues</span>
              <div className="p-2 rounded-lg bg-rose-100 text-[#881337]">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#4c0519]">
                {issues.length}
              </span>
              <span className="text-xs text-pink-700 font-bold flex items-center">
                {criticalIssuesCount} Critical
                <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </div>
            <p className="mt-1 text-xs text-rose-800/70">Logged ward grievances</p>
          </CardContent>
        </Card>

        {/* Card 4: Team (Light Blue & Maroon accent) */}
        <Card
          className="cursor-pointer hover:border-sky-400 transition-all border-rose-100 bg-white shadow-xs hover:shadow-md"
          onClick={() => onNavigate("team")}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-900">Coordinators & Staff</span>
              <div className="p-2 rounded-lg bg-sky-100 text-sky-800">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#4c0519]">
                {team.length}
              </span>
              <span className="text-xs text-sky-700 font-semibold flex items-center">
                {team.filter((m) => m.status === "On Field").length} On Field
                <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </div>
            <p className="mt-1 text-xs text-rose-800/70">+840 grassroots volunteers</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Scheduled Activities & Operational Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Upcoming Activities */}
        <Card className="border-pink-100 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-pink-50">
            <div>
              <CardTitle className="text-base font-bold text-[#4c0519] flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-pink-600" />
                Upcoming Campaign Events
              </CardTitle>
              <CardDescription className="text-xs text-rose-900/60 mt-0.5">
                Rallies, town halls and voter outreach in the next 14 days
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("activities")}
              className="text-pink-700 text-xs hover:bg-pink-50 font-semibold"
            >
              View All
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {upcomingActivities.length === 0 ? (
              <div className="text-center py-6 text-rose-800/60 text-sm">
                No upcoming activities. Click "+ Schedule Activity" to add one.
              </div>
            ) : (
              upcomingActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl border border-pink-100 bg-pink-50/40 hover:bg-pink-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={act.type === "Rally" ? "default" : "lightblue"}
                        className="text-[10px]"
                      >
                        {act.type}
                      </Badge>
                      <span className="text-xs font-bold text-[#4c0519]">
                        {act.title}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-rose-900/70">
                      <span className="flex items-center gap-1 font-semibold text-[#881337]">
                        <Clock className="h-3 w-3 text-pink-600" />
                        {act.date} • {act.time.split("-")[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-sky-600" />
                        {act.location}, {act.subCounty}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-pink-100 text-xs">
                    <span className="text-[11px] text-rose-800/60">
                      Est. Turnout:
                    </span>
                    <span className="font-extrabold text-[#881337] text-sm">
                      {act.expectedAttendance.toLocaleString()} pax
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Right Column: Urgent Operational Tasks */}
        <Card className="border-sky-100 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-sky-50">
            <div>
              <CardTitle className="text-base font-bold text-[#4c0519] flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-sky-600" />
                Urgent Action Items
              </CardTitle>
              <CardDescription className="text-xs text-rose-900/60 mt-0.5">
                Check off tasks directly as they are completed by field teams
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("tasks")}
              className="text-sky-700 text-xs hover:bg-sky-50 font-semibold"
            >
              Task Board
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-4">
            {urgentTasks.length === 0 ? (
              <div className="text-center py-6 text-rose-800/60 text-sm">
                All high priority tasks completed! Great work.
              </div>
            ) : (
              urgentTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border border-sky-100 bg-sky-50/30 hover:bg-sky-50/70 transition-colors flex items-start gap-3"
                >
                  <button
                    onClick={() =>
                      updateTaskStatus(
                        task.id,
                        task.status === "Completed" ? "To Do" : "Completed"
                      )
                    }
                    className="mt-0.5 h-4.5 w-4.5 rounded border border-rose-300 bg-white hover:border-pink-600 flex items-center justify-center shrink-0 cursor-pointer"
                    title="Click to toggle complete"
                  >
                    {task.status === "Completed" && (
                      <CheckCircle2 className="h-4 w-4 text-pink-600 fill-pink-100" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-[#4c0519] leading-snug truncate">
                        {task.title}
                      </p>
                      <Badge
                        variant={
                          task.priority === "Urgent"
                            ? "destructive"
                            : task.priority === "High"
                            ? "pink"
                            : "outline"
                        }
                        className="text-[10px] shrink-0"
                      >
                        {task.priority}
                      </Badge>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-rose-900/60">
                      <span>Assignee: <strong className="text-rose-950 font-semibold">{task.assignee}</strong></span>
                      <span>•</span>
                      <span>Due: <strong className="text-sky-800 font-semibold">{task.dueDate}</strong></span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Community Issues Snapshot & Sub-County Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Priority Community Grievances */}
        <Card className="lg:col-span-2 border-pink-100 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-pink-50">
            <div>
              <CardTitle className="text-base font-bold text-[#4c0519] flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-pink-600" />
                Community Grievances & Voter Feedback
              </CardTitle>
              <CardDescription className="text-xs text-rose-900/60 mt-0.5">
                Top issues reported by local groups to include in candidate town hall speeches
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("issues")}
              className="text-pink-700 text-xs hover:bg-pink-50 font-semibold"
            >
              All Issues ({issues.length})
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {topIssues.map((iss) => (
              <div
                key={iss.id}
                className="p-3.5 rounded-xl border border-pink-100 bg-white hover:border-pink-300 transition-all space-y-2 shadow-2xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-[#4c0519]">
                      {iss.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-rose-900/70">
                      <span className="font-bold text-pink-700">
                        {iss.subCounty}
                      </span>
                      <span>•</span>
                      <span>Ward: {iss.ward}</span>
                      <span>•</span>
                      <span className="text-sky-800 italic">By: {iss.reportedByGroup}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        iss.severity === "Critical"
                          ? "destructive"
                          : iss.severity === "High"
                          ? "pink"
                          : "lightblue"
                      }
                      className="text-[10px]"
                    >
                      {iss.severity}
                    </Badge>
                    <Badge variant="lightblue" className="text-[10px]">
                      {iss.status}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-rose-950/80 line-clamp-2">
                  {iss.details}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-pink-50 text-xs">
                  <span className="text-rose-900/70 font-medium">
                    Citizens Impacted: <strong className="text-[#4c0519] font-bold">{iss.reportedCount.toLocaleString()}</strong>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => incrementIssueReport(iss.id)}
                    className="h-7 text-xs bg-pink-50/60 hover:bg-pink-100 hover:text-pink-900 border-pink-200 gap-1.5"
                  >
                    <ThumbsUp className="h-3 w-3 text-pink-600" />
                    <span>+1 Endorsement</span>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right 1 Col: Sub-County Outreach Status (Pink & Light Blue Bars) */}
        <Card className="border-pink-100 bg-white shadow-xs">
          <CardHeader className="pb-3 border-b border-pink-50">
            <CardTitle className="text-base font-bold text-[#4c0519] flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-sky-600" />
              Sub-County Mobilization
            </CardTitle>
            <CardDescription className="text-xs text-rose-900/60">
              Grassroots outreach coverage in {countyInfo.countyName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5 pt-4">
            {countyInfo.subCounties.map((sc, index) => {
              const scActivities = activities.filter((a) => a.subCounty === sc).length;
              const scIssues = issues.filter((i) => i.subCounty === sc).length;
              const coveragePct = Math.min(95, 60 + index * 7);

              return (
                <div key={sc} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#4c0519]">{sc}</span>
                    <span className="text-rose-900/60 text-[11px]">
                      {scActivities} events • {scIssues} issues
                    </span>
                  </div>
                  <div className="w-full bg-pink-100/60 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-sky-400 h-full rounded-full"
                      style={{ width: `${coveragePct}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="pt-3 border-t border-pink-100 mt-2">
              <div className="p-3 rounded-lg bg-pink-50/70 border border-pink-200 flex items-start gap-2.5">
                <Award className="h-4 w-4 text-pink-600 shrink-0 mt-0.5" />
                <div className="text-xs text-rose-950">
                  <strong className="block font-bold text-[#4c0519]">Campaign Field Objective:</strong>
                  Target minimum 75% ground coverage across all wards prior to IEBC official polling date.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
