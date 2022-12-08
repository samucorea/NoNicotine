import { Formik } from 'formik'
import { Box, Modal, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import { object, string } from 'yup'
import { InputField, ModalComponent, SendButton } from '../../../components'
import {
  TherapistContextProps,
  useUserContext,
} from '../../../contexts/UserContext'
import { linkService } from '../../../services/linkService'
import { ModalProps } from '../../../sharedTypes'

const LinkModal: FC<ModalProps> = ({ show, toggleShow }) => {
  const { user } = useUserContext<TherapistContextProps>() ?? {}

  return (
    <ModalComponent
      show={show}
      title="Vincula un paciente"
      toggleShow={toggleShow}
    >
      <VStack space={5}>
        <Text color="primary.default">
          Ingresa la dirección de correo electrónico de tu paciente para
          enviarle una solicitud de vinculación
        </Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async ({ email }) => {
            try {
              const response = await linkService.makeLinkRequest(
                user!.identityUserId!,
                email
              )
              console.log('🚀 ~ file: LinkModal.tsx:36 ~ response', response)
              toggleShow()
            } catch (error) {
              console.log('🚀 ~ file: LinkModal.tsx:37 ~ error', error)
            }
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <InputField
                name="email"
                mb={5}
                placeholder="Correo electrónico"
              />
              <SendButton
                onPress={() => handleSubmit()}
                text="Enviar solicitud"
              />
            </>
          )}
        </Formik>
      </VStack>
    </ModalComponent>
  )
}

const validationSchema = object({
  email: string().email().required(),
})

export default LinkModal
