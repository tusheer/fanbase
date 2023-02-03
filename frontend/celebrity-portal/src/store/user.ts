import { create } from 'zustand';
import { DecodedUser } from '../../pages/_app';

type User = DecodedUser | null;

interface IUserStore {
    user: User;
    setUser: (user: User) => void;
    removeUser: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user: DecodedUser | null) => set(() => ({ user })),
    removeUser: () => set({ user: null }),
}));

export default useUserStore;
