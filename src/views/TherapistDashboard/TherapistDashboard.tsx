import React from 'react'
import { VStackContainer } from '../../components'
import Patient from './Components/Patient'

const TherapistDashboard = () => {
  return (
    <VStackContainer>
      <Patient name="Juan" lastMessage="Hola" />
    </VStackContainer>
  )
}

export default TherapistDashboard
