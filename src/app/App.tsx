import '@/shared/fonts/fonts.scss';
import './App.scss';
import { Provider } from 'react-redux';
import AppRouter from './router/index.ts';
import store from './store.ts';
import ConfigAntd from './config/configProvider.tsx';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <ConfigAntd>
          <AppRouter />
        </ConfigAntd>
      </div>
    </Provider>
  );
}

export default App;
