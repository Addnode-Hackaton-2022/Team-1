import {
  CheckOutlined,
  ExclamationCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  InputNumber,
  notification,
  Row,
  Space,
  Statistic
} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { BoatTag } from './BoatTag';
import { setAttribute, useFetchBoatsById } from './utils/api';
import { BoatAttributeTypes, TBoatAttributes } from './utils/boatArrayMock';

export const Boat = ({ boatId }: { boatId: string }) => {
  const boatQuery = useFetchBoatsById(boatId);
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm<{ level: string }>();

  if (boatQuery.isLoading) return <div>Loading...</div>;

  if (!boatQuery.data) return <div>No boat found</div>;

  const tankLevel: TBoatAttributes | undefined =
    boatQuery.data[0].boatAttributes.find(
      attribute => attribute.type === BoatAttributeTypes.TankLevel
    );
  const alarmLevel: TBoatAttributes | undefined =
    boatQuery.data[0].boatAttributes.find(
      attribute => attribute.type === BoatAttributeTypes.AlarmLevel
    );

  const onSubmit = async (values: { level: string }) => {
    if (!values.level) return;

    try {
      await setAttribute(
        boatQuery.data[0].id,
        values.level.toString(),
        BoatAttributeTypes.AlarmLevel,
        moment.utc().toISOString()
      );
      notification.success({
        message: `Alarm level set to ${values.level}`
      });
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <h2>
            {boatQuery.data[0].id}{' '}
            <BoatTag timestamp={boatQuery.data[0].timestamp} />
          </h2>
        </Col>
        <Col span={12}>
          <Statistic
            title="Fuel"
            value={tankLevel?.value}
            suffix={
              <Space>
                %<BoatTag timestamp={tankLevel?.timestamp} />
              </Space>
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Alarm level"
            value={alarmLevel?.value}
            precision={2}
            suffix={
              <Space>
                %<BoatTag timestamp={alarmLevel?.timestamp} />
              </Space>
            }
          />

          <Form
            initialValues={{ level: alarmLevel?.value }}
            form={form}
            layout="inline"
            onFinish={onSubmit}
          >
            {!edit && (
              <Button
                onClick={() => setEdit(true)}
                style={{ marginTop: 16 }}
                type="primary"
              >
                Edit
              </Button>
            )}
            {edit && (
              <>
                <Form.Item name="level" label="New level">
                  <InputNumber min={0} max={100} />
                </Form.Item>
                <Space>
                  <Button onClick={() => setEdit(false)}>Cancel</Button>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Space>
              </>
            )}
          </Form>
        </Col>
      </Row>
      <Divider />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum et
        accusamus dicta nesciunt, cupiditate aperiam sunt placeat qui doloremque
        sequi omnis enim repellat in non labore porro vel ipsam itaque?
      </p>
      <ul style={{ listStyle: 'none', marginLeft: -15 }}>
        <li style={{ padding: '0.5em' }}>
          <Space>
            <CheckOutlined style={{ color: 'green' }} />{' '}
            <span>
              Data is not older than {import.meta.env.VITE_MAX_WARNING_DIFF}{' '}
              seconds
            </span>
          </Space>
        </li>
        <li style={{ padding: '0.5em' }}>
          <Space>
            <WarningOutlined style={{ color: 'yellow' }} />{' '}
            <span>
              Data is older than {import.meta.env.VITE_MAX_WARNING_DIFF} seconds
              but not older than {import.meta.env.VITE_MAX_ERROR_DIFF} seconds
            </span>
          </Space>
        </li>
        <li style={{ padding: '0.5em' }}>
          <Space>
            <ExclamationCircleOutlined style={{ color: 'red' }} />{' '}
            <span>
              Data is older than {import.meta.env.VITE_MAX_ERROR_DIFF} seconds
            </span>
          </Space>
        </li>
      </ul>
    </div>
  );
};
