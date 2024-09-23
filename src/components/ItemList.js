import React from 'react';
import Item from './Item';

const ItemList = ({items}) => {
  
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', margin: '20px', alignItems: 'center', justifyContent: 'space-around'}}>
      {items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

export default React.memo(ItemList); 
