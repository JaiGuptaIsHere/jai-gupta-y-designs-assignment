import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Edit2, Mail, Calendar, Activity, Clock } from 'lucide-react';
import { userApi } from '../services/api';
import { generateUserActivities } from '../utils/userEnhancer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import UserAvatar from '../components/users/UserAvatar';
import EditUserModal from '../components/users/EditUserModal';
import Skeleton from '../components/ui/Skeleton';
import { type UserWithStatus } from '../types/user';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUserById(Number(id)),
    enabled: !!id,
  });

  const activities = user ? generateUserActivities(user.id) : [];

  const handleSaveUser = (data: Partial<UserWithStatus>) => {
    queryClient.setQueryData(['user', id], (old: UserWithStatus) => ({
      ...old,
      ...data,
    }));
    
    queryClient.setQueryData(['users'], (old: UserWithStatus[]) => 
      old?.map(u => u.id === Number(id) ? { ...u, ...data } : u)
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <div className="flex flex-col items-center">
                <Skeleton variant="circular" className="w-24 h-24" />
                <Skeleton className="h-6 w-32 mt-4" />
                <Skeleton className="h-4 w-48 mt-2" />
              </div>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-4" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">User not found</p>
        <Button onClick={() => navigate('/users')}>Back to Users</Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/users')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Users
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center text-center">
              <UserAvatar
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                size="xl"
              />

              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {user.first_name} {user.last_name}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>

              <div className="mt-4">
                <Badge variant={user.status === 'active' ? 'success' : 'danger'} size="md">
                  {user.status}
                </Badge>
              </div>

              <Button
                variant="primary"
                className="w-full mt-6"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit User
              </Button>

              <div className="w-full mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <div className="text-left flex-1">
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      Joined
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Activity className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <div className="text-left flex-1">
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      Last Active
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      {formatDate(user.lastActive)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Activity Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {activities.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Total Actions
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.floor(Math.random() * 50) + 20}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Files Shared
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.floor(Math.random() * 100) + 50}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Comments
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.floor(Math.random() * 30) + 10}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Reports
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {activity.action}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {activity.description}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {formatDateTime(activity.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <EditUserModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UserDetailPage;