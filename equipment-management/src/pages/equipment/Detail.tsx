import { detail, update } from '@/apis/equipment';
import { dateFormat, Equipment } from '@/types/equipment';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRequest, useToggle } from 'ahooks';
import { Button, DatePicker, Descriptions, Form, Input, message, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const renderDescription = (isEdit: boolean, equipment?: Equipment) => {
  if (!equipment) return undefined;
  // const descriptionItem: DescriptionsItemType = {
  //   key: item,
  //   label: item[0].toUpperCase() + item.substring(1),
  //   children: '',
  // };
  return (
    <>
      <Descriptions.Item label="ID">
        <span>{equipment.id}</span>
      </Descriptions.Item>
      <Descriptions.Item label="Model">
        {!isEdit ? (
          <span>{equipment.model}</span>
        ) : (
          <Form.Item className="mb-0" name="model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Brand">
        {!isEdit ? (
          <span>{equipment.brand}</span>
        ) : (
          <Form.Item className="mb-0" name="brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Weight">
        {!isEdit ? (
          <span>{equipment.weight}</span>
        ) : (
          <Form.Item className="mb-0" name="weight" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Manufacture Date">
        {!isEdit ? (
          <span>{dayjs(equipment.manufactureDate).format(dateFormat)}</span>
        ) : (
          <Form.Item className="mb-0" name="manufactureDate" rules={[{ required: true }]}>
            <DatePicker className="w-2/5" format={dateFormat} />
          </Form.Item>
        )}
      </Descriptions.Item>
    </>
  );
};

const EquipmentDetail = () => {
  const { id = '' } = useParams<string>();
  const navigate = useNavigate();
  const [ready] = useToggle(!!id);
  const [form] = Form.useForm<Equipment>();
  const [isEdit, setIsEdit] = useState(false);

  const { data, refresh } = useRequest(() => detail(id), {
    ready,
    refreshDeps: [id],
  });

  const { run, loading } = useRequest((id: string, equipment: Equipment) => update(id, equipment), {
    manual: true,
    onSuccess: () => {
      message.success('Update successfully!');
      setIsEdit(false);
      refresh();
    },
  });

  const edit = () => {
    form.setFieldsValue({
      ...data,
      ...{ manufactureDate: dayjs(data?.manufactureDate) },
    });
    setIsEdit(true);
  };

  const save = () => {
    const value = form.getFieldsValue();
    run(id, { ...value, manufactureDate: dayjs(value.manufactureDate).format(dateFormat) });
  };

  return (
    <div className="container w-4/5">
      <Form form={form} component={false}>
        <Descriptions
          title={
            <div className="flex justify-between">
              <div className="h-32px ">
                <ArrowLeftOutlined onClick={() => navigate(-1)} />
                <div className="inline-block ml-2">Detail</div>
              </div>
              {!isEdit ? <Button onClick={edit}>编辑</Button> : ''}
            </div>
          }
          column={2}
          bordered
        >
          {renderDescription(isEdit, data)}
        </Descriptions>
        {isEdit && (
          <Space align="end" className="w-full mt-2 justify-end">
            <Button type="primary" onClick={save} loading={loading}>
              Save
            </Button>
            <Button onClick={() => setIsEdit(false)}>Cancel</Button>
          </Space>
        )}
      </Form>
    </div>
  );
};
export default EquipmentDetail;
