import { ConfigProvider } from 'antd';

const ConfigAntd = (props: { children: JSX.Element }) => (
  <ConfigProvider
    theme={{
      components: {
        Pagination: {
          itemActiveBg: '#1890FF',
          itemBg: 'none',
          colorPrimary: '#fff',
          colorPrimaryHover: '#fff',
          colorText: '#262626',
          fontWeightStrong: 400,
          fontFamily: 'InterUI',
        },
      },
    }}
  >
    {props.children}
  </ConfigProvider>
);

export default ConfigAntd;
