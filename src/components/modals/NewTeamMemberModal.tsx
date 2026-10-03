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
import { TeamDepartment, TeamStatus } from "../../types/campaign";

interface NewTeamMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewTeamMemberModal: React.FC<NewTeamMemberModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { countyInfo, addTeamMember } = useCampaign();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState<TeamDepartment>("Sub-County Operations");
  const [subCountyAssigned, setSubCountyAssigned] = useState(countyInfo.subCounties[0] || "West Mugirango");
  const [phone, setPhone] = useState("+254 7");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<TeamStatus>("Active");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      alert("Please provide the team member's full name and designated campaign role.");
      return;
    }

    addTeamMember({
      name: name.trim(),
      role: role.trim(),
      department,
      subCountyAssigned,
      phone: phone.trim() || "+254 700 000 000",
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, ".")}@countycampaign.co.ke`,
      status,
      bio: bio.trim(),
    });

    // Reset and close
    setName("");
    setRole("");
    setPhone("+254 7");
    setEmail("");
    setBio("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogCloseButton onClick={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>Add Campaign Team Member</DialogTitle>
        <DialogDescription>
          Enlist campaign staff, field mobilizers, women league coordinators, or agent desk liaisons.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Christine Kemunto Nyaboke"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Campaign Role / Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Ward Captain / Polling Supervisor"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as TeamDepartment)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="Sub-County Operations">Sub-County Operations</option>
              <option value="Youth & Women League">Youth & Women League</option>
              <option value="Campaign Management">Campaign Management</option>
              <option value="Communications & Media">Communications & Media</option>
              <option value="Logistics & Security">Logistics & Security</option>
              <option value="Legal & Agent Desk">Legal & Agent Desk</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Assigned Area
            </label>
            <select
              value={subCountyAssigned}
              onChange={(e) => setSubCountyAssigned(e.target.value)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="County HQ (All)">County HQ (All Sub-Counties)</option>
              {countyInfo.subCounties.map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Field Availability Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TeamStatus)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="Active">Active (On Duty)</option>
              <option value="On Field">On Field (Mobilizing)</option>
              <option value="Standby">Standby (Reserve)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Phone Number
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 712 345 678"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Official Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@countycampaign.co.ke"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Brief Bio & Grassroots Network
          </label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Ward contacts, grassroots credibility, church/chama leadership..."
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
            Add Team Member
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
