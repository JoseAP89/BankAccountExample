import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { useForm } from "react-hook-form";

//import {CheckCircleIcon} from '@chakra-ui/icons'

import { useEffect, useState } from 'react'
import { Container, FormControl,FormLabel,Input,FormHelperText,
  Button, FormErrorMessage
} from '@chakra-ui/react'


const SignUp: NextPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      id: ""
    }
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    
  };
  console.log(errors);
  console.log(!!errors?.id);

  return (
    <>
      <Head>
        <title>Apertura</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <Container p={5} maxW='container.xl'>
        <Heading as="h2" size="md">Hazte nuestro cliente de forma sencilla y rápida</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt={4}  >
            <FormLabel htmlFor='fullname'>Nombre completo</FormLabel>
            <Input id='fullname' type='text'  w="45vw" 
              {...register("fullName", { required: true, maxLength: 100, minLength: 3 })}
            />
            {!!errors?.fullName  && errors.fullName.type==="required" &&
              <div className="error-message">Nombre completo es requerido.</div>
            }
            {!!errors?.fullName  && errors.fullName.type==="maxLength" &&
              <div className="error-message">Nombre no debe tener más de 100 carácteres.</div>
            }
            {!!errors?.fullName  && errors.fullName.type==="minLength" &&
              <div className="error-message">Nombre debe tener más de 2 carácteres.</div>
            }
            <FormHelperText>Escribe tu nombre completo.</FormHelperText>

            <FormLabel htmlFor='id' mt={4}>Número de Identificación</FormLabel>
            <Input id='id' type='text' w="45vw"
              {...register("id", { required: true, maxLength: 18 })}
            />
            {!!errors?.id  && errors.id.type=="required" &&
              <div className="error-message">Id es requerido.</div>
            }
            {!!errors?.id  && errors.id.type==="maxLength" &&
              <div className="error-message">Id no debe tener más de 18 carácteres.</div>
            }
            <FormHelperText>Escribe tu curp completo</FormHelperText>

            <Button colorScheme='blue' my={3} type="submit">Enviar</Button>
          </FormControl>
        </form>
      </Container>

    </>
  )
}

export default SignUp