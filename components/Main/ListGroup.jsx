import React from 'react';
import Item from '../Ui/Item';

const ListGroup = ({ list, onClickHandler }) => {
  return list.map((item) => (
    <Item key={item.id} item={item} onClickHandler={onClickHandler} />
  ));
};

export default ListGroup;
