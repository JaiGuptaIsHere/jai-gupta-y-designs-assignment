import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { userApi } from '../services/api';
import { type UserFilters as UserFiltersType, type UserWithStatus } from '../types/user';
import UserFilters from '../components/users/UserFilters';
import Table from '../components/ui/Table';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import UserAvatar from '../components/users/UserAvatar';
import Skeleton from '../components/ui/Skeleton';

const UsersPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<UserFiltersType>({
    search: '',
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAllUsers,
  });

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchLower) ||
          user.last_name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter((user) => user.status === filters.status);
    }

    filtered.sort((a, b) => {
      let aValue, bValue;

      if (filters.sortBy === 'name') {
        aValue = `${a.first_name} ${a.last_name}`.toLowerCase();
        bValue = `${b.first_name} ${b.last_name}`.toLowerCase();
      } else {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [users, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const columns = [
    {
      key: 'avatar',
      label: 'Avatar',
      render: (user: UserWithStatus) => (
        <UserAvatar
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          size="sm"
        />
      ),
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (user: UserWithStatus) => (
        <div>
          <div className="font-medium">
            {user.first_name} {user.last_name}
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (user: UserWithStatus) => (
        <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (user: UserWithStatus) => (
        <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
          {user.status}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created Date',
      sortable: true,
      render: (user: UserWithStatus) => formatDate(user.createdAt),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user: UserWithStatus) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/users/${user.id}`)}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="card">
          <div className="p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton variant="circular" className="w-10 h-10" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Users
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage and view all users in the system
        </p>
      </div>

      <UserFilters filters={filters} onFiltersChange={setFilters} />

      <div className="card overflow-hidden">
        <Table
          columns={columns}
          data={paginatedUsers}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSort={(key) =>
            setFilters({
              ...filters,
              sortBy: key as UserFiltersType['sortBy'],
              sortOrder:
                filters.sortBy === key && filters.sortOrder === 'asc'
                  ? 'desc'
                  : 'asc',
            })
          }
        />

        {filteredUsers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredUsers.length}
          />
        )}
      </div>
    </div>
  );
};

export default UsersPage;