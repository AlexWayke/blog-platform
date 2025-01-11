import '@/shared/fonts/fonts.scss';
import './App.scss';
import { Provider } from 'react-redux';
import AppRouter from './router/index.ts';
import store from './store.ts';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
