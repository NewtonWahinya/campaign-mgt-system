import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCampaign } from "../../context/CampaignContext";
import { ActivityType } from "../../types/campaign";

interface NewActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewActivityModal: React.FC<NewActivityModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { countyInfo, team, addActivity } = useCampaign();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<ActivityType>("Rally");
  const [date, setDate] = useState("2027-05-25");
  const [time, setTime] = useState("10:00 AM - 01:00 PM");
  const [location, setLocation] = useState("");
  const [subCounty, setSubCounty] = useState(countyInfo.subCounties[0] || "West Mugirango");
  const [ward, setWard] = useState("");
  const [expectedAttendance, setExpectedAttendance] = useState(500);
  const [coordinator, setCoordinator] = useState(team[0]?.name || "Patrick Nyambane");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) {
      alert("Please provide an activity title and venue location.");
      return;
    }

    addActivity({
      title: title.trim(),
      type,
      date,
      time,
      location: location.trim(),
      subCounty,
      ward: ward.trim() || `${subCounty} Central`,
      expectedAttendance: Number(expectedAttendance) || 100,
      coordinator,
      status: "Upcoming",
      notes: notes.trim(),
    });

    // Reset and close
    setTitle("");
    setLocation("");
    setWard("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogCloseButton onClick={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>Schedule Campaign Activity</DialogTitle>
        <DialogDescription>
          Plan a rally, town hall, market walk, or voter outreach drive in {countyInfo.countyName}.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Activity Title <span className="text-red-500">*</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sub-County Bodaboda Security Town Hall"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Activity Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ActivityType)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="Rally">Mega Rally</option>
              <option value="Town Hall">Town Hall / Civic Debate</option>
              <option value="Door-to-Door">Door-to-Door Outreach</option>
              <option value="Market Walk">Market Walk & Trader Engagement</option>
              <option value="Youth Forum">Youth & Student Forum</option>
              <option value="Women/Chama Meeting">Women / Chama Meeting</option>
              <option value="Press Briefing">Press Briefing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Sub-County <span className="text-red-500">*</span>
            </label>
            <select
              value={subCounty}
              onChange={(e) => setSubCounty(e.target.value)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              {countyInfo.subCounties.map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Ward / Community Area
            </label>
            <Input
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              placeholder="e.g. Magwagwa Ward"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Venue / Location <span className="text-red-500">*</span>
            </label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Market Grounds, Social Hall"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Time Range
            </label>
            <Input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="10:00 AM - 02:00 PM"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Expected Turnout
            </label>
            <Input
              type="number"
              min="10"
              step="50"
              value={expectedAttendance}
              onChange={(e) => setExpectedAttendance(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Lead Coordinator
          </label>
          <select
            value={coordinator}
            onChange={(e) => setCoordinator(e.target.value)}
            className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
          >
            {team.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name} ({m.role})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Logistics & Agenda Notes
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="PA sound system requirements, security permits, youth convoy details, VIP seating..."
            rows={2}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-bold">
            Schedule Activity
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
