import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { useForm } from "react-hook-form";

//import {CheckCircleIcon} from '@chakra-ui/icons'

import { useEffect, useState } from 'react'
import { Container, FormControl,FormLabel,Input,FormHelperText,
  Button, FormErrorMessage
} from '@chakra-ui/react'


const OpenSavingsAccount: NextPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    
  };
  console.log(errors);


  return (
    <>
      <Head>
        <title>Cuenta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <Container p={5} maxW='container.xl'>
        <Heading as="h2" size="md">Crea una cuenta de ahorro en unos pocos pasos.</Heading>

        <p>Como requisito se necesita ser cliente de la institucion.</p>
        <p>Si aun no lo eres <a style={{color:"blue"}} href="/signup">click aqui</a> para volverte nuestro cliente.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt={4}  >

            <FormLabel htmlFor='account'>Número de cuenta</FormLabel>
            <Input id='account' type='number'  w="45vw" 
              {...register("account", { required: true, pattern: /^[0-9]+$/i })}
            />
            {!!errors?.account  && errors.account.type==="pattern" &&
              <div className="error-message">Número de cuenta solo debe tener valores numericos enteros.</div>
            }
            {!!errors?.account  && errors.account.type==="required" &&
              <div className="error-message">Número de cuenta es requerido.</div>
            }
            <FormHelperText>Número proporcionado por su ejecutivo de cuenta	.</FormHelperText>

            <FormLabel htmlFor='amount' mt={4}>Monto inicial de apertura</FormLabel>
            <Input id='amount' type='number' w="45vw"
              {...register("amount", { required: true, min: 100 })}
            />
            {!!errors?.amount  && errors.amount.type=="required" &&
              <div className="error-message">Monto es requerido.</div>
            }
            {!!errors?.amount  && errors.amount.type==="min" &&
              <div className="error-message">Monto  debe ser mayor o igual a $100 MN.</div>
            }
            <FormHelperText>Monto de apertura de la cuenta de ahorros.</FormHelperText>

            <Button colorScheme='blue' my={3} type="submit">Enviar</Button>
          </FormControl>
        </form>
      </Container>

    </>
  )
}

export default OpenSavingsAccount