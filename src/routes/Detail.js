import React from "react";
import { connect } from "react-redux";

const Detail = ({ toDo }) => {
  return (
    <>
      <h1>{toDo?.text}</h1>
      <p>Created at : {toDo?.id}</p>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id }
    }
  } = ownProps;
  return { toDo: state.find(toDo => toDo.id === parseInt(id)) };
};

export default connect(mapStateToProps)(Detail);
