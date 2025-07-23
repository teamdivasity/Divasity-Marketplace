export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface UserProfile {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'investor' | 'entrepreneur';
  telephone?: string;
  address?: string;
  profilePicture?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  isVerified: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  walletAddress?: string;
  totalInvested?: number;
  totalRaised?: number;
  projectsCount?: number;
  followersCount?: number;
  followingCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  fundingGoal: number;
  currentFunding: number;
  minimumInvestment: number;
  maximumInvestment?: number;
  deadline: Date;
  status: 'draft' | 'active' | 'funded' | 'completed' | 'cancelled';
  images: string[];
  documents: string[];
  businessPlan?: string;
  pitchDeck?: string;
  financialProjections?: string;
  teamMembers: TeamMember[];
  milestones: Milestone[];
  updates: ProjectUpdate[];
  investors: Investment[];
  creatorId: string;
  creator: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedIn?: string;
  twitter?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  targetDate: Date;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  images?: string[];
  createdAt: Date;
}

export interface Investment {
  id: string;
  amount: number;
  investorId: string;
  investor: UserProfile;
  projectId: string;
  transactionHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: Date;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  images: string[];
  category: string;
  tags: string[];
  authorId: string;
  author: UserProfile;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  comments: Comment[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: UserProfile;
  parentId?: string;
  replies?: Comment[];
  likes: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'investment' | 'project_update' | 'news' | 'system' | 'message';
  title: string;
  message: string;
  data?: any;
  userId: string;
  isRead: boolean;
  createdAt: Date;
}

export interface OTPData {
  id: string;
  email: string;
  otp: string;
  type: 'email_verification' | 'password_reset' | 'login' | 'phone_verification';
  expiresAt: Date;
  isUsed: boolean;
  attempts: number;
  createdAt: Date;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'failed';
  transactionHash?: string;
  fromAddress?: string;
  toAddress?: string;
  gasUsed?: number;
  gasFee?: number;
  createdAt: Date;
  confirmedAt?: Date;
}

export interface MarketplaceStats {
  totalProjects: number;
  activeProjects: number;
  totalFunding: number;
  totalInvestors: number;
  totalEntrepreneurs: number;
  averageFundingAmount: number;
  successRate: number;
  topCategories: Array<{
    category: string;
    count: number;
    totalFunding: number;
  }>;
}