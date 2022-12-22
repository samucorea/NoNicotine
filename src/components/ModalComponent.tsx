import { Modal, Text } from 'native-base'
import React, { FC, ReactNode } from 'react'
import { ModalProps } from '../sharedTypes'

interface Props {
  title: string
  children: ReactNode
}

const ModalComponent: FC<ModalProps & Props> = ({
  show,
  toggleShow,
  title,
  children,
}) => {
  return (
    <Modal isOpen={show} onClose={toggleShow} size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontSize={'xl'} color="primary.default" bold>
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body p={10}>{children}</Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default ModalComponent
