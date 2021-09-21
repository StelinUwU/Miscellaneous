import { useContext, useEffect, useState } from "react";
import { Typography, List, Col, Card, Tag, Divider, Row } from "antd";
import useHideMenu from "../hook/useHideMenu";
import { SocketContext } from "../context/socketContext";
import getLasts from "../helpers/getLasts";

const { Text, Title } = Typography;

const Queue = () => {
  useHideMenu(true);
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    socket.on("ticked-assigned", (assigneds) => {
      setTickets(assigneds);
    });
    return () => {
      socket.off("ticket-assigned");
    };
  }, [socket]);

  useEffect(() => {
    getLasts().then(setTickets);
  }, []);

  return (
    <>
      <Row>
        <Col span={12}>
          <Title level={1}>Serving customer </Title>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano">{item.user}</Tag>,
                    <Tag color="magenta">Desk: {item.desk}</Tag>,
                  ]}
                >
                  <Title>No.{item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>History</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">On desk: </Text>
                      <Tag color="magenta">{item.desk}</Tag>
                      <Text type="secondary">Agent: </Text>
                      <Tag color="volcano">{item.user}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default Queue;
