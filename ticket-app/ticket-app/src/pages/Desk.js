import { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Row, Typography, Button, Divider } from "antd";
import getUserStorage from "../helpers/getUserStorage";
import useHideMenu from "../hook/useHideMenu";
import { SocketContext } from "../context/socketContext";

const { Title, Text } = Typography;

const Desk = () => {
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);
  const history = useHistory();
  const [user] = useState(getUserStorage());
  useHideMenu(false);
  const handleLogout = () => {
    localStorage.clear();
    history.replace("/login");
  };

  const nextTicket = () => {
    socket.emit("next-ticket", user, (ticket) => {
      setTicket(ticket);
    });
  };
  if (!user.user || !user.desk) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.user}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type="success">{user.desk}</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={handleLogout}>
            Leave
            <CloseCircleOutlined />
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket && (
        <Row>
          <Col>
            <Text>You are attending ticket number: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
      <Row>
        <Col offset={18} span={6} align="right">
          <Button onClick={nextTicket} shape="round" type="primary">
            Next
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Desk;
