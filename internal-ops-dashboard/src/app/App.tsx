import { CustomerSummaryHeader } from '../components/customer/CustomerSummaryHeader';
import { mockCustomerSummary } from '../mock/customerSummary.mock';
import '../App.css';

function App() {

  return (
    <>
      <CustomerSummaryHeader customer={mockCustomerSummary}></CustomerSummaryHeader>
    </>
  )
}

export default App
