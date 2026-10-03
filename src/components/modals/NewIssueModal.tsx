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
import { IssueCategory, IssueSeverity, IssueStatus } from "../../types/campaign";

interface NewIssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewIssueModal: React.FC<NewIssueModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { countyInfo, addIssue } = useCampaign();

  const [title, setTitle] = useState("");
  const [subCounty, setSubCounty] = useState(countyInfo.subCounties[0] || "West Mugirango");
  const [ward, setWard] = useState("");
  const [category, setCategory] = useState<IssueCategory>("Roads & Bridges");
  const [severity, setSeverity] = useState<IssueSeverity>("High");
  const [status, setStatus] = useState<IssueStatus>("Investigating");
  const [reportedCount, setReportedCount] = useState(1);
  const [reportedByGroup, setReportedByGroup] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !ward.trim()) {
      alert("Please provide the issue summary and ward area.");
      return;
    }

    addIssue({
      title: title.trim(),
      subCounty,
      ward: ward.trim(),
      category,
      severity,
      status,
      reportedCount: Math.max(1, Number(reportedCount) || 1),
      reportedByGroup: reportedByGroup.trim() || "Community Residents Delegation",
      details: details.trim(),
      dateLogged: new Date().toISOString().split("T")[0],
    });

    // Reset and close
    setTitle("");
    setWard("");
    setReportedByGroup("");
    setDetails("");
    setReportedCount(1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogCloseButton onClick={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>Log Community Issue / Citizen Feedback</DialogTitle>
        <DialogDescription>
          Record grassroots grievances from tea farmers, market vendors, youth, or women chamas for manifesto integration.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Issue Title / Grievance Summary <span className="text-red-500">*</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Non-functional maternity wing and lack of clean water at local clinic"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Ward / Village / Market <span className="text-red-500">*</span>
            </label>
            <Input
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              placeholder="e.g. Nyansiongo Ward / Kiabonyoru"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as IssueCategory)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="Roads & Bridges">Roads & Bridges</option>
              <option value="Water & Sanitation">Water & Sanitation</option>
              <option value="Dispensaries & Health">Dispensaries & Health</option>
              <option value="Agriculture & Markets">Agriculture & Markets</option>
              <option value="Youth Unemployment">Youth Unemployment & Levies</option>
              <option value="School Bursaries & ECDE">School Bursaries & ECDE</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Severity Level
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as IssueSeverity)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="Critical">Critical (Halting livelihoods / urgent health)</option>
              <option value="High">High Severity</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Reported By Group / Delegation
            </label>
            <Input
              value={reportedByGroup}
              onChange={(e) => setReportedByGroup(e.target.value)}
              placeholder="e.g. Market Mamas Union, Boda SACCO"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Initial Citizens / Signatures Count
            </label>
            <Input
              type="number"
              min="1"
              value={reportedCount}
              onChange={(e) => setReportedCount(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Status in Campaign
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as IssueStatus)}
            className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
          >
            <option value="Investigating">Investigating / Fact-finding</option>
            <option value="Verified in Field">Verified in Field</option>
            <option value="Manifesto Priority">Manifesto Priority (Included in Policy)</option>
            <option value="Pledged in Town Hall">Pledged by Candidate in Town Hall</option>
            <option value="Resolved/Addressed">Resolved / Addressed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Field Notes & Community Demands
          </label>
          <Textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Key community leaders met, proposed solutions, estimated scope..."
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
            Log Community Issue
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
