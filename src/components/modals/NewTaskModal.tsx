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
import { TaskCategory, TaskPriority, TaskStatus } from "../../types/campaign";

interface NewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { countyInfo, team, addTask } = useCampaign();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Field Mobilization");
  const [priority, setPriority] = useState<TaskPriority>("High");
  const [status, setStatus] = useState<TaskStatus>("To Do");
  const [assignee, setAssignee] = useState(team[0]?.name || "Patrick Nyambane");
  const [subCounty, setSubCounty] = useState("All Sub-Counties");
  const [dueDate, setDueDate] = useState("2027-05-24");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a task title.");
      return;
    }

    addTask({
      title: title.trim(),
      category,
      priority,
      status,
      assignee,
      subCounty,
      dueDate,
      description: description.trim(),
    });

    // Reset and close
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogCloseButton onClick={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>Assign Campaign Task</DialogTitle>
        <DialogDescription>
          Delegate operational duties, polling agent accreditations, media, or logistics.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Task Description / Title <span className="text-red-500">*</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Audit ward voter registers and verify agent badges"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="Field Mobilization">Field Mobilization</option>
              <option value="Logistics">Logistics & Venues</option>
              <option value="Polling Agents">Polling Station Agents</option>
              <option value="Media & PR">Media & Communications</option>
              <option value="Security & Protocol">Security & Protocol</option>
              <option value="Legal & Compliance">Legal & Compliance</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="Urgent">Urgent (Immediate attention)</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Assignee (from Campaign Team)
            </label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              {team.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.department})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Target Sub-County
            </label>
            <select
              value={subCounty}
              onChange={(e) => setSubCounty(e.target.value)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="All Sub-Counties">All Sub-Counties (HQ)</option>
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
              Due Date
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              Initial Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1">
            Details & Instructions
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Specific deliverables, contacts, budget codes, checklist notes..."
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
            Create Task
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
