import { HStack, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import { ModalComponent, SendButton } from '../../../components'
import { useUserContext } from '../../../contexts/UserContext'
import { LinkRequest } from '../../../models/LinkRequest'
import { linkService } from '../../../services/linkService'
import { ModalProps } from '../../../sharedTypes'

const RequestModal: FC<ModalProps & { request: LinkRequest }> = ({
  show,
  toggleShow,
  request,
}) => {
  const { user } = useUserContext()

  const updateLinkRequest = async (accepted: boolean) => {
    try {
      const response = await linkService.updateLinkRequest(
        accepted,
        user!.id,
        request.id
      )
    } catch (error) {
      console.log(
        '🚀 ~ file: RequestModal.tsx:16 ~ updateLinkRequest ~ error',
        error
      )
    }

    toggleShow()
  }

  return (
    <ModalComponent title="Confirmación" show={show} toggleShow={toggleShow}>
      <VStack space={5}>
        <Text color="primary.default">
          confirmar solicitud de vinculación con el terapeuta
          {/* <Text bold>{request.therapist.name}</Text> */}
        </Text>
        <HStack justifyContent={'space-evenly'} direction="row" w="100%">
          <SendButton
            onPress={() => updateLinkRequest(false)}
            text="Cancelar"
            w={'45%'}
            bg="#fff"
            borderColor={'primary.default'}
            borderWidth={1}
            altern
          />
          <SendButton
            onPress={() => updateLinkRequest(true)}
            text="Confirmar"
            w={'45%'}
          />
        </HStack>
      </VStack>
    </ModalComponent>
  )
}

export default RequestModal
