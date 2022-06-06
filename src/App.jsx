import { BrowserRouter} from 'react-router-dom'
import Pages from './components/pages';

export default function App() {
  return (
    <BrowserRouter>
      <Pages/>
    </BrowserRouter>
  );
}