import { CalendarOutlined, CalendarTwoTone } from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import { Text } from "../text";
import { UpcomingEventsSkeleton } from "../skeletons";
import { getDate } from "@/utils/helpers";
import { useList } from "@refinedev/core";
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries";

const UpcomingEvents = () => {
  const { result, query } = useList({
    resource: "events",
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: "startDate",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "startDate",
        operator: "gte",
        value: new Date().toISOString(),
      },
    ],
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        header: { padding: "8px 16px" },
        body: {
          padding: "0 1rem",
        },
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarOutlined />{" "}
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Upcoming Events
          </Text>
        </div>
      }
    >
      {query.isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({ id: index }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={result.data}
          locale={{
            emptyText: (
              <div
                style={{
                  height: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  gap: 5,
                }}
              >
                <CalendarTwoTone />
                No Upcoming Events
              </div>
            ),
          }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge color={item.color} />}
                title={<Text size="xs">{getDate(item.startDate, item.endDate)}</Text>}
                description={
                  <Text ellipsis={{ tooltip: true }} strong>
                    {item.title}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default UpcomingEvents;
