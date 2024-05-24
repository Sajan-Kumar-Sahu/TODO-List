import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Source/style';
import database from '@react-native-firebase/database';
import Icons from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [task, setTask] = useState('');
  const [list, setList] = useState('');
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const handleInputData = async () => {
    const index = list.length;
    try {
      if (task) {
        const response = await database()
          .ref(`todo/${index}`)
          .set({value: task});
        setTask('');
      } else {
        Alert.alert('Please enter Data');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateData = async () => {
    try {
      if (task) {
        const response = await database()
          .ref(`todo/${selectedDataIndex}`)
          .update({
            value: task,
          });
        setIsUpdateData(false);
        setTask('');
      } else {
        Alert.alert('Please enter Data');
      }
    } catch (error) {}
  };
  const handleEdit = (taskIndex, indexValue) => {
    setIsUpdateData(true);
    setSelectedDataIndex(taskIndex);
    setTask(indexValue);
  };
  const handleDelete = (taskIndex, indexValue) => {
    Alert.alert('Delete', `Are you sure to delete "${indexValue}" ?`, [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const response = await database().ref(`todo/${taskIndex}`).remove();
            setIsUpdateData(false);
            setTask('');
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };
  const getDatabase = async () => {
    try {
      const data = await database()
        .ref('todo')
        .on('value', tempData => {
          setList(tempData.val());
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>TODO App</Text>
      </View>
      <TextInput
        style={styles.inputText}
        placeholder="Enter any task"
        value={task}
        onChangeText={text => setTask(text)}
      />
      {!isUpdateData ? (
        <Pressable onPress={() => handleInputData()}>
          <Text style={styles.addButton}>Add</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => handleUpdateData()}>
          <Text style={styles.addButton}>Update</Text>
        </Pressable>
      )}

      <View
        style={{backgroundColor: '#fdf0d5', borderRadius: 5, marginBottom: 20}}>
        <Text
          style={{
            fontSize: 25,
            color: '#003049',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Todo List
        </Text>
      </View>
      <FlatList
        data={list}
        renderItem={item => {
          const taskIndex = item.index;
          if (item.item !== null) {
            return (
              <View style={styles.cardContainer}>
                <Text style={styles.card}>{item.item.value}</Text>
                <View style={styles.btnGrp}>
                  <TouchableOpacity
                    onPress={() => handleEdit(taskIndex, item.item.value)}>
                    <Icons name="edit" size={30} color={'black'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(taskIndex, item.item.value)}>
                    <Icons name="trash-o" size={30} color={'black'} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default App;
