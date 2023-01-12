import { Formik } from 'formik'
import { Box, Modal, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
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

  const { t } = useTranslation()

  return (
    <ModalComponent
      show={show}
      title={t('therapistDashboard.linkModal.title')!}
      toggleShow={toggleShow}
    >
      <VStack space={5}>
        <Text color="primary.default">
          {t('therapistDashboard.linkModal.disclaimer')!}
        </Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async ({ email }) => {
            try {
              const response = await linkService.makeLinkRequest(
                user!.identityUserId!,
                email
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
                placeholder={
                  t('therapistDashboard.linkModal.emailPlaceholder')!
                }
              />
              <SendButton
                onPress={() => handleSubmit()}
                text={t('therapistDashboard.linkModal.sendButton')!}
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
