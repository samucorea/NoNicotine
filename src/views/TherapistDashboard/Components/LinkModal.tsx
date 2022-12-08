import { Formik } from 'formik'
import { Box, Modal, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import { object, string } from 'yup'
import { InputField, SendButton } from '../../../components'
import {
  TherapistContextProps,
  useUserContext,
} from '../../../contexts/UserContext'
import { linkService } from '../../../services/linkService'

interface Props {
  show: boolean
  toggleShow: () => void
}

const LinkModal: FC<Props> = ({ show, toggleShow }) => {
  const { user } = useUserContext<TherapistContextProps>() ?? {}

  return (
    <Modal isOpen={show} onClose={toggleShow} size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontSize={'xl'} color="primary.default" bold>
            Vincula un paciente
          </Text>
        </Modal.Header>
        <Modal.Body p={10}>
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
                  console.log(
                    '🚀 ~ file: LinkModal.tsx:36 ~ response',
                    response
                  )
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
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

const validationSchema = object({
  email: string().email().required(),
})

export default LinkModal
