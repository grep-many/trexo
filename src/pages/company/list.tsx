import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { Company } from "@/graphql/schema.types";
import { currencyNumber } from "@/utils";
import { SearchOutlined } from "@ant-design/icons";
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List } from "@refinedev/antd";
import { getDefaultFilter, useGo, useParsed, useTable } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const CompanyList = ({ children }: Props) => {
  const { params } = useParsed();
  const [pageSize, updatePageSize] = React.useState(params?.pageSize || 12);
  const go = useGo();
  const { tableQuery, filters, setFilters, currentPage, pageCount, setCurrentPage, setPageSize } =
    useTable({
      resource: "companies",
      meta: {
        gqlQuery: COMPANIES_LIST_QUERY,
      },
      pagination: {
        pageSize: pageSize,
      },

      sorters: {
        initial: [
          {
            field: "createdAt",
            order: "desc",
          },
        ],
      },
      filters: {
        initial: [
          {
            field: "name",
            operator: "contains",
            value: undefined,
          },
        ],
      },
    });

  const handleConfirm = (value: string) =>
    setFilters([{ field: "name", operator: "contains", value }], "replace");

  return (
    <>
      {children}
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() =>
              go({
                to: { resource: "companies", action: "create" },
                options: {
                  keepQuery: true,
                },
                type: "replace",
              })
            }
          />
        )}
      >
        <Table
          loading={tableQuery.isLoading}
          dataSource={tableQuery.data?.data}
          pagination={{
            current: currentPage,
            showSizeChanger: true,
            pageSize: pageSize,
            pageSizeOptions: [12, 18, 24],
            total: pageCount * pageSize,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
              updatePageSize(pageSize);
            },
            simple: true,
          }}
        >
          <Table.Column<Company>
            dataIndex="name"
            title="Company Title"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown
                {...props}
                confirm={() => {
                  handleConfirm(String(props.selectedKeys));
                  props.close();
                }}
                clearFilters={() => {
                  handleConfirm("");
                  props.close();
                  props.setSelectedKeys([]);
                }}
              >
                <Input placeholder="Search Company" />
              </FilterDropdown>
            )}
            render={(_, record) => (
              <Space>
                <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
                <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
              </Space>
            )}
          />
          <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Open deals amount"
            render={(_, company) => (
              <Text> {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}</Text>
            )}
          />
          <Table.Column<Company>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
};
