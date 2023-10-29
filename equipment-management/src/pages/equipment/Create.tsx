import { create } from '@/apis/equipment';
import { dateFormat, Equipment } from '@/types/equipment';
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { App, Button, DatePicker, Form, FormProps, Input, Space } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

type LayoutProp = Pick<FormProps, 'labelCol' | 'wrapperCol'>;
const formItemLayout: LayoutProp = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const buttonItemLayout: LayoutProp = {
  wrapperCol: { offset: 8, span: 14 },
};

const EquipmentCreator: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { message, modal } = App.useApp();
  const { loading, run } = useRequest(create, {
    manual: true,
    onSuccess: (data: Equipment) => {
      message.success('Create successfully');
      navigate(`/detail/${data.id}`);
    },
  });
  const reset = () => {
    form.resetFields();
  };
  const onSave = (equipment: Equipment) => {
    run({ ...equipment, manufactureDate: dayjs(equipment.manufactureDate).format(dateFormat) });
  };

  const onBack = () => {
    if (form.isFieldsTouched()) {
      modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: 'Your input are not saved yet. Do you confirm to back?',
        okText: 'Sure',
        cancelText: 'Cancel',
        onOk: () => navigate('/'),
      });
    } else {
      navigate('/');
    }
  };
  return (
    <div className="container w-2/5">
      <Form form={form} {...formItemLayout} onFinish={onSave} className="border rounded">
        <div className="px-6 py-4 flex text-xl antialiased font-bold">
          <ArrowLeftOutlined onClick={onBack} />
          <div className="m-auto">Create</div>
        </div>
        <Form.Item<Equipment> label="Model" name="model" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item<Equipment> label="Brand" name="brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item<Equipment> label="Weight" name="weight" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item<Equipment>
          label="Manufacture Date"
          name="manufactureDate"
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" format={dateFormat} />
        </Form.Item>

        <Form.Item {...buttonItemLayout}>
          <Space align="end" className="w-full">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={reset} loading={loading}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EquipmentCreator;
