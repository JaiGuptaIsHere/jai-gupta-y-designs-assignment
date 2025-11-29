import axios from 'axios';
import { type User } from '../types/user';
import { enhanceUser, enhanceUsers } from '../utils/userEnhancer';

const API_BASE_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const MOCK_USERS: User[] = [
  { id: 1, email: 'rahul.sharma@example.com', first_name: 'Rahul', last_name: 'Sharma', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, email: 'priya.patel@example.com', first_name: 'Priya', last_name: 'Patel', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, email: 'amit.kumar@example.com', first_name: 'Amit', last_name: 'Kumar', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, email: 'sneha.reddy@example.com', first_name: 'Sneha', last_name: 'Reddy', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, email: 'vikram.singh@example.com', first_name: 'Vikram', last_name: 'Singh', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 6, email: 'ananya.iyer@example.com', first_name: 'Ananya', last_name: 'Iyer', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 7, email: 'rohan.mehta@example.com', first_name: 'Rohan', last_name: 'Mehta', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 8, email: 'kavya.nair@example.com', first_name: 'Kavya', last_name: 'Nair', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 9, email: 'arjun.gupta@example.com', first_name: 'Arjun', last_name: 'Gupta', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 10, email: 'ishita.joshi@example.com', first_name: 'Ishita', last_name: 'Joshi', avatar: 'https://i.pravatar.cc/150?img=10' },
  { id: 11, email: 'aditya.rao@example.com', first_name: 'Aditya', last_name: 'Rao', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 12, email: 'meera.desai@example.com', first_name: 'Meera', last_name: 'Desai', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 13, email: 'karan.malhotra@example.com', first_name: 'Karan', last_name: 'Malhotra', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: 14, email: 'neha.kulkarni@example.com', first_name: 'Neha', last_name: 'Kulkarni', avatar: 'https://i.pravatar.cc/150?img=14' },
  { id: 15, email: 'siddharth.verma@example.com', first_name: 'Siddharth', last_name: 'Verma', avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: 16, email: 'pooja.shah@example.com', first_name: 'Pooja', last_name: 'Shah', avatar: 'https://i.pravatar.cc/150?img=16' },
  { id: 17, email: 'nikhil.bose@example.com', first_name: 'Nikhil', last_name: 'Bose', avatar: 'https://i.pravatar.cc/150?img=17' },
  { id: 18, email: 'riya.agarwal@example.com', first_name: 'Riya', last_name: 'Agarwal', avatar: 'https://i.pravatar.cc/150?img=18' },
  { id: 19, email: 'varun.kapoor@example.com', first_name: 'Varun', last_name: 'Kapoor', avatar: 'https://i.pravatar.cc/150?img=19' },
  { id: 20, email: 'divya.bansal@example.com', first_name: 'Divya', last_name: 'Bansal', avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: 21, email: 'harsh.chauhan@example.com', first_name: 'Harsh', last_name: 'Chauhan', avatar: 'https://i.pravatar.cc/150?img=21' },
  { id: 22, email: 'tanvi.pillai@example.com', first_name: 'Tanvi', last_name: 'Pillai', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: 23, email: 'ayush.yadav@example.com', first_name: 'Ayush', last_name: 'Yadav', avatar: 'https://i.pravatar.cc/150?img=23' },
  { id: 24, email: 'sakshi.pandey@example.com', first_name: 'Sakshi', last_name: 'Pandey', avatar: 'https://i.pravatar.cc/150?img=24' },
  { id: 25, email: 'manish.jain@example.com', first_name: 'Manish', last_name: 'Jain', avatar: 'https://i.pravatar.cc/150?img=25' },
  { id: 26, email: 'aditi.saxena@example.com', first_name: 'Aditi', last_name: 'Saxena', avatar: 'https://i.pravatar.cc/150?img=26' },
  { id: 27, email: 'gaurav.mishra@example.com', first_name: 'Gaurav', last_name: 'Mishra', avatar: 'https://i.pravatar.cc/150?img=27' },
  { id: 28, email: 'nidhi.srivastava@example.com', first_name: 'Nidhi', last_name: 'Srivastava', avatar: 'https://i.pravatar.cc/150?img=28' },
  { id: 29, email: 'deepak.thakur@example.com', first_name: 'Deepak', last_name: 'Thakur', avatar: 'https://i.pravatar.cc/150?img=29' },
  { id: 30, email: 'anjali.bhatt@example.com', first_name: 'Anjali', last_name: 'Bhatt', avatar: 'https://i.pravatar.cc/150?img=30' },
  { id: 31, email: 'rajesh.tiwari@example.com', first_name: 'Rajesh', last_name: 'Tiwari', avatar: 'https://i.pravatar.cc/150?img=31' },
  { id: 32, email: 'shruti.menon@example.com', first_name: 'Shruti', last_name: 'Menon', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 33, email: 'vivek.dubey@example.com', first_name: 'Vivek', last_name: 'Dubey', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 34, email: 'simran.chawla@example.com', first_name: 'Simran', last_name: 'Chawla', avatar: 'https://i.pravatar.cc/150?img=34' },
  { id: 35, email: 'pankaj.khanna@example.com', first_name: 'Pankaj', last_name: 'Khanna', avatar: 'https://i.pravatar.cc/150?img=35' },
  { id: 36, email: 'payal.singh@example.com', first_name: 'Payal', last_name: 'Singh', avatar: 'https://i.pravatar.cc/150?img=36' },
  { id: 37, email: 'sandeep.varma@example.com', first_name: 'Sandeep', last_name: 'Varma', avatar: 'https://i.pravatar.cc/150?img=37' },
  { id: 38, email: 'kirti.goyal@example.com', first_name: 'Kirti', last_name: 'Goyal', avatar: 'https://i.pravatar.cc/150?img=38' },
  { id: 39, email: 'vishal.pandey@example.com', first_name: 'Vishal', last_name: 'Pandey', avatar: 'https://i.pravatar.cc/150?img=39' },
  { id: 40, email: 'megha.shukla@example.com', first_name: 'Megha', last_name: 'Shukla', avatar: 'https://i.pravatar.cc/150?img=40' },
  { id: 41, email: 'abhishek.singh@example.com', first_name: 'Abhishek', last_name: 'Singh', avatar: 'https://i.pravatar.cc/150?img=41' },
  { id: 42, email: 'richa.malhotra@example.com', first_name: 'Richa', last_name: 'Malhotra', avatar: 'https://i.pravatar.cc/150?img=42' },
  { id: 43, email: 'mohit.chopra@example.com', first_name: 'Mohit', last_name: 'Chopra', avatar: 'https://i.pravatar.cc/150?img=43' },
  { id: 44, email: 'swati.arora@example.com', first_name: 'Swati', last_name: 'Arora', avatar: 'https://i.pravatar.cc/150?img=44' },
  { id: 45, email: 'naveen.das@example.com', first_name: 'Naveen', last_name: 'Das', avatar: 'https://i.pravatar.cc/150?img=45' },
  { id: 46, email: 'preeti.bajaj@example.com', first_name: 'Preeti', last_name: 'Bajaj', avatar: 'https://i.pravatar.cc/150?img=46' },
  { id: 47, email: 'tarun.sengupta@example.com', first_name: 'Tarun', last_name: 'Sengupta', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 48, email: 'komal.rana@example.com', first_name: 'Komal', last_name: 'Rana', avatar: 'https://i.pravatar.cc/150?img=48' },
  { id: 49, email: 'yash.bhardwaj@example.com', first_name: 'Yash', last_name: 'Bhardwaj', avatar: 'https://i.pravatar.cc/150?img=49' },
  { id: 50, email: 'tanya.ghosh@example.com', first_name: 'Tanya', last_name: 'Ghosh', avatar: 'https://i.pravatar.cc/150?img=50' },
];

