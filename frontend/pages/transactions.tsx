import type { NextPage } from 'next'
import Head from 'next/head'
import { Alert, AlertIcon, Heading, Select, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import MoneyFlux from "../models/moneyflux"

//import {CheckCircleIcon} from '@chakra-ui/icons'

import { useEffect, useState } from 'react'
import { Container, FormControl,FormLabel,Input,FormHelperText,
  Button, FormErrorMessage,Tabs, TabPanels, TabPanel, TabList, Tab
} from '@chakra-ui/react'
import TransactionService from '../services/transaction';
import Account from '../models/account';
import OperationReport from '../models/operationreport';


const Transactions: NextPage = () => {
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [operationReport, setOperationReport] = useState<Array<OperationReport>>([]);
  const { register: registerD, handleSubmit: handleSubmitD, formState: { errors: errorsD } } = useForm();
  const { register: registerM, handleSubmit: handleSubmitM, formState: { errors: errorsM } } = useForm();

  const onSubmitD = (data: any) => {
    let bag : Account = {
      accountid : Number(data.accountid),
      totalamount : Number(data.amount) * data.flux,
      clientid: 0
    }
    TransactionService.updateAccount(bag).then( (response) => {
      console.log(response);
      if (!!response && response.statusText === 'Created') {
        setSuccessMsg(true);
        setTimeout(() => {
          setSuccessMsg(false);
        }, 1000 * 5);
      }
    }).catch( err =>{
      console.log(err);
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 1000 * 5);
    })
    
  };

  const onSubmitM = (data: any) => {
    TransactionService.getOperationReport(data.clientid, data.accountid).then( (response) => {
      console.log(!!response?.data);
      console.log(response.data);
      if (!!response?.data && response.data.length>0) {
        setOperationReport(response.data as Array<OperationReport>);
      } else {
        setErrorMsg(true);
        setOperationReport([]);
        setTimeout(() => {
          setErrorMsg(false);
        }, 1000 * 5);
      }
    }).catch( err =>{
      console.log(err);
      setOperationReport([]);
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 1000 * 5);
    })
    
  };


  return (
    <>
      <Head>
        <title>Transacciones</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <Container p={5} maxW='container.xl'>

        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab>Dep??sitos / Retiros</Tab>
            <Tab onClick={ ()=> setErrorMsg(false)}>Movimientos</Tab>
          </TabList>
          <TabPanels>

            <TabPanel>
              <Heading as="h2" size="md">Deposita o retira de tu cuenta hasta por $20,000 MN de forma efectiva.</Heading>

              <form onSubmit={handleSubmitD(onSubmitD)}>
                <FormControl mt={4}  >

                  <FormControl>
                    <FormLabel htmlFor='flux'>Operaci??n financiera a realizar</FormLabel>
                    <Select id='flux' placeholder='Seleccione la operaci??n' w="45vw"
                      {...registerD("flux", { required: true})}>
                      <option value={1}>Dep??sito</option>
                      <option value={-1}>Retiro</option>
                    </Select>
                  </FormControl>
                  {!!errorsD?.flux  && errorsD.flux.type==="required" &&
                    <div className="error-message">Dato de tipo de operaci??n es requerido</div>
                  }

                  <FormLabel htmlFor='accountidD' mt={4}>N??mero de cuenta a depositar</FormLabel>
                  <Input id='accountidD' type='number'  w="45vw" 
                    {...registerD("accountid", { required: true, pattern: /^[0-9]+$/i })}
                  />
                  {!!errorsD?.accountid  && errorsD.accountid.type==="pattern" &&
                    <div className="error-message">N??mero de cuenta solo debe tener valores numericos enteros.</div>
                  }
                  {!!errorsD?.accountid  && errorsD.accountid.type==="required" &&
                    <div className="error-message">N??mero de cuenta es requerido.</div>
                  }
                  <FormHelperText>N??mero de cuenta destinatario.</FormHelperText>


                  <FormLabel htmlFor='amount' mt={4}>Monto</FormLabel>
                  <Input id='amount' type='number' w="45vw"
                    {...registerD("amount", { required: true, max: 20_000, min: 100 })}
                  />
                  {!!errorsD?.amount  && errorsD.amount.type=="required" &&
                    <div className="error-message">Monto es requerido.</div>
                  }
                  {!!errorsD?.amount  && (errorsD.amount.type==="max" || errorsD.amount.type==="min" ) &&
                    <div className="error-message">Monto  debe estar en el rango de $100.00 - $20,000.00 MN.</div>
                  }
                  <FormHelperText>Monto a depositar a tu cuenta de ahorros.</FormHelperText>

                  <Button colorScheme='blue' my={3} type="submit">Enviar</Button>
                </FormControl>
              </form>

              { successMsg &&
                <Alert status='success'>
                  <AlertIcon />
                  Transacci??n realizada correctamente.
                </Alert>
              }
              { errorMsg &&
                <Alert status='error'>
                  <AlertIcon />
                  Hubo un problema guardando su informaci??n.
                </Alert>
              }
              
            </TabPanel>


            <TabPanel>
               <Heading as="h2" size="md">Revisa los movimientos de tu cuenta.</Heading>

              <form onSubmit={handleSubmitM(onSubmitM)}>
                <FormControl mt={4}  >


                  <FormLabel htmlFor='clientid' mt={4}>N??mero de Identificaci??n</FormLabel>
                  <Input id='clientid' type='number' w="45vw"
                    {...registerM("clientid", { required: true, pattern: /^[0-9]+$/i })}
                  />
                  {!!errorsM?.clientid  && errorsM.clientid.type=="required" &&
                    <div className="error-message">Id es requerido.</div>
                  }
                  {!!errorsM?.clientid  && errorsM.clientid.type==="pattern" &&
                    <div className="error-message">N??mero de Identificaci??n solo debe tener valores numericos enteros.</div>
                  }
                  <FormHelperText>Id proporcionado por su ejecutivo de cuenta.</FormHelperText>


                  <FormLabel htmlFor='accountid' mt={4}>N??mero de cuenta</FormLabel>
                  <Input id='accountid' type='number'  w="45vw" 
                    {...registerM("accountid", { required: true, pattern: /^[0-9]+$/i })}
                  />
                  {!!errorsM?.accountid  && errorsM.accountid.type==="pattern" &&
                    <div className="error-message">N??mero de cuenta solo debe tener valores numericos enteros.</div>
                  }
                  {!!errorsM?.accountid  && errorsM.accountid.type==="required" &&
                    <div className="error-message">N??mero de cuenta es requerido.</div>
                  }
                  <FormHelperText>N??mero proporcionado por su ejecutivo de cuenta .</FormHelperText>

                  <Button colorScheme='blue' my={3} type="submit">Enviar</Button>
                </FormControl>

              </form>

              { operationReport.length>0 &&    
              <>
              <Heading as='h3' size='lg' my={5} pr={2}>
                Movimientos realizados
              </Heading>
              <Table variant='striped' colorScheme='teal'>
                <TableCaption>Consulta realizada el {new Date().toLocaleString()}</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Operadion ID</Th>
                    <Th>Cliente ID</Th>
                    <Th>Cuenta ID</Th>
                    <Th>Nombre</Th>
                    <Th>Transacci??n</Th>
                    <Th>Monto</Th>
                    <Th>Fecha</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    { operationReport.map( (rep, i: number) =>{
                      return (
                        <Tr key={i}>
                              <Td>{rep.operationID}</Td>
                              <Td>{rep.clientID}</Td>
                              <Td>{rep.accountID}</Td>
                              <Td>{rep.fullName}</Td>
                              <Td>{rep.transaction}</Td>
                              <Td>{rep.amount.toLocaleString('es-MX', {minimumFractionDigits: 2})}</Td>
                              <Td>{new Date(rep.createdAt).toLocaleString()}</Td>
                        </Tr>
                      )
                    })}
                </Tbody>
              </Table>
              </>
              }


              { errorMsg &&
                <Alert status='error'>
                  <AlertIcon />
                  Hubo un problema con su consulta.
                </Alert>
              }

            </TabPanel>

          </TabPanels>
        </Tabs>

        
      </Container>

    </>
  )
}

export default Transactions;

