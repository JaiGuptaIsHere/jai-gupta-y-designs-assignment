# User Management Dashboard

A modern, fully-featured user management and analytics dashboard built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- ✅ **User List Page** with pagination, filtering, and sorting
- ✅ **User Details Page** with profile information and activity history
- ✅ **Analytics Dashboard** with interactive charts
- ✅ **Dark Mode** toggle with system preference support
- ✅ **Responsive Design** - works seamlessly on mobile, tablet, and desktop

### Advanced Features
- ✅ **React Query** for data fetching and caching
- ✅ **Form Validation** using Zod and React Hook Form
- ✅ **Debounced Search** for better UX
- ✅ **Skeleton Loaders** for loading states
- ✅ **Modal System** with keyboard support (ESC to close)
- ✅ **Reusable Components** (Button, Card, Input, Select, Table, etc.)
- ✅ **TypeScript** for type safety
- ✅ **Client-side Filtering & Sorting** for better performance

## 🛠️ Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Routing:** React Router v6
- **State Management:** React Query (TanStack Query)
- **Styling:** Tailwind CSS
- **Form Management:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React
- **Data Source:** ReqRes API (https://reqres.in)

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/JaiGuptaIsHere/jai-gupta-y-designs-assignment
cd jai-gupta-y-designs-assignment
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Layout.tsx          # Main layout with navigation
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Table.tsx
│   │   ├── Pagination.tsx
│   │   └── Skeleton.tsx
│   └── users/                  # User-specific components
│       ├── UserAvatar.tsx
│       ├── UserCard.tsx
│       ├── UserFilters.tsx
│       └── EditUserModal.tsx
├── contexts/
│   └── ThemeContext.tsx        # Dark mode context
├── pages/
│   ├── UsersPage.tsx           # User list with filters
│   ├── UserDetailPage.tsx      # Individual user details
│   └── AnalyticsPage.tsx       # Analytics dashboard
├── services/
│   └── api.ts                  # API service layer
├── types/
│   └── user.ts                 # TypeScript types
├── utils/
│   └── userEnhancer.ts         # Data enhancement utilities
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## 🎨 Design Decisions

### 1. **Architecture**
- **Component-based architecture** for reusability and maintainability
- **Separation of concerns** - UI components, business logic, and API calls are separated
- **Custom hooks** could be added for shared logic (future enhancement)

### 2. **State Management**
- **React Query** for server state (caching, refetching, loading states)
- **Context API** for global UI state (theme)
- **Local state** for component-specific state

### 3. **Data Fetching**
- Used **ReqRes.in** as the free mock API
- Enhanced API data with additional fields (status, createdAt, lastActive) using deterministic algorithms
- React Query provides automatic caching and background refetching

### 4. **Styling Approach**
- **Tailwind CSS** for utility-first styling
- **Custom CSS classes** for reusable patterns
- **Dark mode** using Tailwind's dark mode feature
- **Animations** using Tailwind animations

### 5. **User Experience**
- **Debounced search** (300ms) to reduce unnecessary renders
- **Skeleton loaders** for better perceived performance
- **Keyboard navigation** (ESC to close modals)
- **Responsive tables** that work on all screen sizes
- **Optimistic updates** for edit functionality

### 6. **Type Safety**
- Full TypeScript implementation
- Zod schemas for runtime validation
- Proper type inference throughout the app

## 📊 Data Source

The app uses **ReqRes.in** API which provides:
- 12 mock users across 2 pages
- User avatars and basic information
- Free, no authentication required

Additional fields (status, dates, activities) are generated client-side using deterministic algorithms based on user IDs, ensuring consistency across sessions.

## 🎯 Key Features Explained

### Filtering & Sorting
- **Search by name** - debounced for performance
- **Filter by status** - Active/Inactive/All
- **Sort by name or date** - with ascending/descending order
- All filtering happens client-side after fetching all users

### Pagination
- **6 users per page** for optimal viewing
- Smart pagination component that shows relevant page numbers
- Displays total count and current range

### User Details
- **Complete profile** with avatar and contact info
- **Activity summary** with mock statistics
- **Recent activities** with timestamps
- **Edit functionality** with form validation

### Analytics
- **Signup trend** - Line chart showing last 7 days
- **User status distribution** - Pie chart for active vs inactive
- **Summary statistics** - Total users, active users, growth rate

### Dark Mode
- Persists across sessions using localStorage
- Smooth transitions between themes
- All components fully support both themes


## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Hope the functionalities are onPoint...