export const userApi = {
  getUsers: async (page: number = 1, perPage: number = 6) => {
    try {
      const response = await api.get<UsersResponse>('/users', {
        params: { page, per_page: perPage },
      });
      return {
        ...response.data,
        data: enhanceUsers(response.data.data),
      };
    } catch (error) {
      console.warn('API failed, using mock data');
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return {
        page,
        per_page: perPage,
        total: MOCK_USERS.length,
        total_pages: Math.ceil(MOCK_USERS.length / perPage),
        data: enhanceUsers(MOCK_USERS.slice(start, end)),
      };
    }
  },

  getUserById: async (id: number) => {
    try {
      const response = await api.get<{ data: User }>(`/users/${id}`);
      return enhanceUser(response.data.data);
    } catch (error) {
      console.warn('API failed, using mock data');
      const user = MOCK_USERS.find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return enhanceUser(user);
    }
  },

  getAllUsers: async () => {
    try {
      const response = await api.get<UsersResponse>('/users', {
        params: { page: 1, per_page: 12 },
      });
      
      console.log('API Success! Fetched users:', response.data.data);
      return enhanceUsers(response.data.data);
    } catch (error) {
      console.warn('API failed, using mock data with 50 Indian users');
      return enhanceUsers(MOCK_USERS);
    }
  },
};

export default api;