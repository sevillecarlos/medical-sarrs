import React, { useState, useEffect } from "react";
import { Table, Button, FormControl, Form } from "react-bootstrap";
import "./style/Inventory.css";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";

import AddMedicalSupplyModal from "../components/InventoryModal/AddMedicalSupply";
import ShowMedicalSupply from "../components/InventoryModal/ShowMedicalSupply";
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/hook";

import {
  inventoryAction,
  fetchInventoryCategories,
  fetchInventoryItems,
  patchInventoryItem,
} from "../store/slices/inventory";

import { nameFormat } from "../helpers/nameFormt";

const Inventory = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootStateOrAny) => state.auth);


  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalModify, setShowModalModify] = useState(false);
  const [inventoryItems, setInventoryItems] = useState(Array<any>());
  const [quickQuantityItem, setQuickQuantityItems] = useState(null);
  const [ableQuickQuantity, setAbleQuickQuantity] = useState(Array<any>());

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
    user_log_create: "",
    user_log_update: "",
  });

  const inventory = useAppSelector((state: RootStateOrAny) => state.inventory);

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
    const {
      name,
      quantity,
      category_id,
      detail,
      id,
      user_log_create,
      user_log_update,
      created_at,
      updated_at,
    } = supplyData;

    setModifyData({
      name,
      quantity,
      category_id,
      detail,
      id,
      user_log_create,
      user_log_update,
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
      user_log_update: auth.activeUser,
    };

    dispatch(patchInventoryItem(quickQuantityChangeParams));
    setQuickQuantityItems(null);
    setAbleQuickQuantity(Array<any>());
  };

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
      <AddMedicalSupplyModal
        inventory={inventory}
        showModalAdd={showModalAdd}
        setShowModalAdd={setShowModalAdd}
      />

      <ShowMedicalSupply
        itemsDate={itemsDate}
        inventory={inventory}
        changeModifyForm={changeModifyForm}
        setModifyData={setModifyData}
        modifyData={modifyData}
        setShowModalModify={setShowModalModify}
        showModalModify={showModalModify}
      />

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
            <th>Total Items: {inventoryItems?.length}</th>
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
