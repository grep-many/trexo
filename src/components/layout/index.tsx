import { ThemedLayout, ThemedSider } from "@refinedev/antd";
import Header from "./header";
import React from "react";

const Layout = ({ children }: React.PropsWithChildren) => (
  <ThemedLayout Header={Header} Sider={(props) => <ThemedSider {...props} fixed />}>
    {children}
  </ThemedLayout>
);

export default Layout;
