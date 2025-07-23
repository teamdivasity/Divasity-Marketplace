import { create } from 'zustand';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  fundingGoal: number;
  currentFunding: number;
  deadline: string;
  status: 'draft' | 'active' | 'funded' | 'completed' | 'cancelled';
  creatorId: string;
  creatorName: string;
  images: string[];
  tags: string[];
  rewards: ProjectReward[];
  updates: ProjectUpdate[];
  backers: number;
  createdAt: string;
  updatedAt: string;
  location?: string;
  riskFactors?: string[];
  businessPlan?: string;
  financialProjections?: any;
}

export interface ProjectReward {
  id: string;
  title: string;
  description: string;
  amount: number;
  estimatedDelivery: string;
  quantity?: number;
  claimed: number;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
}

export interface Investment {
  id: string;
  projectId: string;
  investorId: string;
  amount: number;
  rewardId?: string;
  status: 'pending' | 'confirmed' | 'refunded';
  createdAt: string;
}

interface ProjectState {
  projects: Project[];
  userProjects: Project[];
  userInvestments: Investment[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string;
    status: string;
    sortBy: string;
    search: string;
  };

  // Actions
  setProjects: (projects: Project[]) => void;
  setUserProjects: (projects: Project[]) => void;
  setUserInvestments: (investments: Investment[]) => void;
  setSelectedProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addInvestment: (investment: Investment) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<ProjectState['filters']>) => void;
  clearFilters: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  userProjects: [],
  userInvestments: [],
  selectedProject: null,
  isLoading: false,
  error: null,
  filters: {
    category: '',
    status: '',
    sortBy: 'newest',
    search: '',
  },

  setProjects: (projects) => set({ projects }),
  
  setUserProjects: (userProjects) => set({ userProjects }),
  
  setUserInvestments: (userInvestments) => set({ userInvestments }),
  
  setSelectedProject: (selectedProject) => set({ selectedProject }),
  
  addProject: (project) => set((state) => ({
    projects: [project, ...state.projects],
    userProjects: [project, ...state.userProjects],
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p),
    userProjects: state.userProjects.map(p => p.id === id ? { ...p, ...updates } : p),
    selectedProject: state.selectedProject?.id === id 
      ? { ...state.selectedProject, ...updates } 
      : state.selectedProject,
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id),
    userProjects: state.userProjects.filter(p => p.id !== id),
    selectedProject: state.selectedProject?.id === id ? null : state.selectedProject,
  })),
  
  addInvestment: (investment) => set((state) => ({
    userInvestments: [investment, ...state.userInvestments],
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters },
  })),
  
  clearFilters: () => set({
    filters: {
      category: '',
      status: '',
      sortBy: 'newest',
      search: '',
    },
  }),
}));