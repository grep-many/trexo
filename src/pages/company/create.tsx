import { Form, Input, Modal, Select } from "antd";
import { CompanyList } from "./list";
import { useModalForm } from "@refinedev/antd";
import { useGo, useSelect } from "@refinedev/core";
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import { SelectOptionsWithAvatar } from "@/components";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";

export const CreateCompany = () => {
  const go = useGo();

  const goToListPage = () =>
    go({
      to: {
        resource: "companies",
        action: "list",
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });

  const { query } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <CompanyList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToListPage}
        title="Create Company"
        width="512px"
      >
        <Form {...formProps} layout="vertical">
          <Form.Item label="Company name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Please enter a company name" />
          </Form.Item>
          <Form.Item label="Sales owner" name="salesOwnerId" rules={[{ required: true }]}>
            <Select
              placeholder="Please select a sales owner"
              options={query.data?.data.map((user) => ({
                value: user.id,
                label: (
                  <SelectOptionsWithAvatar
                    name={user.name}
                    avatarUrl={user.avatarUrl ?? undefined}
                  />
                ),
              }))}
              filterOption={(input, option) =>
                option?.label?.props?.name?.toLowerCase().includes(input.toLowerCase())
              }
              showSearch
              loading={query.isLoading}
            />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  );
};
