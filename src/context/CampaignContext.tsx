import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CampaignActivity,
  CampaignTask,
  CommunityIssue,
  TeamMember,
  CountyInfo,
  TaskStatus,
  IssueStatus,
  ActivityStatus,
} from "../types/campaign";
import {
  COUNTIES_CONFIG,
  INITIAL_ACTIVITIES,
  INITIAL_TASKS,
  INITIAL_ISSUES,
  INITIAL_TEAM,
} from "../data/mockCampaignData";

interface CampaignContextType {
  selectedCountyKey: string;
  setSelectedCountyKey: (countyKey: string) => void;
  countyInfo: CountyInfo;
  activities: CampaignActivity[];
  tasks: CampaignTask[];
  issues: CommunityIssue[];
  team: TeamMember[];
  addActivity: (activity: Omit<CampaignActivity, "id">) => void;
  updateActivityStatus: (id: string, status: ActivityStatus) => void;
  deleteActivity: (id: string) => void;
  addTask: (task: Omit<CampaignTask, "id">) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  addIssue: (issue: Omit<CommunityIssue, "id">) => void;
  updateIssueStatus: (id: string, status: IssueStatus) => void;
  incrementIssueReport: (id: string) => void;
  deleteIssue: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  updateTeamStatus: (id: string, status: TeamMember["status"]) => void;
  deleteTeamMember: (id: string) => void;
  resetAllData: () => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COUNTY: "ccm_selected_county_v1",
  ACTIVITIES: "ccm_activities_v1",
  TASKS: "ccm_tasks_v1",
  ISSUES: "ccm_issues_v1",
  TEAM: "ccm_team_v1",
};

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountyKey, setSelectedCountyKey] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.COUNTY) || "Nyamira";
  });

  const [activities, setActivities] = useState<CampaignActivity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [tasks, setTasks] = useState<CampaignTask[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [issues, setIssues] = useState<CommunityIssue[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ISSUES);
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUNTY, selectedCountyKey);
  }, [selectedCountyKey]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
  }, [team]);

  const countyInfo = COUNTIES_CONFIG[selectedCountyKey] || COUNTIES_CONFIG["Nyamira"];

  const addActivity = (activity: Omit<CampaignActivity, "id">) => {
    const newAct: CampaignActivity = {
      ...activity,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const updateActivityStatus = (id: string, status: ActivityStatus) => {
    setActivities((prev) =>
      prev.map((act) => (act.id === id ? { ...act, status } : act))
    );
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((act) => act.id !== id));
  };

  const addTask = (task: Omit<CampaignTask, "id">) => {
    const newTask: CampaignTask = {
      ...task,
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addIssue = (issue: Omit<CommunityIssue, "id">) => {
    const newIss: CommunityIssue = {
      ...issue,
      id: `iss-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setIssues((prev) => [newIss, ...prev]);
  };

  const updateIssueStatus = (id: string, status: IssueStatus) => {
    setIssues((prev) =>
      prev.map((iss) => (iss.id === id ? { ...iss, status } : iss))
    );
  };

  const incrementIssueReport = (id: string) => {
    setIssues((prev) =>
      prev.map((iss) =>
        iss.id === id ? { ...iss, reportedCount: iss.reportedCount + 1 } : iss
      )
    );
  };

  const deleteIssue = (id: string) => {
    setIssues((prev) => prev.filter((iss) => iss.id !== id));
  };

  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...member,
      id: `tm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setTeam((prev) => [...prev, newMember]);
  };

  const updateTeamStatus = (id: string, status: TeamMember["status"]) => {
    setTeam((prev) =>
      prev.map((tm) => (tm.id === id ? { ...tm, status } : tm))
    );
  };

  const deleteTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((tm) => tm.id !== id));
  };

  const resetAllData = () => {
    setActivities(INITIAL_ACTIVITIES);
    setTasks(INITIAL_TASKS);
    setIssues(INITIAL_ISSUES);
    setTeam(INITIAL_TEAM);
    setSelectedCountyKey("Nyamira");
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.ISSUES);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.COUNTY);
  };

  return (
    <CampaignContext.Provider
      value={{
        selectedCountyKey,
        setSelectedCountyKey,
        countyInfo,
        activities,
        tasks,
        issues,
        team,
        addActivity,
        updateActivityStatus,
        deleteActivity,
        addTask,
        updateTaskStatus,
        deleteTask,
        addIssue,
        updateIssueStatus,
        incrementIssueReport,
        deleteIssue,
        addTeamMember,
        updateTeamStatus,
        deleteTeamMember,
        resetAllData,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
};
