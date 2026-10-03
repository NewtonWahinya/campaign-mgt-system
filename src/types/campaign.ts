export type ActivityType =
  | "Rally"
  | "Town Hall"
  | "Door-to-Door"
  | "Market Walk"
  | "Youth Forum"
  | "Women/Chama Meeting"
  | "Press Briefing";

export type ActivityStatus = "Upcoming" | "In Progress" | "Completed" | "Postponed";

export interface CampaignActivity {
  id: string;
  title: string;
  type: ActivityType;
  date: string;
  time: string;
  location: string;
  subCounty: string;
  ward: string;
  expectedAttendance: number;
  coordinator: string;
  status: ActivityStatus;
  notes?: string;
}

export type TaskCategory =
  | "Logistics"
  | "Media & PR"
  | "Field Mobilization"
  | "Polling Agents"
  | "Security & Protocol"
  | "Legal & Compliance";

export type TaskPriority = "Urgent" | "High" | "Medium" | "Low";
export type TaskStatus = "To Do" | "In Progress" | "Under Review" | "Completed";

export interface CampaignTask {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  subCounty?: string;
  dueDate: string;
  description?: string;
}

export type IssueCategory =
  | "Water & Sanitation"
  | "Roads & Bridges"
  | "Dispensaries & Health"
  | "Agriculture & Markets"
  | "Youth Unemployment"
  | "School Bursaries & ECDE";

export type IssueSeverity = "Critical" | "High" | "Moderate" | "Low";

export type IssueStatus =
  | "Investigating"
  | "Verified in Field"
  | "Manifesto Priority"
  | "Pledged in Town Hall"
  | "Resolved/Addressed";

export interface CommunityIssue {
  id: string;
  title: string;
  subCounty: string;
  ward: string;
  category: IssueCategory;
  severity: IssueSeverity;
  status: IssueStatus;
  reportedCount: number;
  reportedByGroup: string;
  details: string;
  dateLogged: string;
}

export type TeamDepartment =
  | "Campaign Management"
  | "Sub-County Operations"
  | "Youth & Women League"
  | "Communications & Media"
  | "Logistics & Security"
  | "Legal & Agent Desk";

export type TeamStatus = "Active" | "On Field" | "Standby";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: TeamDepartment;
  subCountyAssigned: string;
  phone: string;
  email: string;
  status: TeamStatus;
  bio?: string;
}

export type CountyInfo = {
  countyName: string;
  governorCandidate: string;
  runningMateCandidate: string;
  campaignSlogan: string;
  subCounties: string[];
};
