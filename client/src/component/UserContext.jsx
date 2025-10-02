import { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Custom hook for easy access
export function useUser() {
  return useContext(UserContext);
}

// Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
