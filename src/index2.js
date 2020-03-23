import { createStore, combineReducers } from "redux";
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector(".number");
const toDosElement = document.querySelector(".todo_contain");
const toDoForm = toDosElement.querySelector("form");
const toDoInput = toDosElement.querySelector("input");
const toDoUl = toDosElement.querySelector(".todo_list");

number.innerText = 0;

const initialState = {
  count: 0,
  toDos: []
};

let { count, toDos } = initialState;

const modifyToDos = (state = toDos, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

//#region
const modifyCounter = (state = count, action) => {
  if (action.type === "ADD") {
    return (count = count + 1);
  } else if (action.type === "MINUS") {
    return (count = count - 1);
  } else {
    return state;
  }
};

const updateText = () => {
  const { modifyCounter } = store.getState();
  number.innerText = modifyCounter;
};

const handleAdd = () => {
  store.dispatch({ type: "ADD" });
};

const handleMinus = () => {
  store.dispatch({ type: "MINUS" });
};
//#endregion
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";

const addToDo = text => {
  return { type: ADD_TODO, text };
};

const deleteToDo = id => {
  return { type: REMOVE_TODO, id };
};

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  console.log(store.getState());
  const { modifyToDos: items } = store.getState();
  toDoUl.innerHTML = "";
  items.forEach(toDo => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(button);
    toDoUl.appendChild(li);
  });
};

const onSubmit = e => {
  e.preventDefault();
  const toDo = toDoInput.value;
  toDoInput.value = "";
  dispatchAddToDo(toDo);
};

const reducers = combineReducers({ modifyCounter, modifyToDos });
const store = createStore(reducers);

store.subscribe(paintToDos);
store.subscribe(updateText);

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
toDoForm.addEventListener("submit", onSubmit);
