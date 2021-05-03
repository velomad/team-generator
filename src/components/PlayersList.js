import React, { Component, useEffect, useState } from "react";
import Checkbox from "../Checkbox";
import Text from "./Text";

const PlayersList = (props) => {
  const [checkedItems, setCheckedItems] = useState(new Map());

  const handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;

    setCheckedItems((prevState) => {
      return new Map(prevState).set(item, isChecked);
    });
  };

  const clearAllCheckboxes = () => {
    const clearCheckedItems = new Map();
    setCheckedItems(clearCheckedItems);
  };

  useEffect(() => {
    props.setItems(checkedItems);
  }, [checkedItems]);

  const checkboxesToRender = props.players.map((item, index) => {
    return (
      <div key={index} className="py-1.5 ">
        <label>
          <Checkbox
            name={item.name}
            checked={checkedItems.get(item.name)}
            onChange={handleChange}
            type="checkbox"
          />
          <span className="ml-2">
            <Text variant="primary">{item.name}</Text>
          </span>
        </label>
      </div>
    );
  });

  return (
    <div>
      {checkboxesToRender}
      <p
        className="p-1.5 text-red-600 text-center py-2"
        onClick={clearAllCheckboxes}
      >
        clear all
      </p>
    </div>
  );
};

export default PlayersList;
