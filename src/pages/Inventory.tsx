import React, { useState, useEffect } from "react";
import { Table, Button, FormControl, Form, Modal } from "react-bootstrap";
import "./style/Inventory.css";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  fetchInventoryCategories,
  fetchInventory,
  fetchInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
} from "../store/slices/inventory";

import { nameFormat } from "../helpers/nameFormt";

const Inventory = () => {
  const dispatch = useDispatch();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showQuickChange, setShowQuickChange] = useState(true);
  const [showModalModify, setShowModalModify] = useState(false);
  const [modifyData, setModifyData] = useState({
    name: "",
    category_id: 0,
    quantity: 0,
    detail: "",
    id: 0,
  });

  const [itemForm, setItemForm] = useState({
    name: "",
    quantity: 0,
    detail: "",
    category: "",
  });

  const inventory = useSelector((state: RootStateOrAny) => state.inventory);

  const changeItemForm = (e: any) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
  };

  const changeModifyForm = (e: any) => {
    setModifyData({ ...modifyData, [e.target.name]: e.target.value });
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

  const modifySupply = (supplyData: any) => {
    setShowModalModify(!showModalModify);
    const { name, quantity, category_id, detail, id } = supplyData;

    setModifyData({
      name,
      quantity,
      category_id,
      detail,
      id,
    });
  };

  const submitModify = (e:any) => {
    e.preventDefault()
    dispatch(updateInventoryItem(modifyData));
    setShowModalModify(false);
  };

  const removeSupply = () => {
    dispatch(deleteInventoryItem(modifyData.id));
    setShowModalModify(false);
  };

  const handleCloseAdd = () => setShowModalAdd(false);

  const handleCloseModify = () => setShowModalModify(false);

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
      <Modal
        show={showModalModify}
        className="modal-modify-supply"
        onHide={handleCloseModify}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify Medical Supply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitModify}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                value={modifyData.name}
                onChange={changeModifyForm}
                name="name"
                placeholder="Enter name of the item"
              />
            </Form.Group>
            <Form.Select
              className="form-input-add-supply"
              onChange={changeModifyForm}
              value={modifyData.category_id}
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
                onChange={changeModifyForm}
                name="quantity"
                type="number"
                value={modifyData.quantity}
                className="form-input-add-supply"
                placeholder="Enter quantity of the item"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                onChange={changeModifyForm}
                value={modifyData.detail}
                className="form-input-add-supply"
                placeholder="Enter a detail of the item"
                name="detail"
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Button type="submit" className="add-supply-btn">
              Modify Supply
              <AiOutlineEdit style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
          <Button
            onClick={removeSupply}
            type="button"
            className="remove-supply-btn"
          >
            Remove Supply
            <MdDelete style={{ marginLeft: "5px" }} size={20} />
          </Button>
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
            <td>Detail</td>

            <td>Quantity</td>
            <td>Options</td>
          </tr>
          {inventory.items?.map((v: any) => {
            return (
              <tr key={v.name.toLowerCase()}>
                <td>{nameFormat(v.name)}</td>
                <td className="category-td">
                  {getCategoryName(v.category_id)}
                </td>
                <td>{v.detail}</td>
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
                      name={v.name}
                      type="number"
                      value={v.quantity}
                      className="form-input-add-supply"
                      placeholder="Enter quantity of the item"
                    />
                  )}
                </td>

                <td>
                  <div>
                    <Button
                      className="modify-btn"
                      onClick={() => modifySupply(v)}
                    >
                      Modify <AiOutlineEdit />
                    </Button>
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
