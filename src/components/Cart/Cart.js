import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";

const Cart = (props) => {
  const [isSubmitIrderAvailable, setIsSubmitIrderAvailable] = useState(false);
  const [isDataSubmited, setIsDataSubmitting] = useState(false);
  const [wasDataSendingSuccessful, setWasDataSendingSuccessful] =
    useState(false);

  const cartContex = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContex.totalAmount).toFixed(2)}`;

  const hasItems = cartContex.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContex.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContex.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsSubmitIrderAvailable(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsDataSubmitting(true);
    await fetch(
      "https://react-jokes-3409a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedMeadls: cartContex.items,
        }),
      }
    );
    setIsDataSubmitting(false);
    setWasDataSendingSuccessful(true);
    cartContex.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContex.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalBurrons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Закрыть
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Заказать
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
      {isSubmitIrderAvailable && (
        <SubmitOrder
          onCancel={props.onHideCart}
          onSubmit={submitOrderHandler}
        />
      )}
      {!isSubmitIrderAvailable && modalBurrons}
    </>
  );

  const dataSubmittingCartModalContent = <p>Отправка данных заказа</p>;

  const dataWasSubmittedCArtModalContent = (
    <>
      <p>Ваш заказ отправлен</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Закрыть
        </button>
      </div>
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isDataSubmited && !wasDataSendingSuccessful && cartModalContent}
      {isDataSubmited && dataSubmittingCartModalContent}
      {wasDataSendingSuccessful && dataWasSubmittedCArtModalContent}
    </Modal>
  );
};

export default Cart;
