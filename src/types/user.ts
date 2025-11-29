export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserWithStatus extends User {
  status: 'active' | 'inactive';
  createdAt: string;
  lastActive: string;
}

export interface UserFilters {
  search: string;
  status: 'all' | 'active' | 'inactive';
  sortBy: 'name' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface UserActivity {
  id: string;
  action: string;
  timestamp: string;
  description: string;
}