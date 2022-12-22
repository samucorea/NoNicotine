import {
  View,
  Text,
  VStack,
  HStack,
  Box,
  Pressable,
  Checkbox,
} from 'native-base'
import { Modal, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Formik } from 'formik'
import theme from '../../../AppTheme'
import React, { useState, FC } from 'react'
import { InputField, SelectInputField } from '../../../components'
import { object, string, array } from 'yup'
import { SendButton } from '../../../components/SendButton'
import habitService from '../../../services/habitService'
import { boolean } from 'yup/lib/locale'
import moment from 'moment'
import patientService from '../../../services/patientService'

const deviceHeight = Dimensions.get('window').height

interface Props {
  title: string
  onTouchOutside: any
  show: boolean
}

const AddHabit: FC<Props> = ({ title, onTouchOutside, show }) => {
  const [showTimePicker, setShowTimePicker] = useState(false)

  const showTime = () => {
    setShowTimePicker(true)
  }

  const close = () => {}

  const renderOutsideTouchable = (onTouch: any) => {
    const view = <View flex={1} width="100%" />
    if (!onTouch) return view
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{ flex: 1, width: '100%' }}
      >
        {view}
      </TouchableWithoutFeedback>
    )
  }

  const renderTitle = () => {
    return (
      <View width={'100%'} height={70} justifyContent="center" bg="#F8F8F8">
        <Text
          color={theme.colors.primary.default}
          fontSize={20}
          fontWeight={700}
          //   margin={10}
        >
          {title}
        </Text>
      </View>
    )
  }

  const renderContent = () => {
    return (
      <Formik
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={{
          habit: '',
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
          hour: '',
          minutes: '',
        }}
        onSubmit={async (values) => {
          const habitName = values.habit

          try {
            const response = await patientService.addHabit({
              name: habitName,
              monday: values.monday,
              tuesday: values.tuesday,
              wednesday: values.wednesday,
              thursday: values.thursday,
              friday: values.friday,
              saturday: values.saturday,
              sunday: values.sunday,
              hour: moment(`${values.hour}:${values.minutes}`, 'hh:mm')
                .toDate()
                .toJSON(),
            })

            console.log(response.data)
          } catch (error: any) {
            console.log(error.response.data)
          }

          onTouchOutside()
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <VStack>
            <SelectInputField
              name={'habit'}
              options={['Salir a caminar', 'Meditar', 'Leer un libro']}
              placeholder="Acción"
            />
            <Text
              fontSize={16}
              fontWeight={400}
              margin={3}
              color={theme.colors.primary.default}
            >
              Horario
            </Text>
            <HStack>
              <Pressable w={'13%'} onPress={close}>
                <InputField name="hour" />
              </Pressable>
              <Text fontSize={34} marginX={2}>
                :
              </Text>
              <Box w={'13%'}>
                <InputField name="minutes" />
              </Box>
            </HStack>

            <HStack marginTop={10}>
              <Checkbox
                value="monday"
                name="monday"
                marginRight={2}
                onChange={(nextValue) => {
                  setFieldValue('monday', nextValue)
                }}
              >
                <Text>L</Text>
              </Checkbox>
              <Checkbox
                value="tuesday"
                name="tuesday"
                marginRight={2}
                onChange={(nextValue) => {
                  setFieldValue('tuesday', nextValue)
                }}
              >
                M
              </Checkbox>
              <Checkbox
                value="wednesday"
                name="wednesday"
                marginRight={2}
                onChange={(nextValue) => {
                  setFieldValue('wednesday', nextValue)
                }}
              >
                M
              </Checkbox>
              <Checkbox
                value="thursday"
                name="thursday"
                marginRight={2}
                onChange={(nextValue) => {
                  setFieldValue('thursday', nextValue)
                }}
              >
                J
              </Checkbox>
              <Checkbox
                value="friday"
                name="friday"
                marginRight={2}
                onChange={(nextValue) => {
                  setFieldValue('friday', nextValue)
                }}
              >
                V
              </Checkbox>
              <Checkbox
                value="saturday"
                name="saturday"
                marginRight={2}
                onChange={(nextValue) => {
                  setFieldValue('saturday', nextValue)
                }}
              >
                S
              </Checkbox>
            </HStack>
            <Checkbox
              value="sunday"
              name="sunday"
              marginRight={2}
              onChange={(nextValue) => {
                setFieldValue('sunday', nextValue)
              }}
            >
              D
            </Checkbox>
            <SendButton
              mb={10}
              text="Agregar"
              onPress={() => {
                handleSubmit()
              }}
            />
          </VStack>
        )}
      </Formik>
    )
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    )
  }

  const renderSeparator = () => {
    ;<View opacity={0.1} height={1} />
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={close}
    >
      <View flex={1} justifyContent="flex-end">
        {renderOutsideTouchable(onTouchOutside)}
        <View
          backgroundColor="#F8F8F8"
          width={'100%'}
          borderWidth={'1'}
          borderTopRightRadius={10}
          borderTopLeftRadius={10}
          paddingX={10}
          maxHeight={deviceHeight * 0.5}
        >
          {renderTitle()}
          {renderContent()}
        </View>
      </View>
    </Modal>
  )
}

const validationSchema = object({
  habit: string()
    .required()
    .oneOf(['Salir a caminar', 'Meditar', 'Leer un libro']),
  hour: string(),
  minutes: string(),
  checked: array(),
})

export default AddHabit
