import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Button, Dropdown, message, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const LanguageList: MenuProps['items'] = [
  {
    label: 'English',
    key: 'en',
  },
  {
    label: 'ภาษาไทย',
    key: 'th',
  },
];

export default function MyHeader() {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const onClickChangeLanguage: MenuProps['onClick'] = ({ key }) => {
    i18n.changeLanguage(key);
    message.info(t('changingLanguage'));
  };

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '3rem',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{ float: 'left' }}>
        {location.pathname === '/' ? (
          <></>
        ) : (
          <Button style={{ marginRight: '1rem' }} onClick={() => navigate('/')}>
            <Space>{t('back')}</Space>
          </Button>
        )}

        {location.pathname === '/layoutStyle'
          ? t('test1Title')
          : location.pathname === '/myForm'
          ? t('test2Title')
          : t('headertitle')}
      </div>
      <div style={{ float: 'right', marginLeft: '1rem' }}>
        <Space>
          <Dropdown
            menu={{ items: LanguageList, onClick: onClickChangeLanguage }}
          >
            <Button>
              <Space>
                {t('chagneLanguage')}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
}
