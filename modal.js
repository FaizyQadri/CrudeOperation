import React from "react"
import { View, Text, TextInput, Modal, FlatList, TouchableOpacity, Button } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default (props) => {

 const { data, modalVisible, open, close, increament, decreament, setData, save, title, deleted } = props



 return (
  <Modal
   animationType="slide"
   transparent={true}
   visible={modalVisible}
   onRequestClose={close}>
   <View
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
    <View
     style={{
      height: 425, width: 300, backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 20,
      paddingVertical: 10,
     }}>
     <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, }}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, }}> Products </Text>

      <AntDesign name="close" size={25} onPress={close}
      />
     </View>
     <FlatList
      data={data}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item, index }) => {

       return (
        <View
         style={{ height: 50, width: '100%', flexDirection: 'row', marginBottom: 10, alignItems: 'center', }}>

         <Text style={{ fontWeight: 'bold', flex: 1 }}>{item.title} </Text>


         {index == 1 || index == 2 ? (
          <View
           style={{
            height: '80%', flex: 1, marginLeft: 20, elevation: 2, flexDirection: 'row', paddingHorizontal: 8, borderColor: "black"
           }}>
           <Text
            style={{ flex: 1, alignSelf: 'center', }}>
            {item.value}
           </Text>
           <View
            style={{
             justifyContent: 'space-between',

            }}>
            <TouchableOpacity
             onPress={() =>
              index == 1 || index == 2
               ? increament(item.name, index,)
               : null
             }>
             <Entypo name="chevron-small-up" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() =>
              index == 1 || index == 2
               ? decreament(item.name, index,)
               : null
             }>
             <Entypo name="chevron-small-down" size={20} />
            </TouchableOpacity>
           </View>
          </View>
         ) : (
           <TextInput
            style={{ height: '100%', flex: 1, marginLeft: 20, elevation: 2, paddingHorizontal: 10 }}
            editable={index == 4 ? false : true}
            value={item.value.toString()}
            onChangeText={(data) => {
             setData(item.name, data)
            }}
           />
          )}
        </View>
       );
      }}
     />
     <View>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: 10, }}>
       <TouchableOpacity
        onPress={() => {
         title == 'Edit' ? deleted() : close()
         close()
        }}
        style={{
         borderWidth: 1, borderColor: 'black', width: 70, height: 40, flexDirection: 'row', marginHorizontal: 5, alignItems: 'center',
        }}>
        <MaterialIcons name="delete" size={20} />
        <Text>Delete</Text>
       </TouchableOpacity>
       <Button
        title={title}
        onPress={() => {
         save()
         close()

        }}
       />
      </View>
     </View>
    </View>
   </View>
  </Modal>
 );
};
