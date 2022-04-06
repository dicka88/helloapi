import create from 'zustand';
import jwtDecode from 'jwt-decode';

export type User = {
  id?: string | null
  email?: string | null
  emailVerifiedAt: string | null
  name?: string | null
  avatarUrl?: string | null
  exp?: number | null
  iat?: number | null
}

let initialUser: User = {
  id: null,
  email: null,
  emailVerifiedAt: null,
  name: null,
  avatarUrl: null,
  exp: null,
  iat: null,
};

const token = localStorage.getItem('token');
if (token) {
  initialUser = jwtDecode(token) as User;
}

interface UserState {
  user: User | null;
  setUser: Function;
  flush: () => void;
}

const useUser = create<UserState>((set) => ({
  user: initialUser,
  setUser: (user: User) => set((state) => ({ user: { ...state.user, ...user } })),
  flush: () => set(() => ({ user: initialUser })),
}));

export default useUser;
