import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../constants/config'
import {Login_URL} from '../constants/config'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

//   const register = (name, email, password) => {
//     setIsLoading(true);

//     axios
//       .post(`${BASE_URL}/register`, {
//         name,
//         email,
//         password,
//       })
//       .then(res => {
//         let userInfo = res.data;
//         setUserInfo(userInfo);
//         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//         setIsLoading(false);
//         console.log(userInfo);
//       })
//       .catch(e => {
//         console.log(`register error ${e}`);
//         setIsLoading(false);
//       });
//   };

  // const login = (data) => {
  //   // setIsLoading(true);
  //   console.log("Inside login")

  //   axios
  //     .post(`${BASE_URL}/api/Appuser/AppLogin`, {
  //       data
  //     })
  //     .then(res => {
  //       console.log("Inside response")
  //       let userInfo = res.data;
  //       console.log(userInfo);
  //       setUserInfo(userInfo);
  //       AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  //       setIsLoading(false);
  //     })
  //     .catch(e => {
  //       console.log(`login error ${e}`);
  //       setIsLoading(false);
  //     });
  // };


  const login  = (code,password,username) => {

    let bodydata = JSON.stringify({
      "DspCode": code,
      "password": password,
      "userName": username
    });

    let isLoggedIn = 'false' ;
    console.log(bodydata)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: Login_URL,
      headers: { 
        'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      data : bodydata
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      isLoggedIn = 'true'
    })
    .catch((error) => {
      console.log(error);
      isLoggedIn = 'false'
    });

    return isLoggedIn;

  }

  return (
    <AuthContext.Provider
      value={{login}}>
      {children}
    </AuthContext.Provider>
  );
};