
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const USER_KEY = "demoUser";

const readStoredUser = () => {
  try {
    const user =
      sessionStorage.getItem(USER_KEY) ||
      localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [isLoading, setIsLoading] = useState(false);

  // Login: user data save karo.
  const login = useCallback((userData, rememberMe = true) => {
    if (!userData || !userData.email) {
      throw new Error("Valid user information required.");
    }

    const safeUser = {
      id: userData.id ?? userData._id ?? null,
      name: userData.name ?? "",
      email: userData.email,
      role: userData.role ?? "customer",
      phone: userData.phone ?? "",
    };

    try {
      // Purani session clear karo.
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(USER_KEY, JSON.stringify(safeUser));

      setUser(safeUser);
      return safeUser;
    } catch (error) {
      console.error("Login session save nahi hua:", error);
      throw error;
    }
  }, []);

  // Logout: saved user remove karo.
  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // User profile update karo.
  const updateUser = useCallback(
    (updates) => {
      if (!user) return null;

      const updatedUser = {
        ...user,
        ...updates,
        id: user.id,
        email: user.email,
        role: user.role,
      };

      try {
        const storage = sessionStorage.getItem(USER_KEY)
          ? sessionStorage
          : localStorage;

        storage.setItem(USER_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);

        return updatedUser;
      } catch (error) {
        console.error("Profile update nahi hua:", error);
        throw error;
      }
    },
    [user]
  );

  const isAuthenticated = Boolean(user);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      updateUser,
      setIsLoading,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      updateUser,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth ko AuthProvider ke andar use karo.");
  }

  return context;
}

export default AuthContext;
