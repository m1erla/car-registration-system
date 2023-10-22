import React from 'react'
import { Formik, Field, useFormik, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { InputLabel } from '@mui/material';



const REGISTER_URL = '/'
function Register() {
   

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');


  

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post(REGISTER_URL, 
          JSON.stringify({ username, password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
          );
          console.log(res?.data);
          console.log(res?.accessToken);
          console.log(JSON.stringify(res));

          setSuccess(true);
          setUsername('');
          setPwd('');
          setMatchPwd('');
      }catch (err) {
        if(!err?.res) {
           setErrMsg('No Server Response')
        }else if (err.res?.status === 409){
          setErrMsg('Username Taken');
        }else {
          setErrMsg('Registration Failed')
        }

      }
    }

    let navigate = useNavigate();

    return (
      <>
       
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md" w={64} >
          <Formik
            initialValues={{
              username: "",
              password: "",
              passwordConfirm: "",
              rememberMe: false
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field
                      placeholder="username"
                      as={Input}
                      id="name"
                      name="username"
                      type="name"
                      variant="filled"
                    
              
                    />
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      placeholder="password"
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      validate={(value) => {
                        let error;
  
                        if (value.length < 6) {
                          error = "Password must contain at least 6 characters";
                        }
  
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor="passwordConfirm">Password Confirm</FormLabel>
                    <Field
                      placeholder="password confirm"
                      as={Input}
                      id="password"
                      name="passwordConfirm"
                      type="password"
                      variant="filled"
                      validate={(value) => {
                        let error;
  
                        if (!value) {
                          error = "Invalid password confirm doesnt match your password";
                        }
  
                        return error;
                      }}
                      onChange={handleChange}
                      value={values.password}
                      isInvalid={touched.password && errors.password}
                    />
                    
                
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  
                  
                  <p>
                      Already registered?
                      <span className="line">
                          {/*put router link here*/}
                          <a href="/signin"> Sign In</a>
                      </span>
                  </p>
                
                  <Button type="submit" colorScheme="messenger" width="full" >
                    Sign Up
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
          </>
      );
}

export default Register