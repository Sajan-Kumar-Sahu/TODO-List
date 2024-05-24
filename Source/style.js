import {StyleSheet} from 'react-native';
import React from 'react';

export default StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    backgroundColor:'black'
  },
  headerText:{
    fontSize:30,
    color:'#61dafb',
    fontWeight:'bold',
    textAlign:"center",
    margin:10,
  },
  inputText:{
    borderWidth:3,
    borderRadius:10,
    borderColor:'#61dafb',
    fontSize:20,
    padding:10
  },
  addButton:{
    marginVertical:20,
    backgroundColor:'#61dafb',
    color:'black',
    textAlign:'center',
    marginHorizontal:120,
    borderRadius:10,
    paddingVertical:2,
    fontSize:22,
    fontWeight:'bold'
  },
  cardContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#1b9aaa',
    marginVertical:5,
    borderRadius:8,
    paddingStart:8,
    paddingVertical:10,
    paddingHorizontal: 10,
    elevation:3,
  },
  card:{
    fontSize:20,
    color:'#f5f1e3',
    fontWeight:'bold'
  },
  btnGrp:{
    flexDirection:'row',
    gap: 8,
    backgroundColor:'transparent',
  }
});
