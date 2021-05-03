import React, { useState } from "react";
import Text from "./Text";
import teams from "../data/teams";

const Teams = (props) => {
  const [optionValue, setOptionValue] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const handleTeamClick = (labelValue, nameValue) => {
    setDropdown(false);
    props.setTeamLabel(labelValue, nameValue);
    setOptionValue(nameValue);
  };

  return (
    <div className="group block relative">
      <button
        onClick={() => setDropdown(true)}
        className=" w-full outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center"
      >
        <span className=" pr-1 flex-1">
          <Text variant="primary" size="sm" weight="700">
            {optionValue !== null ? optionValue : "Pick the team"}
          </Text>
        </span>
        <span>
          <svg
            className="fill-current h-4 w-4 transform group-hover:-rotate-180
              transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </button>
      <ul
        className={`${
          dropdown ? "block" : "hidden"
        } w-full  block bg-white border rounded-sm transform scale-0 group-hover:scale-100 
                 absolute transition duration-150 ease-in-out origin-top max-w-40 z-20`}
      >
        {teams.map((el, index) => (
          <li
            onClick={() => handleTeamClick(el.label, el.name)}
            key={index}
            className=" rounded-sm p-2 hover:bg-gray-100 text-left cursor-pointer"
          >
            <Text variant="primary" size="xs">
              {el.name}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
