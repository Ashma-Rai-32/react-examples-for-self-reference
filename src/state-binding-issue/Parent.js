import React, { useEffect, useState } from "react";
import _ from "lodash";

const getFields = () => {
  return [
    { id: 1, name: "text" },
    { id: 2, name: "select" },
  ];
};

const Parent = () => {
  const [fields, setFields] = useState([]);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const fields = getFields();
    console.log("fields", fields); // should log [{id: 1, name: "text"}, {id: 2, name: "select"}]
    const items = getListItems(fields);
    setFields(fields);
    setListItems(items);
  }, []);

  const handleEditClicked = (fieldId) => {
    console.log("handleEditClicked.fields", fields);
    const matchingField = _.find(fields, (field) => field.id === fieldId);
    console.log("matchingField", matchingField); // Check if this logs the correct field
    // rest of the code
  };

  const getListItems = (fields) => {
    let listItems = [];

    _.forEach(fields, (field) => {
      let t_data = {
        actions: [
          {
            name: "edit",
            label: "Edit",
            onClick: () => {
              console.log("INSIDE .fields", fields);
              const matchingField = _.find(fields, (f) => f.id === field.id);
              console.log("INSIDE matchingField", matchingField); // Check if this logs the correct field
              // rest of the code
            },
          },
        ],
      };
      listItems.push(t_data);
    });

    return listItems;
  };

  return (
    <MyComponent listItems={listItems} handleEditClicked={handleEditClicked} />
  );
};

const MyComponent = ({ listItems, handleEditClicked }) => {
  return (
    <div>
      <button onClick={() => handleEditClicked(1)}>Button Outside</button>
      {listItems.map((item, index) => (
        <div key={index}>
          <button onClick={() => item.actions[0].onClick()}>
            {item.actions[0].label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Parent;
