import { AppLayout } from '../components/layout/AppLayout';
import { CustomerPage } from '../components/pages/CustomerPage';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
// Main application component that uses AppLayout to wrap pages
  return (
    <AppLayout>
      <CustomerPage />
    </AppLayout>
  )
}

export default App
