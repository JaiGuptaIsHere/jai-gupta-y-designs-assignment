import { Search, Filter } from 'lucide-react';
import { type UserFilters as UserFiltersType } from '../../types/user';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { useEffect, useState } from 'react';

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
}

const UserFilters = ({ filters, onFiltersChange }: UserFiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchValue });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="card p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Filters
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          label=""
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
          value={filters.status}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value as UserFiltersType['status'],
            })
          }
        />

        <div className="flex gap-2">
          <Select
            label=""
            options={[
              { value: 'name', label: 'Sort by Name' },
              { value: 'createdAt', label: 'Sort by Date' },
            ]}
            value={filters.sortBy}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                sortBy: e.target.value as UserFiltersType['sortBy'],
              })
            }
          />
          <Select
            label=""
            options={[
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' },
            ]}
            value={filters.sortOrder}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                sortOrder: e.target.value as UserFiltersType['sortOrder'],
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserFilters;