import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  addExpenseAction,
  addIncomeAction,
  getLastCashFlowAction,
  addCashInitAction,
} from "../../redux/actions/cashFlowActions.js";
import { useModal } from "../Hooks/useModal";
import Modal from "./Modal";
import Reviews from "./Reviews.jsx";

const Modals = ({ lastCashFlow }) => {
  const dispatch = useDispatch();
  const [ingreso, setIngreso] = useState({
    amount: 0,
    comment: "",
    type: "Income",
    hour: new Date().toLocaleTimeString(),
  });
  const [egreso, setEgreso] = useState({
    amount: 0,
    comment: "",
    type: "Expenses",
    hour: new Date().toLocaleTimeString(),
  });
  const [iniciarButton, setIniciarButton] = useState(true);
  const [init, setInit] = useState(0);

  const [isOpenModalIncome, openModalIncome, closeModalIncome] =
    useModal(false);
  const [isOpenModalExpense, openModalExpense, closeModalExpense] =
    useModal(false);
  const [isOpenModalInit, openModalInit, closeModalInit] = useModal(false);
  const [isOpenModalReviews, openModalReviews, closeModalReviews] =
    useModal(false);
  const handleSubmitIncome = (e) => {
    // e.preventDefault();

    dispatch(addIncomeAction(ingreso));
    closeModalIncome();
  };
  const handleSubmitExpense = (e) => {
    if (lastCashFlow.totalCashRegister - egreso.amount >= 0) {
      dispatch(addExpenseAction(egreso));
      //   closeModalExpense();
    } else {
      e.preventDefault();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't take more than the total cash!",
      });
      closeModalExpense();
    }
  };

  const handleSubmitInicioDeCaja = (e) => {
    setIniciarButton(false);
    dispatch(addCashInitAction(init));

    closeModalInit();
  };

  // useEffect(() => {
  //     if (lastCashFlow && lastCashFlow.length === 0) {
  //         console.log("HOLAAAAA")
  //         setIniciarButton(true)
  //     }
  // }, [dispatch])

  return (
    <div>
      <button
        hidden={lastCashFlow && !lastCashFlow.closeCashFlow}
        onClick={() => {
          openModalInit();
        }}
      >
        Cash opening
      </button>
      <Modal isOpen={isOpenModalInit} closeModal={closeModalInit}>
        <h2>Add the current amount of cash</h2>
        <form
          onSubmit={() => {
            handleSubmitInicioDeCaja();
          }}
        >
          <label>
            {" "}
            Amount:
            <input
              type="number"
              placeholder="amount"
              onChange={(e) => setInit(e.target.value)}
            />
          </label>

          <input
            type="submit"
            value="Cash opening"
            onClick={() => setIniciarButton(false)}
          />
        </form>
      </Modal>
      {lastCashFlow && !lastCashFlow.closeCashFlow && (
        <button onClick={openModalIncome}>Income</button>
      )}
      <Modal isOpen={isOpenModalIncome} closeModal={closeModalIncome}>
        <h2>Add an amount of cash and a motive for the income</h2>
        <form onSubmit={handleSubmitIncome}>
          <label>
            {" "}
            Amount:
            <input
              type="number"
              placeholder="amount"
              onChange={(e) =>
                setIngreso({
                  ...ingreso,
                  amount: e.target.value,
                })
              }
            />
          </label>
          <label>
            {" "}
            Motive:
            <input
              type="text"
              placeholder="motive"
              onChange={(e) =>
                setIngreso({
                  ...ingreso,
                  comment: e.target.value,
                })
              }
            />
          </label>
          <input type="submit" value="Add Income" onClick={closeModalIncome} />
        </form>
      </Modal>
      {lastCashFlow && !lastCashFlow.closeCashFlow && (
        <button onClick={openModalExpense}>Expense</button>
      )}
      <Modal isOpen={isOpenModalExpense} closeModal={closeModalExpense}>
        <h2>Add an amount and a motive for the expense</h2>
        <form onSubmit={handleSubmitExpense}>
          <label>
            {" "}
            Amount:
            <input
              type="number"
              placeholder="amount"
              onChange={(e) =>
                setEgreso({
                  ...egreso,
                  amount: e.target.value,
                })
              }
            />
          </label>
          <label>
            {" "}
            Motive:
            <input
              type="text"
              placeholder="motive"
              onChange={(e) =>
                setEgreso({
                  ...egreso,
                  comment: e.target.value,
                })
              }
            />
          </label>
          <input type="submit" value="Add Expense" />
        </form>
      </Modal>
      {lastCashFlow && !lastCashFlow.closeCashFlow && (
        <button onClick={openModalReviews}>Cash Closing</button>
      )}
      <Modal isOpen={isOpenModalReviews} closeModal={closeModalReviews}>
        <Reviews />
      </Modal>
    </div>
  );
};

export default Modals;
