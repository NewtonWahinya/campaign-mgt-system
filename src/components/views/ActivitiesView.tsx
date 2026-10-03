import React, { useState, useMemo } from "react";
import {
  CalendarCheck,
  Plus,
  Search,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Trash2,
  Calendar,
} from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { ActivityStatus } from "../../types/campaign";

interface ActivitiesViewProps {
  onOpenScheduleActivity: () => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  onOpenScheduleActivity,
}) => {
  const {
    countyInfo,
    activities,
    updateActivityStatus,
    deleteActivity,
  } = useCampaign();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCounty, setSelectedSubCounty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "agenda">("cards");

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesSearch =
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.coordinator.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubCounty =
        selectedSubCounty === "All" || act.subCounty === selectedSubCounty;

      const matchesType =
        selectedType === "All" || act.type === selectedType;

      const matchesStatus =
        selectedStatus === "All" || act.status === selectedStatus;

      return matchesSearch && matchesSubCounty && matchesType && matchesStatus;
    });
  }, [activities, searchQuery, selectedSubCounty, selectedType, selectedStatus]);

  const upcomingCount = activities.filter((a) => a.status === "Upcoming").length;
  const completedCount = activities.filter((a) => a.status === "Completed").length;
  const totalTurnout = activities.reduce((sum, a) => sum + (a.expectedAttendance || 0), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Page Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#4c0519] flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-600 text-white shadow-xs">
              <CalendarCheck className="h-5 w-5" />
            </div>
            Campaign Activities & Events
          </h1>
          <p className="text-xs sm:text-sm text-rose-900/70 mt-1">
            Coordinate mega rallies, civic town halls, market walks, and door-to-door ground operations in {countyInfo.countyName}.
          </p>
        </div>

        <Button
          onClick={onOpenScheduleActivity}
          className="bg-pink-600 hover:bg-pink-700 text-white shadow-xs self-start sm:self-auto gap-2 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Schedule Activity
        </Button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs">
          <span className="text-[11px] text-rose-900/60 font-medium">Total Events</span>
          <p className="text-xl font-black text-[#4c0519] mt-0.5">{activities.length}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs">
          <span className="text-[11px] text-rose-900/60 font-medium">Upcoming / Active</span>
          <p className="text-xl font-black text-pink-600 mt-0.5">{upcomingCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
          <span className="text-[11px] text-sky-900/60 font-medium">Completed</span>
          <p className="text-xl font-black text-sky-700 mt-0.5">{completedCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-rose-100 shadow-2xs">
          <span className="text-[11px] text-rose-900/60 font-medium">Mobilized Turnout</span>
          <p className="text-xl font-black text-[#881337] mt-0.5">{totalTurnout.toLocaleString()}</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-pink-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event title, venue, ward, coordinator..."
              className="pl-9 h-10 text-sm border-pink-200 focus-visible:ring-pink-500 focus-visible:border-pink-500"
            />
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-pink-50 p-1 rounded-lg self-end md:self-auto border border-pink-200">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                viewMode === "cards"
                  ? "bg-white text-[#4c0519] shadow-xs"
                  : "text-rose-900/70 hover:text-rose-900"
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setViewMode("agenda")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                viewMode === "agenda"
                  ? "bg-white text-[#4c0519] shadow-xs"
                  : "text-rose-900/70 hover:text-rose-900"
              }`}
            >
              Agenda List
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-pink-50">
          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Filter Sub-County
            </label>
            <select
              value={selectedSubCounty}
              onChange={(e) => setSelectedSubCounty(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Sub-Counties</option>
              {countyInfo.subCounties.map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Filter Event Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Types</option>
              <option value="Rally">Mega Rally</option>
              <option value="Town Hall">Town Hall</option>
              <option value="Door-to-Door">Door-to-Door</option>
              <option value="Market Walk">Market Walk</option>
              <option value="Youth Forum">Youth Forum</option>
              <option value="Women/Chama Meeting">Women / Chama Meeting</option>
              <option value="Press Briefing">Press Briefing</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Filter Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Postponed">Postponed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Empty State */}
      <div className="flex items-center justify-between text-xs text-rose-900/70">
        <span>
          Showing <strong className="text-[#4c0519]">{filteredActivities.length}</strong> of {activities.length} campaign activities
        </span>
        {(searchQuery || selectedSubCounty !== "All" || selectedType !== "All" || selectedStatus !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSubCounty("All");
              setSelectedType("All");
              setSelectedStatus("All");
            }}
            className="text-pink-600 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Activities Content */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-pink-100 p-6 space-y-3">
          <CalendarCheck className="h-10 w-10 text-pink-300 mx-auto" />
          <h3 className="font-bold text-[#4c0519]">No matching activities found</h3>
          <p className="text-xs text-rose-900/60 max-w-sm mx-auto">
            Try adjusting your search criteria or schedule a new campaign activity using the button below.
          </p>
          <Button
            onClick={onOpenScheduleActivity}
            className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Schedule New Activity
          </Button>
        </div>
      ) : viewMode === "cards" ? (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredActivities.map((act) => {
            return (
              <Card
                key={act.id}
                className="border-pink-100 bg-white hover:border-pink-300 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs"
              >
                <CardContent className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <Badge
                        variant={
                          act.type === "Rally"
                            ? "default"
                            : act.type === "Town Hall"
                            ? "lightblue"
                            : "pink"
                        }
                        className="text-xs font-semibold"
                      >
                        {act.type}
                      </Badge>

                      <div className="flex items-center gap-1.5">
                        <select
                          value={act.status}
                          onChange={(e) =>
                            updateActivityStatus(act.id, e.target.value as ActivityStatus)
                          }
                          className="h-6 rounded text-[11px] font-semibold px-2 border border-pink-200 bg-pink-50/50 text-[#4c0519] focus:ring-1 focus:ring-pink-500"
                        >
                          <option value="Upcoming">Upcoming</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Postponed">Postponed</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Delete activity "${act.title}"?`)) {
                              deleteActivity(act.id);
                            }
                          }}
                          className="p-1 rounded text-rose-300 hover:text-red-600 hover:bg-rose-50 transition-colors"
                          title="Delete Activity"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-[#4c0519] text-base leading-snug">
                      {act.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-rose-900/70">
                      <div className="flex items-center gap-2 text-[#881337] font-semibold">
                        <Calendar className="h-3.5 w-3.5 text-pink-600 shrink-0" />
                        <span>{act.date}</span>
                        <span>•</span>
                        <Clock className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                        <span>{act.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                        <span className="font-semibold text-rose-950">{act.location}</span>
                        <span className="text-rose-800/60">({act.ward}, {act.subCounty})</span>
                      </div>

                      <div className="flex items-center gap-2 text-rose-800/80">
                        <Users className="h-3.5 w-3.5 text-pink-500 shrink-0" />
                        <span>Lead: <strong className="text-[#4c0519] font-semibold">{act.coordinator}</strong></span>
                      </div>
                    </div>

                    {act.notes && (
                      <p className="text-xs text-rose-950/70 bg-pink-50/50 p-2.5 rounded-lg border border-pink-100">
                        {act.notes}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-pink-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-rose-800/60 block">Expected Attendance</span>
                      <span className="text-sm font-black text-[#881337]">
                        {act.expectedAttendance.toLocaleString()} Citizens
                      </span>
                    </div>

                    {act.status !== "Completed" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateActivityStatus(act.id, "Completed")}
                        className="h-8 text-xs border-sky-400 text-sky-700 hover:bg-sky-50 font-semibold"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        Mark Done
                      </Button>
                    ) : (
                      <Badge variant="lightblue" className="text-xs font-bold">
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Agenda List View */
        <div className="bg-white rounded-xl border border-pink-100 overflow-hidden shadow-xs divide-y divide-pink-100">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="p-4 sm:p-5 hover:bg-pink-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-pink-50 border border-pink-200 text-center shrink-0">
                  <span className="text-[11px] uppercase font-bold text-pink-600">
                    {new Date(act.date).toLocaleDateString("en-US", { month: "short" })}
                  </span>
                  <span className="text-lg font-black text-[#4c0519] leading-none">
                    {new Date(act.date).getDate()}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="lightblue" className="text-[10px]">
                      {act.type}
                    </Badge>
                    <span className="font-bold text-[#4c0519] text-sm sm:text-base">
                      {act.title}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-rose-900/70">
                    <span className="font-bold text-[#881337]">{act.date} • {act.time}</span>
                    <span>{act.location} ({act.ward})</span>
                    <span>Sub-County: <strong className="text-[#4c0519]">{act.subCounty}</strong></span>
                    <span>Lead: {act.coordinator}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-pink-100">
                <div className="text-right">
                  <span className="text-[10px] text-rose-800/60 block">Turnout</span>
                  <span className="text-xs font-black text-[#881337]">
                    {act.expectedAttendance.toLocaleString()} pax
                  </span>
                </div>

                <select
                  value={act.status}
                  onChange={(e) =>
                    updateActivityStatus(act.id, e.target.value as ActivityStatus)
                  }
                  className="h-8 rounded-md text-xs font-semibold px-2.5 border border-pink-200 bg-white text-[#4c0519] focus:ring-1 focus:ring-pink-500"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Postponed">Postponed</option>
                </select>

                <button
                  onClick={() => {
                    if (confirm(`Delete activity "${act.title}"?`)) {
                      deleteActivity(act.id);
                    }
                  }}
                  className="p-1.5 text-rose-300 hover:text-red-600 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
