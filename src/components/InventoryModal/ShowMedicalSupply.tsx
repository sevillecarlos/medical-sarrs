import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Button, Modal, Form } from "react-bootstrap";
import RemoveConfModal from "../../ui/RemoveConfModal";
import {
  updateInventoryItem,
  deleteInventoryItem,
} from "../../store/slices/inventory";
import { RootStateOrAny } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../../store/hook";

interface ShowMedicalSupplyI {
  itemsDate: any;
  inventory: any;
  changeModifyForm: any;
  modifyData: any;
  showModalModify: boolean;
  setModifyData: any;
  setShowModalModify: any;
}

const ShowMedicalSupply = (props: ShowMedicalSupplyI) => {
  const dispatch = useAppDispatch();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const auth = useAppSelector((state: RootStateOrAny) => state.auth);
  const [dispatchModify, setDispatchModify] = useState(false);
  const {
    itemsDate,
    inventory,
    changeModifyForm,
    modifyData,
    showModalModify,
    setShowModalModify,
    setModifyData,
  } = props;

  const submitModify = (e: any) => {
    e.preventDefault();
    setModifyData((prevState: any) => {
      return { ...prevState, user_log_update: auth.activeUser };
    });
    setDispatchModify(true);
    setShowModalModify(false);
  };
  useEffect(() => {
    if (dispatchModify) {
      dispatch(updateInventoryItem(modifyData));
      setDispatchModify(false);
    }
  }, [dispatchModify, dispatch, modifyData]);

  const removeSupply = () => {
    dispatch(deleteInventoryItem(modifyData.id));
    setShowModalModify(false);
    setShowRemoveModal(false);
  };

  const handleRemoveModalClose = () => {
    setShowRemoveModal(false);
  };

  const handleCloseModify = () => setShowModalModify(false);

  return (
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
              required
              onChange={changeModifyForm}
              name="name"
              placeholder="Enter name of the item"
            />
          </Form.Group>
          <Form.Select
            className="form-input-add-supply"
            onChange={changeModifyForm}
            required
            value={modifyData.category_id}
            name="category_id"
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
              required
              value={modifyData.quantity}
              className="form-input-add-supply"
              placeholder="Enter quantity of the item"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              required
              onChange={changeModifyForm}
              value={modifyData.detail}
              className="form-input-add-supply"
              placeholder="Enter a detail of the item"
              name="detail"
              style={{ height: "100px" }}
            />
          </Form.Group>
          <p>
            Created at: {itemsDate.created_at} by {modifyData.user_log_create}
          </p>
          <p>
            Last update: {itemsDate.updated_at} by {modifyData.user_log_update}
          </p>
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
  );
};

ShowMedicalSupply.propTypes = {};

export default ShowMedicalSupply;
