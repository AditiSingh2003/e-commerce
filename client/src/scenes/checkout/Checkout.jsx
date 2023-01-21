import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material'
import { Formik} from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import {shades} from '../../theme'

const initialValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  shipingAddress: {
    isSameAsBilling: true,
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  email:"",
  phoneNumber:"",
}

const checkoutSchema = [yup.object().shape({
  billingAddress: yup.object().shape({
    
      firstName: '',
      lastName: '',
      country: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
    })
})  
]

const Checkout = () => {

  const [activeStep, setActiveStep] = useState(0)
  const cart = useSelector((state) => state.cart.cart)
  const isFirstStep = activeStep === 0
  const isSecondStep = activeStep === 1

  const handleFormSubmit = async (value, actions) =>{
    setActiveStep(activeStep + 1);
  }

  return (
    <Box width="80%" m="100px auto" >
      <Stepper activeStep={activeStep} sx={{ m : "20px 0"}}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>

        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          
        </Formik>
      </Box>

    </Box>
  )
}

export default Checkout
