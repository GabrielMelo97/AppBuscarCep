import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Keyboard, ActivityIndicator} from 'react-native';
import api from './src/services/api'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App(){
  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false)

  function limpar(){
    setCep('')
    setCepUser(null); 
    Keyboard.dismiss()
  }    

  async function buscarCep(){
    if(cep == ''){
      alert('Digite um CEP válido!')
      return;
    }

    setLoading(true)

    try{
      const response  = await api.get(`/${cep}/json`);

      if(!response.data.erro){
        setCepUser(response.data)
        Keyboard.dismiss()
        setLoading(false)
      }else{
        alert('CEP não encontrado !')
        setLoading(false)
      }
      
    }catch(error){
      console.log(error)
      if(error == 'Error: Request failed with status code 400'){
        alert('Digite um CEP valido !')
      }
      setLoading(false)
    }


  }

  if(loading){
    return(
      <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>

        <ActivityIndicator color='#000' size={45} />

      </View>
    )
  }else{

    return(
      <SafeAreaView style={styles.container}>
        <View style={{alignItems:'center'}}>
          <Text style={styles.txt}>Digite o CEP desejado:</Text>
          <TextInput 
            placeholder='Ex: 07716053'
            value={cep}
            onChangeText={(texto) => setCep(texto)}
            keyboardType='numeric'
            style={styles.input}
            ref={inputRef}
          />
        </View>

        <View style={styles.areaBtn}>
          <TouchableOpacity style={[styles.btn, {backgroundColor: '#1d75cd'}]} onPress={buscarCep}>
            <Icon name="search" size={20} color="#FFF" />
            <Text style={styles.textBtn}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, {backgroundColor: '#cd3e1d'}]} onPress={limpar}>
            <Icon name="eraser" size={20} color="#FFF" />
            <Text style={styles.textBtn}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>

          {cepUser && 
            <View style={styles.result}>
              <Text style={styles.txtResult}>
                CEP: {cepUser.cep}
              </Text>
              <Text style={styles.txtResult}>
                Logradouro: {cepUser.logradouro}
              </Text>
              <Text style={styles.txtResult}>
                Bairro: {cepUser.bairro}
              </Text>
              <Text style={styles.txtResult}>
                Cidade: {cepUser.localidade}
              </Text>
              <Text style={styles.txtResult}>
                Estado: {cepUser.uf}
              </Text>
            </View>
          }

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  txt:{
    color:'#111103',
    fontSize:22,
    fontWeight:'bold',
    marginBottom:15,
    marginTop: 15
  },
  input:{
    borderWidth:1,
    borderColor:'#ddd',
    width:'90%',
    borderRadius:10,
    fontSize:18,
    padding:10,
    backgroundColor:'#fff'
  },
  areaBtn:{
    flexDirection:'row',
    alignItems:'center',
    marginTop: 15,
    justifyContent:'space-around'
  },
  btn:{
    padding: 10,
    borderRadius:10,
    width: '40%',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
  },
  textBtn:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight:10,
    marginLeft:10,
  }, 
  result:{
    justifyContent: 'center',
    width: '90%' ,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#ddd'
  
  },
  txtResult:{
    color: '#000',
    fontSize: 20,
    marginBottom: 3
  }
})

