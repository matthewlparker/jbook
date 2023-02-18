import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import CellList from './components/cell-list';
import { store } from './state';

const container = document.querySelector('#root');
const root = createRoot(container!);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

root.render(<App />);
