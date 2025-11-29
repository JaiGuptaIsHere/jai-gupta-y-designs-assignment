import { type User, type UserWithStatus, type UserActivity } from '../types/user';

const getStatus = (id: number): 'active' | 'inactive' => {
  return id % 3 === 0 ? 'inactive' : 'active';
};

const getCreatedDate = (id: number): string => {
  const daysAgo = (id * 7) % 365;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const getLastActiveDate = (id: number): string => {
  const daysAgo = (id * 3) % 30;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const enhanceUser = (user: User): UserWithStatus => {
  return {
    ...user,
    status: getStatus(user.id),
    createdAt: getCreatedDate(user.id),
    lastActive: getLastActiveDate(user.id),
  };
};

export const enhanceUsers = (users: User[]): UserWithStatus[] => {
  return users.map(enhanceUser);
};

export const generateUserActivities = (userId: number): UserActivity[] => {
  const activities = [
    'Logged in',
    'Updated profile',
    'Changed password',
    'Uploaded document',
    'Shared file',
    'Commented on post',
    'Created report',
    'Downloaded data',
  ];

  return Array.from({ length: 5 }, (_, index) => {
    const daysAgo = index * 2;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(Math.floor(Math.random() * 24));
    
    const actionIndex = (userId + index) % activities.length;
    
    return {
      id: `activity-${userId}-${index}`,
      action: activities[actionIndex],
      timestamp: date.toISOString(),
      description: `User performed ${activities[actionIndex].toLowerCase()} action`,
    };
  });
};