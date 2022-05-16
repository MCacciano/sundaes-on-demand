import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoops = [...orderDetails.scoops];
  const toppings = [...orderDetails.toppings.keys()];

  console.log('orderDetails.scoops', orderDetails.scoops);

  return (
    <div>
      <h1>Order Summary</h1>
      {scoops.length > 0 && (
        <>
          <h2>Scoops: {orderDetails.totals.scoops}</h2>
          <ul className='list-disc'>
            {scoops.map(([scoop, quantity]) => {
              return (
                <li key={scoop}>
                  {quantity} {scoop}
                </li>
              );
            })}
          </ul>
        </>
      )}
      {toppings.length > 0 && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul className='list-disc'>
            {toppings.map(topping => {
              return <li key={topping}>{topping}</li>;
            })}
          </ul>
        </>
      )}
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
