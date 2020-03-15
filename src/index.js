import { createStore } from "redux";
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector(".number");

number.innerText = 0;

const modifyCouter = (count = 0, action) => {
  if (action.type === "ADD") {
    return (count = count + 1);
  } else if (action.type === "MINUS") {
    return (count = count - 1);
  } else {
    return count;
  }
};

const countStore = createStore(modifyCouter);

const updateText = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(updateText);
const handleAdd = () => {
  countStore.dispatch({ type: "ADD" });
};

const handleMinus = () => {
  countStore.dispatch({ type: "MINUS" });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
