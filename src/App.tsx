import './App.scss';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyHeader from './components/MyHeader';
import LayoutStyle from './components/LayoutStyle';
import FormPage from './components/FormPage';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store
import './i18n';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#ffa200',
              borderRadius: 10,
              controlItemBgHover: '#ffa200',
            },
            components: {
              Layout: {
                headerBg: '#6eda78',
              },
            },
          }}
        >
          <MyHeader />
          <Routes>
            <Route path={'/'} key={'/'} element={<Home />} />
            <Route
              path={'/layoutStyle'}
              key={'/layoutStyle'}
              element={<LayoutStyle />}
            />
            <Route path={'/myForm'} key={'/myForm'} element={<FormPage />} />
          </Routes>
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  );
}
