import { apiService } from './api';
import { User } from '../store/authStore';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  address: string;
  password: string;
  role?: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User;
  token?: string;
  error?: boolean;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  error?: boolean;
}

class AuthService {
  // User registration
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const userName = `${data.firstName.trim().toLowerCase()}_${data.lastName.trim().toLowerCase()}`;
      
      const response = await apiService.post<AuthResponse>('/users/register', {
        ...data,
        userName,
      });
      
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // User login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/users/login', credentials);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Verify OTP
  async verifyOTP(data: OTPVerification): Promise<OTPResponse> {
    try {
      const response = await apiService.post<OTPResponse>('/users/verifyotp', data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'OTP verification failed');
    }
  }

  // Resend OTP
  async resendOTP(email: string): Promise<OTPResponse> {
    try {
      const response = await apiService.post<OTPResponse>('/users/resendOtp', { email });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  }

  // Forgot password
  async forgotPassword(data: ForgotPasswordData): Promise<OTPResponse> {
    try {
      const response = await apiService.post<OTPResponse>('/users/forgot-password', data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  }

  // Reset password with OTP
  async resetPassword(data: ResetPasswordData): Promise<OTPResponse> {
    try {
      const response = await apiService.post<OTPResponse>('/users/verify-otp', data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<User> {
    try {
      const response = await apiService.get<{ data: User }>(`/users/getuser/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    try {
      const response = await apiService.patch<{ data: User }>(`/users/update/${userId}`, updates);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  // Upload profile image
  async uploadProfileImage(file: File, onProgress?: (progress: number) => void): Promise<{ imageUrl: string }> {
    try {
      const response = await apiService.uploadFile<{ imageUrl: string }>('/users/upload-avatar', file, onProgress);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<OTPResponse> {
    try {
      const response = await apiService.post<OTPResponse>('/users/change-password', {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }

  // Delete account
  async deleteAccount(password: string): Promise<OTPResponse> {
    try {
      const response = await apiService.delete<OTPResponse>('/users/delete-account', {
        data: { password },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete account');
    }
  }

  // Logout (client-side cleanup)
  logout(): void {
    // Clear any client-side data if needed
    localStorage.removeItem('auth-storage');
    sessionStorage.clear();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth-storage');
    return !!token;
  }

  // Get stored token
  getToken(): string | null {
    try {
      const authData = localStorage.getItem('auth-storage');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.state?.token || null;
      }
      return null;
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();