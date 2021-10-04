import React, { useState, useEffect } from "react";
import { Table, Button, FormControl, Form, Modal } from "react-bootstrap";
import "./style/Inventory.css";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  inventoryAction,
  fetchInventoryCategories,
  fetchInventory,
  fetchInventoryItems,
  updateInventoryItem,
  patchInventoryItem,
  deleteInventoryItem,
} from "../store/slices/inventory";

import RemoveConfModal from "../ui/RemoveConfModal";

import { nameFormat } from "../helpers/nameFormt";

const Inventory = () => {
  const dispatch = useDispatch();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalModify, setShowModalModify] = useState(false);
  const [inventoryItems, setInventoryItems] = useState(Array<any>());
  const [quickQuantityItem, setQuickQuantityItems] = useState(null);
  const [ableQuickQuantity, setAbleQuickQuantity] = useState(Array<any>());

  const [errorUniqueName, setErrorUniqueName] = useState(false);

  const [itemsDate, setItemsDate] = useState({
    created_at: "",
    updated_at: "",
  });

  const [quickQuantityItemId, setQuickQuantityItemId] = useState(null);

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
    category_id: "",
  });

  const inventory = useSelector((state: RootStateOrAny) => state.inventory);

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleRemoveModalClose = () => {
    setShowRemoveModal(false);
  };
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

  console.log(itemForm);

  const typeFilter = (e: any) => {
    const filterItemsArr = inventory.items.filter(
      (item: { name: string; detail: string }) => {
        return (
          item.name.toLowerCase().indexOf(e.target.value) > -1 ||
          item.detail.toLowerCase().indexOf(e.target.value) > -1
        );
      }
    );
    setInventoryItems(
      filterItemsArr.length !== 0 ? filterItemsArr : inventory.items
    );
  };

  const categoryFilter = (e: any) => {
    const filterItemsArr = inventory.items.filter(
      (item: { category_id: number }) => {
        return Number(item.category_id) === Number(e.target.value);
      }
    );
    setInventoryItems(
      filterItemsArr.length !== 0 ? filterItemsArr : inventory.items
    );
  };

  const changeModifyForm = (e: any) => {
    setModifyData({ ...modifyData, [e.target.name]: e.target.value });
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

  useEffect(() => {
    dispatch(fetchInventoryCategories());
    dispatch(fetchInventoryItems());
  }, [dispatch]);

  useEffect(() => {
    if (inventory.items) {
      setInventoryItems(inventory.items);
    }
  }, [inventory.items]);

  useEffect(() => {
    if (inventory.reload) {
      dispatch(fetchInventoryItems());
      dispatch(inventoryAction.clearReload());
    }
  }, [inventory.reload, dispatch]);

  const getCategoryName = (id: number) => {
    const category: any = inventory.categories?.filter((v: any) => v.id === id);
    if (category) {
      const { name } = category[0];
      return name.toUpperCase();
    }
  };

  const modifySupply = (supplyData: any) => {
    setShowModalModify(!showModalModify);
    const { name, quantity, category_id, detail, id, created_at, updated_at } =
      supplyData;

    setModifyData({
      name,
      quantity,
      category_id,
      detail,
      id,
    });
    setItemsDate({
      created_at: new Date(created_at).toLocaleString(),
      updated_at: new Date(updated_at).toLocaleString(),
    });
  };

  const submitQuickQuantity = (e: any) => {
    e.preventDefault();
    const quickQuantityChangeParams = {
      id: quickQuantityItemId,
      quantity: quickQuantityItem,
    };

    dispatch(patchInventoryItem(quickQuantityChangeParams));
    setQuickQuantityItems(null);
    setAbleQuickQuantity(Array<any>());
  };

  const submitModify = (e: any) => {
    e.preventDefault();
    dispatch(updateInventoryItem(modifyData));
    setShowModalModify(false);
  };

  const removeSupply = () => {
    dispatch(deleteInventoryItem(modifyData.id));
    setShowModalModify(false);
    setShowRemoveModal(false);
  };

  const handleCloseAdd = () => {
    setShowModalAdd(false);
    setErrorUniqueName(false);
  };

  const handleCloseModify = () => setShowModalModify(false);

  const changeQuickChangeQuantity = (e: any) => {
    const { value } = e.target;
    setQuickQuantityItems(value); //Me quede aqui
  };

  const addAbleQuickQuantity = (itemName: any, id: any) => {
    setAbleQuickQuantity((prevState: any) => {
      if (prevState !== itemName) {
        return itemName;
      }
      return [];
    });
    setQuickQuantityItemId(id);
  };

  return (
    <div>
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
                <Form.Text>
                  The name need to be unique in the inventory
                </Form.Text>
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
      <Modal
        show={showModalModify}
        className="modal-modify-supply"
        onHide={handleCloseModify}
        backdrop="static"
      >
        <RemoveConfModal
          show={showRemoveModal}
          handleClose={handleRemoveModalClose}
          onClickRemove={removeSupply}
        />
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
            <p>Created at: {itemsDate.created_at}</p>
            <p>Last update: {itemsDate.updated_at}</p>
            <Button type="submit" className="add-supply-btn">
              Modify Supply
              <AiOutlineEdit style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
          <Button
            onClick={() => setShowRemoveModal(true)}
            type="button"
            className="remove-supply-btn"
          >
            Remove Supply
            <MdDelete style={{ marginLeft: "5px" }} size={20} />
          </Button>
        </Modal.Body>
      </Modal>
      <Table borderless hover className="inventory-table">
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
                onChange={typeFilter}
              />
            </th>
            <th>
              <Form.Select
                className="categories-filter"
                onChange={categoryFilter}
                placeholder="das"
              >
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
            <td></td>
          </tr>
          {inventoryItems?.map((v: any) => {
            return (
              <tr key={v.name.toLowerCase()}>
                <td>{nameFormat(v.name)}</td>
                <td className="category-td">
                  {getCategoryName(v.category_id)}
                </td>
                <td>{v.detail}</td>
                <td
                  onDoubleClick={() => addAbleQuickQuantity(v.name, v.id)}
                  className="quantity-td"
                >
                  {!ableQuickQuantity.includes(v.name) ? (
                    <span className="quantity-row">{v.quantity}</span>
                  ) : (
                    <Form onSubmit={submitQuickQuantity}>
                      <Form.Control
                        min={1}
                        onChange={changeQuickChangeQuantity}
                        name={v.name}
                        type="number"
                        value={
                          quickQuantityItem ? quickQuantityItem : v.quantity
                        }
                        className="form-input-add-supply"
                      />
                    </Form>
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
