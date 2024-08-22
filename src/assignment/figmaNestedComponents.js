import { css } from "@emotion/css";
import React, { useRef, useState } from "react";

const Assignment = (props) => {
  const data = [
    {
      id: 1,
      title: "Title1",
      children: [
        {
          id: 1.1,
          title: "Children",
          children: [
            {
              id: 1.12,
              title: "nested child 12",
              children: [{ id: 1.123, title: "grandchild" }],
            },
          ],
        },
      ],
    },
    { id: 2, title: "Title2", children: [{ id: 2.1, title: "Children" }] },
    { id: 3, title: "Title3", children: [{ id: 3.1, title: "Children" }] },
  ];

  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hiddenItems, setHiddenItems] = useState([]);

  const renderItems = (data) => {
    return data.map((item, index) => {
      //   if (hiddenItems.includes(Math.floor(item.id))) return null;
      return (
        <div
          key={index}
          className={css({
            paddingLeft: "1rem",
            // borderLeft: "1px solid black",
            ...(hoveredItem === item.id ? { border: "1px solid #ff9e9e" } : {}),
            ...(activeItem === item.id ? { backgroundColor: "#ff9e9eee" } : {}),
          })}
          onClick={(e) => {
            // e.stopPropagation();
            e.preventDefault();
            setActiveItem(item.id);
          }}
        >
          <div
            className={css({
              "&:hover": {
                backgroundColor: "#eeeeeeee",
              },
            })}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>{item.title}</div>
            <div
              className="icon"
              style={{
                padding: "0.5rem",
              }}
              onClick={(e) => {
                e.stopPropagation();

                let allHiddenItems = hiddenItems;

                if (hiddenItems.includes(item.id)) {
                  console.log(item.id, " ALREADY HIDDEN");

                  //already has the item so remove it.
                  const newArray = hiddenItems.filter((tempItem) => {
                    console.log("👾 | INSIDE FILTER:", tempItem, item.id);

                    if (tempItem === item.id) {
                      //   console.log("do not return");
                      return false;
                    } else return true;
                  });

                  allHiddenItems = newArray;
                } else {
                  //does not already have the item so push it
                  console.log("SIMPLY PUSH THE NEW ITEM");
                  allHiddenItems = [...allHiddenItems, item.id];
                }

                console.log("FINAL ALLHIDDEN:", allHiddenItems);
                setHiddenItems(allHiddenItems);
              }}
            >
              {hiddenItems.includes(item.id) ? "hidden" : "visible"}
            </div>
          </div>
          {item.children && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              --{renderItems(item.children)}
            </div>
          )}
        </div>
      );
    });
  };

  const renderItemsAsComponents = (data) => {
    // console.log("👾 | CHECK DATA:", data);

    return data
      .filter((item) => !hiddenItems.includes(item.id))
      .map((item, index) => {
        //   if (
        //     hiddenItems.includes(Math.floor(item.id)) ||
        //     hiddenItems.includes(item.id)
        //   )
        //     return null;

        return (
          <div
            key={index}
            className={css({
              padding: "1rem",
              border: "1px solid black",
              ...(activeItem === item.id
                ? { backgroundColor: "#ff9e9eee" }
                : {}),
            })}
            onClick={(e) => {
              e.stopPropagation();
              // e.preventDefault();
              setActiveItem(item.id);
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              // console.log("onmouseover", e, item.id);
              setHoveredItem(item.id);
            }}
            onMouseLeave={(e) => {
              setHoveredItem(null);
            }}
          >
            {item.title}
            {item.children && (
              <div
                style={{
                  padding: "1rem",
                }}
              >
                {renderItemsAsComponents(item.children)}
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <div
      style={{
        display: "grid",
        fontSize: "1.25rem",
        gap: "1rem",
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <div
        style={{
          left: "0px",
          //   width: "200px",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        {renderItems(data)}
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          border: "1px solid black",
          padding: "1rem",
        }}
      >
        {renderItemsAsComponents(data)}
      </div>
    </div>
  );
};

export default Assignment;
