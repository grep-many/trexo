import { ThemedLayout, ThemedTitle } from "@refinedev/antd";
import Header from "./header";
import React from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayout Header={Header} Title={(props) => <ThemedTitle {...props} text={<>Trexo</>} />}>
      {children}
    </ThemedLayout>
  );
};

export default Layout;
