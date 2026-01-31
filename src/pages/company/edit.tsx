import { SelectOptionsWithAvatar } from "@/components";
import CustomAvatar from "@/components/custom-avatar";
import { businessTypeOptions, companySizeOptions, industryOptions } from "@/constants";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import { UsersSelectQuery } from "@/graphql/types";
import { getNameInitials } from "@/utils";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Col, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { CompanyContactsTable } from "./contacts-table";

export const EditCompany = () => {
  const { saveButtonProps, formProps, formLoading, query } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { query: selectQuery } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  const company = query?.data?.data ?? {};
  const {
    avatarUrl,
    name,
    salesOwner,
    companySize,
    totalRevenue,
    industry,
    businessType,
    country,
    website,
  } = company;

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit isLoading={formLoading} saveButtonProps={saveButtonProps} breadcrumb={false}>
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

              {/* Sales Owner */}
              <Form.Item
                label="Sales owner"
                name="salesOwnerId" // <-- Use salesOwnerId, not salesOwner
                initialValue={salesOwner?.id}
              >
                <Select
                  placeholder="Please select a sales owner"
                  options={selectQuery.data?.data.map((user) => ({
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
                  loading={selectQuery.isLoading}
                />
              </Form.Item>

              {/* Company Size */}
              <Form.Item label="Company Size" name="companySize" initialValue={companySize}>
                <Select
                  options={companySizeOptions}
                  placeholder="Company Size"
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              {/* Revenue */}
              <Form.Item label="Revenue" name="totalRevenue" initialValue={totalRevenue ?? 0}>
                <InputNumber
                  autoFocus
                  formatter={(value) =>
                    value ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "$ "
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>

              {/* Industry */}
              <Form.Item label="Industry" name="industry" initialValue={industry}>
                <Select
                  placeholder="Industry"
                  options={industryOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              {/* Business Type */}
              <Form.Item label="Business Type" name="businessType" initialValue={businessType}>
                <Select
                  placeholder="Business Type"
                  options={businessTypeOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              {/* Country */}
              <Form.Item label="Country" name="country" initialValue={country}>
                <Input placeholder="Country" />
              </Form.Item>

              {/* Website */}
              <Form.Item label="Website" name="website" initialValue={website}>
                <Input placeholder="Website" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col xs={24} xl={12}>
          <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
};
