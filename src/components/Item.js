import React from "react";
import '../App.css';

const Item = ({ item }) => {

  return (
    <div className="item-container">
      {item.label}
    </div>
  );
};

export default React.memo(Item);
