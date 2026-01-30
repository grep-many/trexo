import { SaveButton, useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Spin } from "antd";

import { getNameInitials } from "@/utils";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations";
import { UpdateUserMutation, UpdateUserMutationVariables } from "@/graphql/types";

import { Text } from "../text";
import CustomAvatar from "../custom-avatar";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  /**
   * useForm from Refine (Ant Design integration)
   *
   * It handles:
   * - Fetching the record (via useOne internally for `edit`)
   * - Managing form state
   * - Submitting mutations
   *
   * IMPORTANT:
   * - `queryResult` is NOT returned anymore
   * - Instead, we use:
   *   - `query` → contains fetched data
   *   - `formLoading` → loading state for the query
   */
  const {
    saveButtonProps,
    formProps,
    query, // contains the fetched user data
    formLoading, // loading state of the edit query
  } = useForm<
    /**
     * Fields that will be sent in the mutation
     */
    GetFields<UpdateUserMutation>,
    /**
     * Error type for failed requests
     */
    HttpError,
    /**
     * Variables type for the UpdateUser mutation
     */
    GetVariables<UpdateUserMutationVariables>
  >({
    /**
     * optimistic:
     * UI updates immediately as if the mutation succeeds
     */
    mutationMode: "optimistic",

    /**
     * Resource name in Refine
     */
    resource: "users",

    /**
     * edit action triggers:
     * - useOne to fetch the user
     * - update mutation on submit
     */
    action: "edit",

    /**
     * ID of the user to edit
     */
    id: userId,

    /**
     * GraphQL-specific configuration
     */
    meta: {
      gqlMutation: UPDATE_USER_MUTATION,
    },
  });

  /**
   * Extract user data from the query result
   */
  const { avatarUrl, name } = query?.data?.data || {};

  /**
   * Close drawer handler
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * While the edit query is loading, show a centered spinner
   * (same behavior as before, just using `formLoading`)
   */
  if (formLoading) {
    return (
      <Drawer
        open={opened}
        width={756}
        styles={{
          body: {
            background: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Spin />
      </Drawer>
    );
  }

  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" },
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        <Text strong>Account Settings</Text>
        <Button type="text" icon={<CloseOutlined />} onClick={closeModal} />
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        <Card>
          <Form {...formProps} layout="vertical">
            <CustomAvatar
              shape="square"
              src={avatarUrl}
              name={getNameInitials(name || "")}
              style={{
                width: 96,
                height: 96,
                marginBottom: "24px",
              }}
            />

            <Form.Item label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item label="Job title" name="jobTitle">
              <Input placeholder="Job title" />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input placeholder="Phone" />
            </Form.Item>
          </Form>

          <SaveButton
            {...saveButtonProps}
            style={{
              display: "block",
              marginLeft: "auto",
            }}
          />
        </Card>
      </div>
    </Drawer>
  );
};
