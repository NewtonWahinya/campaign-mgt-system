import React, { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Trash2,
} from "lucide-react";
import { useCampaign } from "../../context/CampaignContext";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { TeamStatus } from "../../types/campaign";

interface TeamViewProps {
  onOpenAddTeamMember: () => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ onOpenAddTeamMember }) => {
  const { countyInfo, team, updateTeamStatus, deleteTeamMember } = useCampaign();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedSubCounty, setSelectedSubCounty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.bio && member.bio.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept =
        selectedDepartment === "All" || member.department === selectedDepartment;

      const matchesSubCounty =
        selectedSubCounty === "All" ||
        member.subCountyAssigned === selectedSubCounty ||
        member.subCountyAssigned === "County HQ (All)";

      const matchesStatus =
        selectedStatus === "All" || member.status === selectedStatus;

      return matchesSearch && matchesDept && matchesSubCounty && matchesStatus;
    });
  }, [team, searchQuery, selectedDepartment, selectedSubCounty, selectedStatus]);

  const onFieldCount = team.filter((m) => m.status === "On Field").length;
  const activeCount = team.filter((m) => m.status === "Active").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#4c0519] flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-600 text-white shadow-xs">
              <Users className="h-5 w-5" />
            </div>
            Campaign Team & Field Coordinators
          </h1>
          <p className="text-xs sm:text-sm text-rose-900/70 mt-1">
            Staff directory managing sub-county operations, youth bodaboda mobilization, women chamas, and polling agents in {countyInfo.countyName}.
          </p>
        </div>

        <Button
          onClick={onOpenAddTeamMember}
          className="bg-pink-600 hover:bg-pink-700 text-white shadow-xs self-start sm:self-auto gap-2 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs">
          <span className="text-[11px] text-rose-900/60 font-medium">Core Staff</span>
          <p className="text-xl font-black text-[#4c0519] mt-0.5">{team.length}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs">
          <span className="text-[11px] text-sky-900/60 font-medium">Mobilizing On Field</span>
          <p className="text-xl font-black text-sky-700 mt-0.5">{onFieldCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs">
          <span className="text-[11px] text-pink-700 font-medium">Active at HQ</span>
          <p className="text-xl font-black text-pink-600 mt-0.5">{activeCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-rose-100 shadow-2xs">
          <span className="text-[11px] text-rose-900/60 font-medium">Ward Volunteer Force</span>
          <p className="text-xl font-black text-[#881337] mt-0.5">840 Active</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-xs space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-pink-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, email, or credentials..."
            className="pl-9 h-10 text-sm border-pink-200 focus-visible:ring-pink-500 focus-visible:border-pink-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-pink-50">
          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Departments</option>
              <option value="Sub-County Operations">Sub-County Operations</option>
              <option value="Youth & Women League">Youth & Women League</option>
              <option value="Campaign Management">Campaign Management</option>
              <option value="Communications & Media">Communications & Media</option>
              <option value="Logistics & Security">Logistics & Security</option>
              <option value="Legal & Agent Desk">Legal & Agent Desk</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-rose-900/70 mb-1">
              Sub-County Assigned
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
              Field Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex h-8 w-full rounded-md border border-pink-200 bg-white px-2 py-1 text-xs shadow-xs focus:ring-1 focus:ring-pink-500 text-rose-950 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active (HQ/Desk)</option>
              <option value="On Field">On Field (Mobilizing)</option>
              <option value="Standby">Standby (Reserve)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between text-xs text-rose-900/70">
        <span>
          Showing <strong className="text-[#4c0519]">{filteredTeam.length}</strong> of {team.length} team members
        </span>
        {(searchQuery || selectedDepartment !== "All" || selectedSubCounty !== "All" || selectedStatus !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDepartment("All");
              setSelectedSubCounty("All");
              setSelectedStatus("All");
            }}
            className="text-pink-600 hover:underline font-semibold"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Team Cards Grid */}
      {filteredTeam.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-pink-100 p-6 space-y-3">
          <Users className="h-10 w-10 text-pink-300 mx-auto" />
          <h3 className="font-bold text-[#4c0519]">No team members match</h3>
          <p className="text-xs text-rose-900/60 max-w-sm mx-auto">
            No coordinators match the selected filters. Add a new campaign staff member below.
          </p>
          <Button
            onClick={onOpenAddTeamMember}
            className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Team Member
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTeam.map((member) => {
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2);

            return (
              <Card
                key={member.id}
                className="border-pink-100 bg-white hover:border-pink-300 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
              >
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Avatar Circle with Maroon & Pink Ring */}
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#4c0519] to-rose-800 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0 border border-pink-300">
                        {initials}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#4c0519] text-base leading-snug">
                            {member.name}
                          </h3>
                        </div>
                        <p className="text-xs font-bold text-pink-700">
                          {member.role}
                        </p>
                        <p className="text-[11px] text-sky-800 font-medium">
                          {member.department}
                        </p>
                      </div>
                    </div>

                    {/* Status & Delete */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <select
                        value={member.status}
                        onChange={(e) =>
                          updateTeamStatus(member.id, e.target.value as TeamStatus)
                        }
                        className="h-7 rounded text-[11px] font-semibold px-2 border border-pink-200 bg-pink-50/50 text-[#4c0519] focus:ring-1 focus:ring-pink-500"
                      >
                        <option value="Active">Active</option>
                        <option value="On Field">On Field</option>
                        <option value="Standby">Standby</option>
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(`Remove ${member.name} from the campaign team roster?`)) {
                            deleteTeamMember(member.id);
                          }
                        }}
                        className="p-1 rounded text-rose-300 hover:text-red-600"
                        title="Delete Team Member"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-rose-950/70 bg-pink-50/40 p-2.5 rounded-lg border border-pink-100">
                      {member.bio}
                    </p>
                  )}

                  <div className="space-y-1.5 text-xs text-rose-900/70 pt-1 border-t border-pink-50">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-pink-600 shrink-0" />
                      <span>Assigned Area: <strong className="text-rose-950 font-bold">{member.subCountyAssigned}</strong></span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2 text-rose-950">
                        <Phone className="h-3.5 w-3.5 text-sky-600" />
                        <span className="font-mono text-xs font-semibold">{member.phone}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${member.phone}`}
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Mock Action: Calling ${member.name} at ${member.phone}`);
                          }}
                          className="px-2.5 py-1 rounded bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200 transition-colors inline-flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" />
                          Call
                        </a>

                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Mock Action: Composing email to ${member.name} (${member.email})`);
                          }}
                          className="px-2.5 py-1 rounded bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs font-bold border border-pink-200 transition-colors inline-flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3" />
                          Email
                        </a>
                      </div>
                    </div>
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
