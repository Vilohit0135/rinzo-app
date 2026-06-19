import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface TabBarContextValue {
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;
}

const TabBarContext = createContext<TabBarContextValue>({
  isTabBarVisible: true,
  setTabBarVisible: () => {},
});

export const TabBarProvider = ({ children }: { children: ReactNode }) => {
  const [isTabBarVisible, setTabBarVisible] = useState(true);

  return (
    <TabBarContext.Provider value={{ isTabBarVisible, setTabBarVisible }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => useContext(TabBarContext);
