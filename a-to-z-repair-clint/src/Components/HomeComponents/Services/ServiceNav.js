import React from "react";
import "./Services.css";

const ServiceNav = ({ filterItem, menuList }) => {
  return (
    <>
      <nav className="ServiceNav">
        <div className="btn-group">
          {menuList.map((curElem) => {
            return (
              <button
                className="btn-group__item"
                onClick={() => filterItem(curElem)}>
                {curElem}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default ServiceNav;