import '@/shared/fonts/fonts.scss';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store.ts';

function App() {
  return (
    <Provider store={store}>
      <div className="app">test</div>
    </Provider>
  );
}

export default App;
