import { View, Text, VStack, HStack, Box, Pressable } from 'native-base'
import { Modal, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Formik } from 'formik'
import theme from '../../../AppTheme'
import React from 'react'
import { InputField, SelectInputField } from '../../../components'
import { object, string } from 'yup'
import DateTimePicker from '@react-native-community/datetimepicker'

const deviceHeight = Dimensions.get('window').height

export class AddHabit extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      show: false,
      mode: 'time',
      showTimePicker: false,
    }
  }

  show: any = () => {
    this.setState({ show: true })
  }

  close: any = () => {
    this.setState({ show: false })
  }

  showTime: any = () => {
    this.setState({ showTimePicker: true })
  }

  renderOutsideTouchable: any = (onTouch: any) => {
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

  renderTitle = () => {
    const { title } = this.props
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

  renderContent: any = () => {
    return (
      <Formik
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={{ habit: '' }}
        onSubmit={() => {
          return
        }}
      >
        <VStack>
          <SelectInputField
            name={'habitSelection'}
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
            <Pressable w={'13%'} onPress={this.close}>
              <InputField name="hour" />
            </Pressable>
            <Text fontSize={34} marginX={2}>
              :
            </Text>
            <Box w={'13%'}>
              <InputField name="minutes" />
            </Box>
          </HStack>
        </VStack>
      </Formik>
    )
  }

  renderItem: any = ({ item }: { item: any }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    )
  }

  renderSeparator: any = () => {
    ;<View opacity={0.1} height={1} />
  }

  render() {
    let { show } = this.state
    const { onTouchOutisde, title } = this.props

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View flex={1} justifyContent="flex-end">
          {this.renderOutsideTouchable(onTouchOutisde)}
          <View
            backgroundColor="#F8F8F8"
            width={'100%'}
            borderWidth={'1'}
            borderTopRightRadius={10}
            borderTopLeftRadius={10}
            paddingX={10}
            maxHeight={deviceHeight * 0.4}
          >
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    )
  }
}

const validationSchema = object({
  habit: string()
    .required()
    .oneOf(['Salir a caminar', 'Meditar', 'Leer un libro']),
})

export default AddHabit
