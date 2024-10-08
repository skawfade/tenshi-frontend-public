import React from "react";
import { Header } from "../Header/Header";
import { SidebarContext } from "./layout-context";
import { useLockedBody } from "../../hooks/useBodyLock";
import { Sidebar } from "../Sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}>
      <section className='flex'>
        <Sidebar />
        <Header>{children}</Header>
      </section>
    </SidebarContext.Provider>
  );
};

export default Layout