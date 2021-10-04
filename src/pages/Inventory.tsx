import React, { useState, useEffect } from "react";
import { Table, Button, FormControl, Form, Modal } from "react-bootstrap";
import "./style/Inventory.css";
import { GrFormAdd } from "react-icons/gr";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  fetchInventoryCategories,
  fetchInventory,
  fetchInventoryItems,
} from "../store/slices/inventory";

import { nameFormat } from "../helpers/nameFormt";

const Inventory = () => {
  const dispatch = useDispatch();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showQuickChange, setShowQuickChange] = useState(true);

  const [itemForm, setItemForm] = useState({
    name: "",
    quantity: 0,
    detail: "",
    category_id: 0,
  });

  const inventory = useSelector((state: RootStateOrAny) => state.inventory);

  const changeItemForm = (e: any) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
  };

  const addSupply = (e: any) => {
    e.preventDefault();
    dispatch(fetchInventory(itemForm));
    handleCloseAdd();
  };

  useEffect(() => {
    dispatch(fetchInventoryCategories());
    dispatch(fetchInventoryItems());
  }, [dispatch]);

  const getCategoryName = (id: number) => {
    const category: any = inventory.categories?.filter((v: any) => v.id === id);
    if (category) {
      const { name } = category[0];
      return name.toUpperCase();
    }
  };

  const handleCloseAdd = () => setShowModalAdd(false);
  return (
    <div>
      <Modal
        show={showModalAdd}
        className="modal-add-supply"
        onHide={handleCloseAdd}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Medical Supply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addSupply}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                onChange={changeItemForm}
                name="name"
                placeholder="Enter name of the item"
              />
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
                min={1}
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
            <Button type="submit" className="add-supply-btn">
              Add Supply
              <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Table striped borderless hover className="inventory-table">
        <thead>
          <tr>
            <th>
              {" "}
              <Button
                className="add-suply btn"
                onClick={() => setShowModalAdd(true)}
              >
                Add Supply
                <GrFormAdd style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </th>
            <th>
              <FormControl
                autoFocus
                className="filter-input"
                placeholder="Type to filter the supplies..."
              />
            </th>
            <th>
              <Form.Select className="categories-filter" placeholder="das">
                <option>Select category to filter</option>
                {inventory.categories?.map(
                  (v: { id: number; name: string }) => {
                    return (
                      <option key={v.id} value={v.id}>
                        {v.name.toUpperCase()}
                      </option>
                    );
                  }
                )}
              </Form.Select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="sub-header-inventory-table">
            <td>Supply Name</td>
            <td>Category</td>
            <td>Quantity</td>
            <td>Options</td>
          </tr>
          {inventory.items?.map((v: any) => {
            return (
              <tr key={v.name.toLowerCase()}>
                <td>{nameFormat(v.name)}</td>
                <td>{getCategoryName(v.category_id)}</td>
                <td
                  onDoubleClick={() => setShowQuickChange(!showQuickChange)}
                  className="quantity-td"
                >
                  {showQuickChange ? (
                    <span>{v.quantity}</span>
                  ) : (
                    <Form.Control
                      min={1}
                    //   onChange={quickChangeQuantity}
                      name="quantity"
                      type="number"
                      value={v.quantity}
                      className="form-input-add-supply"
                      placeholder="Enter quantity of the item"
                    />
                  )}
                </td>
                <td>
                  <div>
                    <Button>Modify </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Inventory;
