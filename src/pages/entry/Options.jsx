import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios';

import ScoopOption from './ScoopOption';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(({ data }) => setItems(data))
      .catch(err => {
        // TODO: handle error response
        console.log('err', err);
      });
  }, [optionType]);

  // TODO: replace `null` with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  const optionItems = items.map(item => <ItemComponent key={item.name} {...item} />);

  return <Row>{optionItems}</Row>;
}
