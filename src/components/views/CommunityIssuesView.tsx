import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Plus,
  Search,
  ThumbsUp,
  MapPin,
  Trash2,
} from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { IssueCategory, IssueSeverity, IssueStatus } from "../../types/campaign";

interface CommunityIssuesViewProps {
  onOpenLogIssue: () => void;
}

export const CommunityIssuesView: React.FC<CommunityIssuesViewProps> = ({
  onOpenLogIssue,
}) => {
  const {
    countyInfo,
    issues,
    updateIssueStatus,
    incrementIssueReport,
    deleteIssue,
  } = useCampaign();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCounty, setSelectedSubCounty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredIssues = useMemo(() => {
    return issues.filter((iss) => {
      const matchesSearch =
        iss.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        iss.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        iss.reportedByGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        iss.details.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubCounty =
        selectedSubCounty === "All" || iss.subCounty === selectedSubCounty;

      const matchesCategory =
        selectedCategory === "All" || iss.category === selectedCategory;

      const matchesSeverity =
        selectedSeverity === "All" || iss.severity === selectedSeverity;

      const matchesStatus =
        selectedStatus === "All" || iss.status === selectedStatus;

      return (
        matchesSearch &&
        matchesSubCounty &&
        matchesCategory &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [
    issues,
    searchQuery,
    selectedSubCounty,
    selectedCategory,
    selectedSeverity,
    selectedStatus,
  ]);

  const totalCitizensImpacted = issues.reduce(
    (sum, i) => sum + (i.reportedCount || 1),
    0
  );
  const criticalCount = issues.filter((i) => i.severity === "Critical").length;
  const manifestoPledgedCount = issues.filter(
    (i) => i.status === "Manifesto Priority" || i.status === "Pledged in Town Hall"
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#4c0519] flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-600 text-white shadow-xs">
              <AlertTriangle className="h-5 w-5" />
            </div>
            Community Issues & Grievances Tracker
          </h1>
          <p className="text-xs sm:text-sm text-rose-900/70 mt-1">
            Capture ward citizen petitions, farmers' grievances, water shortages, and bodaboda demands to shape the campaign manifesto.
          </p>
        </div>

        <Button
          onClick={onOpenLogIssue}
          className="bg-pink-600 hover:bg-pink-700 text-white shadow-xs self-start sm:self-auto gap-2 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Log Community Issue
        </Button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs">
          <span className="text-[11px] text-rose-900/60 font-medium">Logged Issues</span>
          <p className="text-xl font-black text-[#4c0519] mt-0.5">{issues.length}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
          <span className="text-[11px] text-sky-900/60 font-medium">Citizens Impacted</span>
          <p className="text-xl font-black text-sky-700 mt-0.5">{totalCitizensImpacted.toLocaleString()}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs">
          <span className="text-[11px] text-pink-700 font-medium">Critical Priority</span>
          <p className="text-xl font-black text-pink-600 mt-0.5">{criticalCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-rose-100 shadow-2xs">
          <span className="text-[11px] text-rose-900/60 font-medium">In Manifesto / Pledged</span>
          <p className="text-xl font-black text-[#881337] mt-0.5">{manifestoPledgedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-xs space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-pink-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search grievances by keyword, ward, group, or field notes..."
            className="pl-9 h-10 text-sm border-pink-200 focus-visible:ring-pink-500 focus-visible:border-pink-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1 border-t border-pink-50">
          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Sub-County
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
              Sector / Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Sectors</option>
              <option value="Roads & Bridges">Roads & Bridges</option>
              <option value="Water & Sanitation">Water & Sanitation</option>
              <option value="Dispensaries & Health">Dispensaries & Health</option>
              <option value="Agriculture & Markets">Agriculture & Markets</option>
              <option value="Youth Unemployment">Youth Unemployment & Levies</option>
              <option value="School Bursaries & ECDE">School Bursaries & ECDE</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Severity
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Campaign Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Investigating">Investigating</option>
              <option value="Verified in Field">Verified in Field</option>
              <option value="Manifesto Priority">Manifesto Priority</option>
              <option value="Pledged in Town Hall">Pledged in Town Hall</option>
              <option value="Resolved/Addressed">Resolved / Addressed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Count & Filter Reset */}
      <div className="flex items-center justify-between text-xs text-rose-900/70">
        <span>
          Showing <strong className="text-[#4c0519]">{filteredIssues.length}</strong> of {issues.length} community grievances
        </span>
        {(searchQuery || selectedSubCounty !== "All" || selectedCategory !== "All" || selectedSeverity !== "All" || selectedStatus !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSubCounty("All");
              setSelectedCategory("All");
              setSelectedSeverity("All");
              setSelectedStatus("All");
            }}
            className="text-pink-600 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Issues List */}
      {filteredIssues.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-pink-100 p-6 space-y-3">
          <AlertTriangle className="h-10 w-10 text-pink-300 mx-auto" />
          <h3 className="font-bold text-[#4c0519]">No issues found</h3>
          <p className="text-xs text-rose-900/60 max-w-sm mx-auto">
            No community issues match your active filter criteria. Record a new ward issue using the button below.
          </p>
          <Button
            onClick={onOpenLogIssue}
            className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Log Community Issue
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIssues.map((iss) => (
            <Card
              key={iss.id}
              className="border-pink-100 bg-white hover:border-pink-300 transition-all shadow-2xs hover:shadow-xs"
            >
              <CardContent className="p-5 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          iss.severity === "Critical"
                            ? "destructive"
                            : iss.severity === "High"
                            ? "pink"
                            : "outline"
                        }
                        className="text-xs font-semibold"
                      >
                        {iss.severity} Priority
                      </Badge>

                      <Badge variant="lightblue" className="text-xs">
                        {iss.category}
                      </Badge>

                      <span className="text-xs text-rose-900/70 flex items-center gap-1 font-semibold">
                        <MapPin className="h-3 w-3 text-pink-600" />
                        {iss.subCounty} • {iss.ward}
                      </span>
                    </div>

                    <h3 className="font-bold text-[#4c0519] text-base leading-snug">
                      {iss.title}
                    </h3>
                  </div>

                  {/* Actions Dropdown & Delete */}
                  <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                    <select
                      value={iss.status}
                      onChange={(e) =>
                        updateIssueStatus(iss.id, e.target.value as IssueStatus)
                      }
                      className="h-8 rounded-md text-xs font-semibold px-2.5 border border-pink-200 bg-pink-50/50 text-[#4c0519] focus:ring-1 focus:ring-pink-500"
                    >
                      <option value="Investigating">Investigating</option>
                      <option value="Verified in Field">Verified in Field</option>
                      <option value="Manifesto Priority">Manifesto Priority</option>
                      <option value="Pledged in Town Hall">Pledged in Town Hall</option>
                      <option value="Resolved/Addressed">Resolved / Addressed</option>
                    </select>

                    <button
                      onClick={() => {
                        if (confirm(`Delete community issue "${iss.title}"?`)) {
                          deleteIssue(iss.id);
                        }
                      }}
                      className="p-1.5 text-rose-300 hover:text-red-600 rounded"
                      title="Delete Issue"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-rose-950/80 leading-relaxed bg-pink-50/40 p-3 rounded-lg border border-pink-100">
                  {iss.details}
                </p>

                {/* Footer Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-pink-50 text-xs">
                  <div className="flex items-center gap-3 text-rose-900/70">
                    <span>
                      Reported by: <strong className="text-rose-950 font-bold">{iss.reportedByGroup}</strong>
                    </span>
                    <span>•</span>
                    <span>Logged on: {iss.dateLogged}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[11px] text-rose-900/70 font-semibold mr-2">
                        <strong className="text-[#4c0519] font-black">{iss.reportedCount.toLocaleString()}</strong> citizens backing this
                      </span>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => incrementIssueReport(iss.id)}
                      className="h-8 text-xs border-pink-300 hover:bg-pink-100 hover:text-pink-900 hover:border-pink-400 gap-1.5 font-semibold text-pink-700"
                    >
                      <ThumbsUp className="h-3.5 w-3.5 text-pink-600" />
                      <span>+1 Report</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
