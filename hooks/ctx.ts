import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (username: string, password: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  console.log('useSession', value);
  return value;
}

// export function SessionProvider({ children }: PropsWithChildren) {
// const [[isLoading, session], setSession] = useStorageState('session');

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn: (username: string, password: string) => {
//           // Perform sign-in logic here
//           setSession(`${username}-${password}`);
//         },
//         signOut: () => {
//           setSession(null);
//         },
//         session,
//         isLoading,
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
