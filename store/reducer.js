

const initialstate = {
  data: [],
  editable: {}
};

function reducer(state = initialstate, action) {

  if (action.type == 'ADD_PRODUCT') {

    // const newData = { ...state };

    const newData = state.data;
    const newProduct = action.payload;
    newProduct.id = state.data.length;
    newData.push(newProduct)

    // newData.data.push(newProduct);


    return {
      ...state, data: newData
    };
  }
  if (action.type == 'EDITABLE_PRODUCT') {
    var newPayload = action.payload;

    return {
      ...state, editable: newPayload
    }
  }
  if (action.type == 'DELETE_PRODUCT') {
    var latestPayload = action.payload;
    const oldData = state.data;
    const deleted = oldData.filter(state => state.id != latestPayload.id)
    deleted
    return {
      ...state, data: deleted
    }

  }
  if (action.type == 'EDIT_PRODUCT') {
    var newPayload = action.payload;
    const updatedData = state.data
    const updatedState = updatedData.filter(state => state.id != newPayload.id)
    updatedState.push(newPayload)
    return {
      ...state, data: updatedState
    }

  }

  return state;
}



export default reducer;
