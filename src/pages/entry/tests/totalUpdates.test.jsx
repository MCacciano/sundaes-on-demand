import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when the scoops change', async () => {
  render(<Options optionType='scoops' />);

  // make sure total starts out at $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when the toppings change', async () => {
  render(<Options optionType='toppings' />);

  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  const fudgeCheckbox = await screen.findByRole('checkbox', { name: /hot fudge/i });
  userEvent.click(fudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  userEvent.click(fudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    expect(grandTotal).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    userEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('3.50');

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('2.00');
  });
});
