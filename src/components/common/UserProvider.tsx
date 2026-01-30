import { getUserData } from '@/api/authApi';
import { User } from '@/types/auth';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface UserContextValue {
  user: User | null | 'isPending';
  setUser: (user: User | null | 'isPending') => void;
}

const UserContext = createContext<UserContextValue | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null | 'isPending'>('isPending');

  const access = localStorage.getItem('accessToken');
  const refresh = localStorage.getItem('refreshToken');

  const getMe = async (access: string | null) => {
    if (access || refresh) {
      setUser('isPending');
      console.log(1);
      try {
        const data = await getUserData();
        setUser(data);
      } catch (e) {
        console.log(e);
        setUser(null);
      }
    } else {
      console.log(2);
      setUser(null);
    }
  };

  useEffect(() => {
    getMe(access);
  }, [access]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
