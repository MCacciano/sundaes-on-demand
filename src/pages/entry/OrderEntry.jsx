import { Button } from 'react-bootstrap';

import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const handleOrder = async () => {
    if (setOrderPhase) setOrderPhase('review');
  };

  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>

      <Button variant='primary' type='button' onClick={handleOrder}>
        Order Sundae!
      </Button>
    </div>
  );
}
