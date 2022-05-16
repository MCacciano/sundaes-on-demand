import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useOrderDetails } from '../contexts/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    if (!orderNumber) {
      axios
        .post('http://localhost:3030/order')
        .then(({ data }) => setOrderNumber(data.orderNumber))
        .catch(err => console.log('err', err));
    }
  }, [orderNumber]);

  // if (!orderNumber) return <h1>Loading</h1>;

  return (
    <div>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button
        variant='primary'
        type='button'
        onClick={() => {
          if (setOrderPhase) setOrderPhase('inProgress');

          resetOrder();
        }}
      >
        Create new order
      </Button>
    </div>
  );
}
