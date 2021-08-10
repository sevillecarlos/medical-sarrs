import React, { Children, useState } from "react";
import {
  Table,
  Button,
  FormControl,
  Form,
  Modal,
  InputGroup,
  Alert,
  Dropdown,
} from "react-bootstrap";

import "./style/DropDownFilter.css";

const DropDownFilter = (props) => {
  const { patients } = props;

  const [dropdownValue, setDropDownValue] = useState("Select Patient");

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      className="filter-patient"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </Button>
  ));

  console.log(dropdownValue);

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            autoComplete="off"
            className="mx-3 my-2 w-auto filter-control-patients"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className=" patients-list">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {dropdownValue}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} className="menu">
        {patients?.map((v) => {
          const fullName = `${v.first_name} ${v.last_name} |  ${v.patient_id}`;
          return (
            <Dropdown.Item
              key={v.id}
              onClick={(e) => setDropDownValue(e.target.innerText)}
            >
              {fullName}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownFilter;
