import { DoubleRightOutlined, GlobalOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space
} from 'antd';
import { useState } from 'react';
import { Boat } from './Boat';
import { BoatList } from './BoatList';
import { BoatMapWrapper } from './BoatMap';

function App() {
  const [activeBoat, setActiveBoat] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm<{ ids: string }>();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async (values: { ids: string }) => {
    if (!values.ids) return;

    try {
      //TODO
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row justify="center">
      <Col span={20}>
        <Row justify="center">
          <h1>SSRS Boats</h1>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Card>
              <Form form={form} onFinish={onSubmit} layout="horizontal">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      whitespace: false
                    }
                  ]}
                  label="Boat ids"
                  name="ids"
                >
                  <Input />
                </Form.Item>
                <Row justify="end">
                  <Space>
                    <Button onClick={showModal} icon={<GlobalOutlined />}>
                      Open map
                    </Button>
                    <Button
                      icon={<DoubleRightOutlined />}
                      type="primary"
                      htmlType="submit"
                    >
                      Get boats
                    </Button>
                  </Space>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col span={16}>
            <Card>
              <BoatList
                onActiveBoatCallback={(boatId: string) => setActiveBoat(boatId)}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        {!activeBoat && <p>No boat selected</p>}

        {activeBoat && (
          <Card>
            <Boat boatId={activeBoat} />
          </Card>
        )}
      </Col>
      <Modal
        width={1000}
        centered
        cancelButtonProps={{ disabled: true, style: { visibility: 'hidden' } }}
        title="Boat map"
        visible={isModalVisible}
        onOk={handleOk}
      >
        <div style={{ height: '70vh' }}>
          <BoatMapWrapper />
        </div>
      </Modal>
    </Row>
  );
}

export default App;
