import { Popover } from "antd";
import CustomAvatar from "../custom-avatar";
// import { User } from "@/graphql/schema.types";
// import { useGetIdentity } from "@refinedev/core";

const CurrentUser = () => {
  // const { data: user } = useGetIdentity<User>();
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        // overlayInnerStyle={{ padding: 0 }}
        // overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar name="JM" />
      </Popover>
    </>
  );
};

export default CurrentUser;
