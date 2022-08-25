import {
  CheckOutlined,
  ExclamationCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import moment from 'moment';

export const BoatTag = ({ timestamp }: { timestamp?: string }) => {
  const getDiff = (timestamp: string, maxDiffInSeconds: number) => {
    return (
      moment(new Date(Date.now())).diff(
        moment.utc(timestamp).toISOString(),
        'seconds'
      ) > maxDiffInSeconds
    );
  };

  if (!timestamp || getDiff(timestamp, import.meta.env.VITE_MAX_ERROR_DIFF)) {
    return (
      <Tooltip title="No data">
        <ExclamationCircleOutlined style={{ color: 'red' }} />
      </Tooltip>
    );
  }

  if (getDiff(timestamp, import.meta.env.VITE_MAX_WRNING_DIFF)) {
    return (
      <Tooltip title="Data is outdated">
        <WarningOutlined style={{ color: 'yellow' }} />
      </Tooltip>
    );
  }

  return (
    <Tooltip title="Up to date">
      <CheckOutlined style={{ color: 'green' }} />
    </Tooltip>
  );
};
