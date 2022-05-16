import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  // render the app
  render(<App />);

  // add scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const chocolateInput = screen.getByRole('spinbutton', { name: /chocolate/i });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const cherryCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
  userEvent.click(cherryCheckbox);

  // find and click the order button
  const orderBtn = screen.getByRole('button', { name: /order sundae/i });

  userEvent.click(orderBtn);

  // check summary info based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const termsAndConditionsCheckbox = screen.getByRole('checkbox');
  userEvent.click(termsAndConditionsCheckbox);

  const confirmOrderBtn = screen.getByRole('button', { name: /confirm order/i });
  userEvent.click(confirmOrderBtn);

  const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByRole('heading', {
    name: /order number/i,
  });
  expect(orderNumber).toBeInTheDocument();

  // click the new order button on the confirmation page
  const newOrderBtn = screen.getByRole('button', { name: /create new order/i });
  userEvent.click(newOrderBtn);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();

  const toppingsSubtotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsSubtotal).toBeInTheDocument();
});
