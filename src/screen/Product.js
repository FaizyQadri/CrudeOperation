import React, { useReducer, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Provider, useSelector, useDispatch } from 'react-redux';
import ProductModal from "../../modal"

export default function Product() {
  const Data = useSelector((state) => state.ProductData);

  const ProData = Data.data

  const editableData = Data.editable;




  const dispatch = useDispatch();



  const [product, setProduct] = useState({
    vat: 10, proName: "", grossPrice: 0, price: 0, quantity: 1
  })
  // const [edit, setEdit] = useState({
  //   vat: editableData.vat, proName: editableData.proName, grossPrice: editableData.grossPrice, price: editableData.price, quantity: editableData.quantity
  // })



  const [modalVisible, setModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);



  function increament(name, data,) {

    if (name == "vat") {
      if (product.vat < 25 && product.vat >= 10) {
        setProduct(state => {
          return {
            ...state, [name]: product[name] + 5
          }
        })
      }
    } else {
      if (product.quantity < 5 && product.quantity >= 1) {
        setProduct(state => {
          return {
            ...state, [name]: product[name] + 1
          }
        })
      }
    }
  }
  function decreament(name, data) {
    if (name == "vat") {
      if (product.vat <= 25 && product.vat > 10) {
        setProduct(state => {
          return {
            ...state, [name]: product[name] - 5
          }
        })
      }
    } else {
      if (product.quantity <= 5 && product.quantity > 1) {
        setProduct(state => {
          return {
            ...state, [name]: product[name] - 1
          }
        })
      }
    }
  }





  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }
  const openEdit = () => {
    setEditModal(true)
  }
  const closeEdit = () => {
    setEditModal(false)
  }
  const setData = (name, data) => {
    setProduct(state => {
      return {
        ...state, [name]: data
      }
    })

  }



  useEffect(() => {
    setProduct(state => {
      return {
        ...state, grossPrice: parseInt(product.price) + (parseInt(product.price) * parseInt(product.vat)) / 100
      }
    })




  }, [product.proName, product.price, product.quantity, product.vat,]);

  const productInfo = [
    { title: 'Product Name', value: product.proName, name: 'proName' },
    { title: 'Vat', value: product.vat, name: "vat" },
    { title: 'Quantity', value: product.quantity, name: "quantity" },
    { title: 'Price(net)', value: product.price, name: 'price' },
    { title: 'Price(gross)', value: product.grossPrice, name: "grossPrice" },
  ];

  const editInfo = [
    { title: 'Product Name', value: product.proName, name: 'proName' },
    { title: 'Vat', value: product.vat, name: "vat" },
    { title: 'Quantity', value: product.quantity, name: "quantity" },
    { title: 'Price(net)', value: product.price, name: 'price' },
    { title: 'Price(gross)', value: product.grossPrice, name: "grossPrice" },
  ];

  const save = () => {

    dispatch({
      type: 'ADD_PRODUCT',
      payload: product
    })
    setProduct({ vat: 10, proName: "", grossPrice: 0, price: 0, quantity: 1 })

  }
  const Edit = () => {
    dispatch({
      type: 'EDIT_PRODUCT',
      payload: product
    })
    setProduct({ vat: 10, proName: "", grossPrice: 0, price: 0, quantity: 1 })
  }
  const deleted = () => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: product
    })
    setProduct({ vat: 10, proName: "", grossPrice: 0, price: 0, quantity: 1 })
  }

  return (
    <View>
      <Text style={{ fontSize: 34, fontWeight: 'bold', left: 10 }}>Product</Text>

      <View style={styles.centeredView}>
        <ProductModal
          data={productInfo}
          modalVisible={modalVisible}
          open={openModal}
          close={closeModal}
          increament={increament}
          decreament={decreament}
          setData={setData}
          save={save}
          title="Save"


        />
        <ProductModal
          data={editInfo}
          modalVisible={editModal}
          open={openEdit}
          close={closeEdit}
          increament={increament}
          decreament={decreament}
          setData={setData}
          save={Edit}
          title="Edit"
          deleted={deleted}


        />
      </View>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => {

            setModalVisible(!modalVisible);
          }}
          style={{ borderWidth: 1, borderColor: 'black', flexDirection: 'row', width: 70, height: 40, justifyContent: 'space-around', alignItems: 'center', left: 10 }}>
          <Entypo name="plus" size={20} />
          <Text style={{ fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View
            style={{
              borderWidth: 1, borderColor: 'black', width: '30%', height: 60, alignItems: 'center',
              justifyContent: 'center', marginTop: 10
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Product Name</Text>
          </View>
          <View
            style={{
              borderWidth: 1, borderColor: 'black', width: '70%', height: 60, alignItems: 'center',
              justifyContent: 'center', marginTop: 10
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              Price per Qty (Gross)
            </Text>
          </View>
        </View>
        <FlatList
          data={ProData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setEditModal(true)
                  dispatch({ type: "EDITABLE_PRODUCT", payload: item })
                  setProduct(item)

                }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View
                    style={{
                      borderWidth: 1, borderColor: 'black', width: '30%', height: 60, alignItems: 'center',
                      justifyContent: 'center', marginTop: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                      {item.proName}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1, borderColor: 'black', width: '70%', height: 60, alignItems: 'center',
                      justifyContent: 'center', marginTop: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                      {item.grossPrice}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
