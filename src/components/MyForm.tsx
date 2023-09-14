import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { UserData, resetMyFormData } from '../redux/myFormSlice';
import {
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Space,
  Button,
} from 'antd';
import { createUserData, editUserData } from '../redux/userDataSlice';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface FormData {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: moment.Moment; // Assuming you want to keep it as a string
  nationality: string;
  idCard1: string;
  idCard2: string;
  idCard3: string;
  idCard4: string;
  idCard5: string;
  gender: string;
  phone1: string;
  phone2: string;
  idPassport: string;
  expectedIncome: string;
}
const userDataToFormData = (userData: UserData): FormData => {
  return {
    title: userData.title,
    firstName: userData.firstName,
    lastName: userData.lastName,
    dateOfBirth: userData.dateOfBirth
      ? moment(userData.dateOfBirth, 'YYYY-MM-DD')
      : moment(), // Use moment with format
    nationality: userData.nationality,
    idCard1: userData.idCard?.[0] || '',
    idCard2: userData.idCard?.[1] || '',
    idCard3: userData.idCard?.[2] || '',
    idCard4: userData.idCard?.[3] || '',
    idCard5: userData.idCard?.[4] || '',
    gender: userData.gender,
    phone1: userData.phone[0],
    phone2: userData.phone[1],
    idPassport: userData.idPassport || '',
    expectedIncome: userData.expectedIncome,
  };
};

export default function MyForm() {
  const dispatch = useDispatch();
  const myFormData: UserData = useSelector((state: RootState) => state.myForm);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldsValue(userDataToFormData(myFormData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myFormData]);

  const onFinish = (values: FormData) => {
    const submitData: UserData = {
      user_id: myFormData.user_id,
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
      nationality: values.nationality,
      idCard: [
        values.idCard1,
        values.idCard2,
        values.idCard3,
        values.idCard4,
        values.idCard5,
      ],
      gender: values.gender,
      phone: [values.phone1, values.phone2],
      idPassport: values.idPassport,
      expectedIncome: values.expectedIncome,
    };

    if (myFormData.user_id === '') {
      dispatch(createUserData(submitData));
    } else {
      dispatch(editUserData(submitData));
    }
    dispatch(resetMyFormData());
  };

  const onReset = () => {
    dispatch(resetMyFormData());
  };

  return (
    <Form
      form={form}
      labelAlign="left"
      style={{
        maxWidth: '100%',
        margin: '1rem',
        padding: '1rem',
        border: '1px solid #ffa200',
        borderRadius: '10px',
      }}
      onFinish={onFinish}
      initialValues={myFormData}
    >
      <Row>
        <Col span={4} style={{ marginRight: '1rem' }}>
          <Form.Item
            label={t('titleField')}
            name="title"
            rules={[{ required: true, message: t('pleaseEnterWarning') }]}
          >
            <Select style={{ width: '100%' }}>
              <Select.Option value="Mr.">{t('titleValue_mr')}</Select.Option>
              <Select.Option value="Ms.">{t('titleValue_ms')}</Select.Option>
              <Select.Option value="Mrs.">{t('titleValue_mrs')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} style={{ marginRight: '1rem' }}>
          <Form.Item
            label={t('firstNameField')}
            name="firstName"
            rules={[{ required: true, message: t('pleaseEnterWarning') }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('lastNameField')}
            name="lastName"
            rules={[{ required: true, message: t('pleaseEnterWarning') }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item
            label={t('birthDateField')}
            name="dateOfBirth"
            rules={[{ required: true, message: t('pleaseEnterWarning') }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('nationalityField')}
            name="nationality"
            rules={[{ required: true, message: t('pleaseEnterWarning') }]}
          >
            <Select>
              <Select.Option value="thai">
                {t('nationality_thai')}
              </Select.Option>
              <Select.Option value="other">
                {t('nationality_others')}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label={t('idCardField')} style={{ margin: '0' }}>
        <Row style={{ display: 'flex', flexDirection: 'row' }}>
          <Col span={1}>
            <Form.Item
              name="idCard1"
              initialValue={myFormData.idCard?.[0] ?? ''}
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: '',
                },
              ]}
            >
              <Input maxLength={1} />
            </Form.Item>
          </Col>
          <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {'-'}
          </Col>
          <Col span={4}>
            <Form.Item
              name="idCard2"
              initialValue={myFormData.idCard?.[1] ?? ''}
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: '',
                },
              ]}
            >
              <Input maxLength={4} />
            </Form.Item>
          </Col>
          <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {'-'}
          </Col>
          <Col span={5}>
            <Form.Item
              name="idCard3"
              initialValue={myFormData.idCard?.[2] ?? ''}
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: '',
                },
              ]}
            >
              <Input maxLength={5} />
            </Form.Item>
          </Col>
          <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {'-'}
          </Col>
          <Col span={2}>
            <Form.Item
              name="idCard4"
              initialValue={myFormData.idCard?.[3] ?? ''}
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: '',
                },
              ]}
            >
              <Input maxLength={2} />
            </Form.Item>
          </Col>
          <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {'-'}
          </Col>
          <Col span={1}>
            <Form.Item
              name="idCard5"
              initialValue={myFormData.idCard?.[4] ?? ''}
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: '',
                },
              ]}
            >
              <Input maxLength={1} />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Row>
        <Form.Item
          label={t('genderField')}
          name="gender"
          rules={[{ required: true, message: t('pleaseEnterWarning') }]}
        >
          <Radio.Group value={myFormData.gender}>
            <Radio value="male"> {t('gender_male')} </Radio>
            <Radio value="female"> {t('gender_female')} </Radio>
            <Radio value="non-specific"> {t('gender_notSpecific')} </Radio>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label={t('phoneNumberField')} style={{ margin: '0' }}>
          <Space.Compact>
            <Col span={8}>
              <Form.Item name="phone1" initialValue={myFormData.phone[0]}>
                <Select>
                  <Select.Option value="+66">+66</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Form.Item name="phone2" initialValue={myFormData.phone[1]}>
              <Input maxLength={10} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label={t('passportField')} name="idPassport">
          <Input />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label={t('expectIncomeField')}
          name="expectedIncome"
          rules={[{ required: true, message: t('pleaseEnterWarning') }]}
        >
          <Input />
        </Form.Item>
      </Row>
      <Form.Item label="" style={{ margin: '0' }}>
        <Space>
          <Button type="primary" htmlType="submit">
            {myFormData.user_id === '' ? t('submitButtton') : t('editButtton')}
          </Button>
          <Button type="default" danger onClick={onReset}>
            {t('resetButton')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
