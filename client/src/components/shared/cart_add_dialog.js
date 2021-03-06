import React, { useState } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Spacer from "./spacer";
import Spinner from "./spinner";
import { addToCart } from "../../store/actions/orderActions";

const CartAddDialog = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const changeQuantity = (value) => {
    setQuantity((prevState) => {
      if (prevState === 1 && value === -1) return prevState;
      else return prevState + value;
    });
  };
  const { open, dish, handleClose } = props;
  const handleAddToCart = async () => {
    setLoading(true);
    await props.addToCart(dish.id, quantity);
    setLoading(false);
    setQuantity(1);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <img className="cart-dialog-cover" src={dish.cover} alt="sample" />
        <div className="cart-dialog-title">{dish.name}</div>
        <DialogContentText>{dish.desc}</DialogContentText>
        <section className="cart-button-section">
          <div className="cart-quantity-section">
            <ButtonGroup>
              <Button onClick={() => changeQuantity(-1)}>
                <RemoveIcon style={{ fontSize: 15 }} />
              </Button>
              <Button>{quantity}</Button>
              <Button onClick={() => changeQuantity(1)}>
                <AddIcon style={{ fontSize: 15 }} />
              </Button>
            </ButtonGroup>
            <Spacer h={10} v={10} />
            {loading ? (
              <Spinner />
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
            )}
          </div>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default connect(null, { addToCart })(CartAddDialog);
