import { apiService } from './api';
import { Project, ProjectReward, ProjectUpdate, Investment } from '../store/projectStore';

export interface CreateProjectData {
  title: string;
  description: string;
  category: string;
  fundingGoal: number;
  deadline: string;
  location?: string;
  tags: string[];
  rewards: Omit<ProjectReward, 'id' | 'claimed'>[];
  riskFactors?: string[];
  businessPlan?: string;
  financialProjections?: any;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  status?: Project['status'];
}

export interface InvestmentData {
  projectId: string;
  amount: number;
  rewardId?: string;
  paymentMethodId: string;
}

export interface ProjectFilters {
  category?: string;
  status?: string;
  minFunding?: number;
  maxFunding?: number;
  location?: string;
  tags?: string[];
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'funding_goal' | 'current_funding' | 'deadline';
  page?: number;
  limit?: number;
}

class ProjectService {
  // Get all projects with filters
  async getProjects(filters?: ProjectFilters): Promise<{ projects: Project[]; total: number; page: number; totalPages: number }> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              params.append(key, value.join(','));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }

      const response = await apiService.get<{ projects: Project[]; total: number; page: number; totalPages: number }>(`/projects?${params.toString()}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch projects');
    }
  }

  // Get project by ID
  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await apiService.get<{ data: Project }>(`/projects/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project');
    }
  }

  // Get user's projects
  async getUserProjects(userId: string): Promise<Project[]> {
    try {
      const response = await apiService.get<{ data: Project[] }>(`/projects/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.warn('Failed to fetch user projects:', error.message);
      return [];
    }
  }

  // Create new project
  async createProject(data: CreateProjectData, images?: File[]): Promise<Project> {
    try {
      let imageUrls: string[] = [];
      
      // Upload images first if provided
      if (images && images.length > 0) {
        const uploadResponse = await apiService.uploadFiles<{ imageUrls: string[] }>('/projects/upload-images', images);
        imageUrls = uploadResponse.imageUrls;
      }

      const projectData = {
        ...data,
        images: imageUrls,
      };

      const response = await apiService.post<{ data: Project }>('/projects', projectData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create project');
    }
  }

  // Update project
  async updateProject(id: string, data: UpdateProjectData, newImages?: File[]): Promise<Project> {
    try {
      let additionalImageUrls: string[] = [];
      
      // Upload new images if provided
      if (newImages && newImages.length > 0) {
        const uploadResponse = await apiService.uploadFiles<{ imageUrls: string[] }>('/projects/upload-images', newImages);
        additionalImageUrls = uploadResponse.imageUrls;
      }

      const updateData = {
        ...data,
        ...(additionalImageUrls.length > 0 && { additionalImages: additionalImageUrls }),
      };

      const response = await apiService.patch<{ data: Project }>(`/projects/${id}`, updateData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update project');
    }
  }

  // Delete project
  async deleteProject(id: string): Promise<void> {
    try {
      await apiService.delete(`/projects/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete project');
    }
  }

  // Add project update
  async addProjectUpdate(projectId: string, update: Omit<ProjectUpdate, 'id' | 'createdAt'>, images?: File[]): Promise<ProjectUpdate> {
    try {
      let imageUrls: string[] = [];
      
      if (images && images.length > 0) {
        const uploadResponse = await apiService.uploadFiles<{ imageUrls: string[] }>('/projects/upload-images', images);
        imageUrls = uploadResponse.imageUrls;
      }

      const updateData = {
        ...update,
        images: imageUrls,
      };

      const response = await apiService.post<{ data: ProjectUpdate }>(`/projects/${projectId}/updates`, updateData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add project update');
    }
  }

  // Get project updates
  async getProjectUpdates(projectId: string): Promise<ProjectUpdate[]> {
    try {
      const response = await apiService.get<{ data: ProjectUpdate[] }>(`/projects/${projectId}/updates`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project updates');
    }
  }

  // Invest in project
  async investInProject(data: InvestmentData): Promise<Investment> {
    try {
      const response = await apiService.post<{ data: Investment }>('/investments', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process investment');
    }
  }

  // Get user investments
  async getUserInvestments(userId: string): Promise<Investment[]> {
    try {
      const response = await apiService.get<{ data: Investment[] }>(`/investments/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.warn('Failed to fetch user investments:', error.message);
      return [];
    }
  }

  // Get project investments
  async getProjectInvestments(projectId: string): Promise<Investment[]> {
    try {
      const response = await apiService.get<{ data: Investment[] }>(`/investments/project/${projectId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project investments');
    }
  }

  // Get project categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await apiService.get<{ data: string[] }>('/projects/categories');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  }

  // Get trending projects
  async getTrendingProjects(limit: number = 10): Promise<Project[]> {
    try {
      const response = await apiService.get<{ data: Project[] }>(`/projects/trending?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch trending projects');
    }
  }

  // Get featured projects
  async getFeaturedProjects(limit: number = 5): Promise<Project[]> {
    try {
      const response = await apiService.get<{ data: Project[] }>(`/projects/featured?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured projects');
    }
  }

  // Search projects
  async searchProjects(query: string, filters?: Omit<ProjectFilters, 'search'>): Promise<Project[]> {
    try {
      const params = new URLSearchParams({ search: query });
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              params.append(key, value.join(','));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }

      const response = await apiService.get<{ data: Project[] }>(`/projects/search?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search projects');
    }
  }

  // Like/Unlike project
  async toggleProjectLike(projectId: string): Promise<{ liked: boolean; likesCount: number }> {
    try {
      const response = await apiService.post<{ liked: boolean; likesCount: number }>(`/projects/${projectId}/like`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to toggle like');
    }
  }

  // Follow/Unfollow project
  async toggleProjectFollow(projectId: string): Promise<{ following: boolean; followersCount: number }> {
    try {
      const response = await apiService.post<{ following: boolean; followersCount: number }>(`/projects/${projectId}/follow`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to toggle follow');
    }
  }
}

export const projectService = new ProjectService();