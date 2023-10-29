import { deleteItem, query } from '@/apis/equipment';
import { Equipment, TableParams } from '@/types/equipment';
import { useRequest } from 'ahooks';
import { Button, message, Popconfirm, Space } from 'antd';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const EquipmentList: React.FC = () => {
  const columns: ColumnsType<Equipment> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'ID',
      render: (text, record) => <Link to={`detail/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'Model',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'Brand',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'Weight',
    },
    {
      title: 'Manufacture Date',
      dataIndex: 'manufactureDate',
      key: 'manufactureDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" href={`detail/${record.id}`}>
            Detail
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.id)}>
            <Button type="link" danger>
              Detele
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const { loading, data, refresh } = useRequest(query);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
  });

  const { loading: deleteLoading, run: onDelete } = useRequest((id: string) => deleteItem(id), {
    manual: true,
    onSuccess: () => {
      message.success('Delete successfully');
      refresh();
    },
  });

  const formatData = (data?: Equipment[]) => {
    return data?.map((x) => ({ key: x.id, ...x }));
  };

  const onChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination: { ...tableParams.pagination, ...pagination },
    });
  };

  return (
    <div className="container w-4/5">
      <Button type="primary" className="mb-2" href="/create">
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={formatData(data)}
        pagination={tableParams.pagination}
        onChange={onChange}
        bordered
        loading={loading || deleteLoading}
      ></Table>
    </div>
  );
};

export default EquipmentList;
