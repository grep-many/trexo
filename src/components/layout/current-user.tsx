import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import CustomAvatar from "../custom-avatar";
import { User } from "@/graphql/schema.types";
import { useGetIdentity } from "@refinedev/core";
import { Text } from "../text";
import React from "react";

const CurrentUser = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: user } = useGetIdentity<User>();

  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name || "Guest"}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)}
        >
          Account Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        styles={{
          body: { padding: 0 },
          root: { zIndex: 999 },
        }}
        content={content}
      >
        <CustomAvatar
          name={user?.name || "Guest"}
          src={user?.avatarUrl}
          size={"default"}
          style={{ cursor: "pointer" }}
        />
      </Popover>
      {/* 
        TODO: Create a accountSettings
        {user && <AccountSettings opened={isOpen} setIsOpened={setIsOpen} user={user}/>} 
      */}
    </>
  );
};

export default CurrentUser;
