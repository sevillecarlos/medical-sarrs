import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";

import { useAppDispatch } from "../../store/hook";

import { fetchInventory } from "../../store/slices/inventory";
const AddMedicalSupply = (props: any) => {
  const dispatch = useAppDispatch();
  const [itemForm, setItemForm] = useState({
    name: "",
    quantity: 0,
    detail: "",
    category_id: "",
  });
  const [errorUniqueName, setErrorUniqueName] = useState(false);

  const { inventory, showModalAdd, setShowModalAdd } = props;

  const changeItemForm = (e: any) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
  };

  const changeItemFormName = (e: any) => {
    const { value, name } = e.target;

    const lowCaseValue = value.toLowerCase();

    const checkNameExist = inventory.items.filter((v: any) => {
      return v.name.toLowerCase() === lowCaseValue;
    });
    if (checkNameExist.length !== 0) {
      setErrorUniqueName(true);
      setItemForm((prevState) => {
        return { ...prevState, [name]: "" };
      });
    } else {
      setErrorUniqueName(false);
      setItemForm((prevState) => {
        return { ...prevState, [name]: lowCaseValue };
      });
    }
  };

  const addSupply = (e: any) => {
    e.preventDefault();
    dispatch(fetchInventory(itemForm));
    handleCloseAdd();
    setErrorUniqueName(false);
    setItemForm({
      name: "",
      quantity: 0,
      detail: "",
      category_id: "",
    });
  };

  const handleCloseAdd = () => {
    setShowModalAdd(false);
    setErrorUniqueName(false);
  };

  return (
    <Modal
      show={showModalAdd}
      className="modal-add-supply"
      onHide={handleCloseAdd}
      backdrop="static"
      contentClassName="modal-add-supply-content"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Medical Supply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addSupply} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="form-input-add-supply"
              type="text"
              onChange={changeItemFormName}
              name="name"
              placeholder="Enter name of the item"
            />
            {errorUniqueName ? (
              <Form.Text className="error-name">
                Name already exist, try write the name more specific
              </Form.Text>
            ) : (
              <Form.Text>The name need to be unique in the inventory</Form.Text>
            )}
          </Form.Group>
          <Form.Select
            className="form-input-add-supply"
            onChange={changeItemForm}
            name="category_id"
            required={true}
          >
            <option>Select Category</option>

            {inventory.categories?.map((v: { id: number; name: string }) => {
              return (
                <option key={v.id} value={v.id}>
                  {v.name.toUpperCase()}
                </option>
              );
            })}
          </Form.Select>
          <br />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              min={0}
              onChange={changeItemForm}
              name="quantity"
              type="number"
              className="form-input-add-supply"
              placeholder="Enter quantity of the item"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              onChange={changeItemForm}
              className="form-input-add-supply"
              placeholder="Enter a detail of the item"
              name="detail"
              style={{ height: "100px" }}
            />
          </Form.Group>
          <Button
            type="submit"
            className="add-supply-btn"
            disabled={!Object.values({ ...itemForm }).every((v: any) => v)}
          >
            Add Supply
            <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMedicalSupply;