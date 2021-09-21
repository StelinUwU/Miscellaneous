import { DownloadOutlined } from "@ant-design/icons";
import { Col, Row, Typography, Button } from "antd";
import { useContext, useState } from "react";
import useHideMenu from "../hook/useHideMenu";
import { SocketContext } from "../context/socketContext";

const { Title, Text } = Typography;

const CreateTicket = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const newTicket = () => {
    socket.emit("get-tickets", null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>Press the button to generate a new ticket</Title>
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={newTicket}
          >
            New Ticket
          </Button>
        </Col>
      </Row>
      {ticket && (
        <Row style={{ marginTop: "100px" }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Your number</Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CreateTicket;
