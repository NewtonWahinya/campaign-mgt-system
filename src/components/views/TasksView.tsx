import React, { useState, useMemo } from "react";
import {
  CheckSquare,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  User,
  Trash2,
  MapPin,
} from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { TaskStatus } from "../../types/campaign";

interface TasksViewProps {
  onOpenAssignTask: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ onOpenAssignTask }) => {
  const { tasks, updateTaskStatus, deleteTask } = useCampaign();

  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesTab = activeTab === "All" || t.status === activeTab;
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All" || t.category === selectedCategory;
      const matchesPriority =
        selectedPriority === "All" || t.priority === selectedPriority;

      return matchesTab && matchesSearch && matchesCategory && matchesPriority;
    });
  }, [tasks, activeTab, searchQuery, selectedCategory, selectedPriority]);

  const todoCount = tasks.filter((t) => t.status === "To Do").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const underReviewCount = tasks.filter((t) => t.status === "Under Review").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#4c0519] flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-600 text-white shadow-xs">
              <CheckSquare className="h-5 w-5" />
            </div>
            Campaign Tasks & Action Items
          </h1>
          <p className="text-xs sm:text-sm text-rose-900/70 mt-1">
            Assign and track grassroots voter outreach, polling station agents, sound setups, and legal filings.
          </p>
        </div>

        <Button
          onClick={onOpenAssignTask}
          className="bg-pink-600 hover:bg-pink-700 text-white shadow-xs self-start sm:self-auto gap-2 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Status Counters Strip (Maroon, Light Blue, Pink) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab("To Do")}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === "To Do"
              ? "bg-[#4c0519] text-white border-[#4c0519] shadow-md shadow-rose-950/20"
              : "bg-white text-rose-950 border-pink-100 hover:bg-pink-50/50"
          }`}
        >
          <span className={`text-[11px] font-bold ${activeTab === "To Do" ? "text-pink-300" : "text-rose-900/60"}`}>
            To Do
          </span>
          <p className="text-2xl font-black mt-0.5">{todoCount}</p>
        </button>

        <button
          onClick={() => setActiveTab("In Progress")}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === "In Progress"
              ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-950/20"
              : "bg-white text-rose-950 border-sky-100 hover:bg-sky-50/50"
          }`}
        >
          <span className={`text-[11px] font-bold ${activeTab === "In Progress" ? "text-sky-100" : "text-sky-700"}`}>
            In Progress
          </span>
          <p className="text-2xl font-black mt-0.5">{inProgressCount}</p>
        </button>

        <button
          onClick={() => setActiveTab("Under Review")}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === "Under Review"
              ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-950/20"
              : "bg-white text-rose-950 border-pink-100 hover:bg-pink-50/50"
          }`}
        >
          <span className={`text-[11px] font-bold ${activeTab === "Under Review" ? "text-pink-100" : "text-pink-700"}`}>
            Under Review
          </span>
          <p className="text-2xl font-black mt-0.5">{underReviewCount}</p>
        </button>

        <button
          onClick={() => setActiveTab("Completed")}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === "Completed"
              ? "bg-[#881337] text-white border-[#881337] shadow-md shadow-rose-950/20"
              : "bg-white text-rose-950 border-rose-100 hover:bg-rose-50/50"
          }`}
        >
          <span className={`text-[11px] font-bold ${activeTab === "Completed" ? "text-pink-200" : "text-rose-900/60"}`}>
            Completed
          </span>
          <p className="text-2xl font-black mt-0.5">{completedCount}</p>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-pink-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title, assignee, or instructions..."
              className="pl-9 h-10 text-sm border-pink-200 focus-visible:ring-pink-500 focus-visible:border-pink-500"
            />
          </div>

          {/* Quick tab pills */}
          <div className="flex items-center overflow-x-auto pb-1 sm:pb-0 gap-1 bg-pink-50 p-1 rounded-lg border border-pink-200">
            {["All", "To Do", "In Progress", "Under Review", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-white text-[#4c0519] shadow-xs"
                    : "text-rose-900/70 hover:text-rose-950"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-pink-50">
          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Field Mobilization">Field Mobilization</option>
              <option value="Logistics">Logistics & Venues</option>
              <option value="Polling Agents">Polling Station Agents</option>
              <option value="Media & PR">Media & Communications</option>
              <option value="Security & Protocol">Security & Protocol</option>
              <option value="Legal & Compliance">Legal & Compliance</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List Header */}
      <div className="flex items-center justify-between text-xs text-rose-900/70">
        <span>
          Showing <strong className="text-[#4c0519]">{filteredTasks.length}</strong> tasks {activeTab !== "All" && `(${activeTab})`}
        </span>
        {(searchQuery || selectedCategory !== "All" || selectedPriority !== "All" || activeTab !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedPriority("All");
              setActiveTab("All");
            }}
            className="text-pink-600 hover:underline font-semibold"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Task Items */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-pink-100 p-6 space-y-3">
          <CheckSquare className="h-10 w-10 text-pink-300 mx-auto" />
          <h3 className="font-bold text-[#4c0519]">No tasks found</h3>
          <p className="text-xs text-rose-900/60 max-w-sm mx-auto">
            {activeTab !== "All"
              ? `There are currently no tasks in "${activeTab}" status.`
              : "No tasks match your filters. Create a new campaign task to get started."}
          </p>
          <Button
            onClick={onOpenAssignTask}
            className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Assign New Task
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isDone = task.status === "Completed";
            return (
              <Card
                key={task.id}
                className={`border-pink-100 bg-white transition-all shadow-2xs ${
                  isDone ? "opacity-75 bg-pink-50/20" : "hover:border-pink-300"
                }`}
              >
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Checkbox & Content */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task.id,
                          isDone ? "To Do" : "Completed"
                        )
                      }
                      className={`mt-1 h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                        isDone
                          ? "bg-pink-600 border-pink-600 text-white shadow-xs"
                          : "border-pink-300 bg-white hover:border-pink-600"
                      }`}
                      title={isDone ? "Mark as To Do" : "Mark as Completed"}
                    >
                      {isDone && <CheckCircle2 className="h-4 w-4" />}
                    </button>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-sm sm:text-base font-bold text-[#4c0519] leading-snug ${
                            isDone ? "line-through text-rose-900/40" : ""
                          }`}
                        >
                          {task.title}
                        </span>

                        <Badge
                          variant={
                            task.priority === "Urgent"
                              ? "destructive"
                              : task.priority === "High"
                              ? "pink"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {task.priority}
                        </Badge>

                        <Badge variant="lightblue" className="text-[10px]">
                          {task.category}
                        </Badge>
                      </div>

                      {task.description && (
                        <p className="text-xs text-rose-950/70 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-rose-900/70 pt-0.5">
                        <span className="flex items-center gap-1 font-semibold text-rose-950">
                          <User className="h-3 w-3 text-pink-500" />
                          Assignee: {task.assignee}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-sky-600" />
                          Due: <strong className="text-sky-900">{task.dueDate}</strong>
                        </span>

                        {task.subCounty && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-pink-400" />
                            {task.subCounty}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Status Changer & Delete Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-pink-50 shrink-0">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTaskStatus(task.id, e.target.value as TaskStatus)
                      }
                      className="h-8 rounded-md text-xs font-semibold px-2.5 border border-pink-200 bg-white text-[#4c0519] focus:ring-1 focus:ring-pink-500"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      onClick={() => {
                        if (confirm(`Delete task "${task.title}"?`)) {
                          deleteTask(task.id);
                        }
                      }}
                      className="p-1.5 text-rose-300 hover:text-red-600 rounded"
                      title="Delete Task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
