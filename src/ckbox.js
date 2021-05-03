import React, { Component, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { useHistory, useLocation } from "react-router-dom";
import Text from "./Text";

const PlayersList = (props) => {
  const [checkedItems, setCheckedItems] = useState(new Map());

  const history = useHistory();

  // useEffect(() => {
  //   const custom = [
  //     ["check-box-2", true],
  //     ["check-box-1", true],
  //     ["check-box-4", true],
  //   ];

  //   setCheckedItems(new Map(custom));
  // }, []);

  const handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;

    setCheckedItems((prevState) => {
      return new Map(prevState).set(item, isChecked);
    });
  };

  // setCheckedItems((prevState) => ({
  //   checkedItems: prevState.checkedItems.set(item, isChecked),
  // }));

  // const  deleteCheckboxState = (name, checked) => {
  //   const updateChecked = typeof checked === "undefined" ? true : false;
  //   this.setState((prevState) =>
  //     prevState.checkedItems.set(name, updateChecked)
  //   );
  // };

  // const  clearAllCheckboxes = () => {
  //   const clearCheckedItems = new Map();
  //   this.setState({ checkedItems: clearCheckedItems });
  // };

  let ary = [];
  for (let [key, value] of checkedItems.entries()) {
    if (value === true) {
      ary.push(key);
    }
  }


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

  // const checkboxesDeleteHandlers = checkboxes.map((item) => {
  //   return (
  //     <span
  //       key={item.name}
  //       onClick={() =>
  //         this.deleteCheckboxState(
  //           item.name,
  //           this.state.checkedItems.get(item.name)
  //         )
  //       }
  //     >
  //       {item.name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
  //     </span>
  //   );
  // });

  return (
    <div>
      {checkboxesToRender}
      {/* <br /> {checkboxesDeleteHandlers} */}
      {/* <p onClick={this.clearAllCheckboxes}>clear all</p> */}
    </div>
  );
};

export default PlayersList;
