import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Row justify="center">
      <Space
        direction="vertical"
        size="middle"
        style={{ display: 'flex', margin: '1rem', width: '50vw' }}
      >
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('layoutStyle')}
          block
        >
          {t('test1Title')}
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/myForm')}
          block
        >
          {t('test2Title')}
        </Button>
      </Space>
    </Row>
  );
}
