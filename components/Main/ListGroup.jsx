import React from 'react';
import Item from '../Ui/Item';

const ListGroup = ({ list }) => {
  return list.map((item) => <Item key={item.id} item={item} />);
};

export default ListGroup;
