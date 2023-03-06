import { useRef, useState } from "react";

import styles from "./SubmitOrder.module.css";

const isInputValid = (inputValue) => inputValue.trim() !== "";

const SubmitOrder = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    city: true,
    address: true,
  });
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();

  const confirmOrderHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const isEnteredNameValid = isInputValid(enteredName);
    const isEnteredCityValid = isInputValid(enteredCity);
    const isEnteredAddressValid = isInputValid(enteredAddress);

    setFormValidity({
      name: isEnteredNameValid,
      city: isEnteredCityValid,
      address: isEnteredAddressValid,
    });

    const isFormValid =
      isEnteredNameValid && isEnteredCityValid && isEnteredAddressValid;

    if (!isFormValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      address: enteredAddress,
    });
  };
  const nameInputClasses = `${styles.control} ${
    formValidity.name ? "" : styles.invalid
  }`;
  const cityInputClasses = `${styles.control} ${
    formValidity.city ? "" : styles.invalid
  }`;
  const addressInputClasses = `${styles.control} ${
    formValidity.address ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmOrderHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Имя</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p className={styles.invalid}>Введите имя</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city"> Название города</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && (
          <p className={styles.invalid}>Введите название города</p>
        )}
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="address">Адрес</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formValidity.address && (
          <p className={styles.invalid}>Введите название адреса</p>
        )}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Подтвердить заказ</button>
        <button type="button" onClick={props.onCancel}>
          Отменить заказ
        </button>
      </div>
    </form>
  );
};

export default SubmitOrder;
