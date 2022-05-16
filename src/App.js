import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  return (
    <Container>
      <OrderDetailsProvider>
        {orderPhase === 'inProgress' && <OrderEntry setOrderPhase={setOrderPhase} />}
        {orderPhase === 'review' && <OrderSummary setOrderPhase={setOrderPhase} />}
        {orderPhase === 'complete' && <OrderConfirmation setOrderPhase={setOrderPhase} />}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
