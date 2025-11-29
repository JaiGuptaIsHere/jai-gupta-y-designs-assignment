import { Mail, Calendar, Activity } from 'lucide-react';
import { type UserWithStatus } from '../../types/user';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import UserAvatar from './UserAvatar';

interface UserCardProps {
  user: UserWithStatus;
}

const UserCard = ({ user }: UserCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card hover className="h-full">
      <div className="flex flex-col items-center text-center">
        <UserAvatar
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          size="xl"
        />
        
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {user.first_name} {user.last_name}
        </h3>
        
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
          <Mail className="w-4 h-4" />
          {user.email}
        </div>

        <div className="mt-3">
          <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
            {user.status}
          </Badge>
        </div>

        <div className="w-full mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            Joined {formatDate(user.createdAt)}
          </div>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <Activity className="w-3 h-3" />
            Last active {formatDate(user.lastActive)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;