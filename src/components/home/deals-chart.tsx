import { DollarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
import { useList } from "@refinedev/core";
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries";
import { mapDealsData } from "@/utils/helpers";
import React from "react";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardDealsChartQuery } from "@/graphql/types";

const DealsChart = () => {
  const { result } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: "dealStages",
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["WON", "LOST"],
      },
    ],
  });

  const dealData = React.useMemo(() => mapDealsData(result?.data), [result.data]);

  const config: AreaConfig = {
    data: dealData,
    xField: "timeText",
    yField: "value",
    isStack: false,
    seriesField: "state",
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetX: -6,
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) => `$${Number(v) / 1000}k`,
      },
    },
    tooltip: {
      formatter: (data) => ({ name: data.state, value: `$${Number(data.value) / 1000}k` }),
    },
  };

  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        header: {
          padding: "8px 16px",
        },
        body: {
          padding: "24px 24px 0 24px",
        },
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DollarOutlined />{" "}
          <Text
            size="sm"
            style={{
              marginLeft: "0.5rem",
            }}
          >
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsChart;
