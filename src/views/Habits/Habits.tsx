import theme from '../../AppTheme'
import React, { useState } from 'react'
import { SquaredIconButton } from '../../components'
import { Fab, Box, Text, VStack } from 'native-base'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import { Entypo, AntDesign } from '@expo/vector-icons'
import AddHabit from './partials/AddHabit'
import Walk from '../../../assets/walking.svg'
import Meditation from '../../../assets/meditation.svg'
import Book from '../../../assets/book.svg'
import { useFocus } from '../../hooks'
import patientService from '../../services/patientService'
// import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'

const Habits: React.FC<MenuScreenProps<'Habits'>> = ({ navigation }) => {
  const [show, setShow] = useState(false)
  const [Habit, setHabit]: any = useState([])
  const isFocused = useFocus(navigation)

  const GetHabitsList: any = async () => {
    const HabitsList = await patientService.getHabits()
    setHabit(HabitsList.data)
  }

  const onShowPopup: any = () => {
    setShow(true)
  }

  const onClosePopup: any = () => {
    setShow(false)
    GetHabitsList()
    console.log('testing')
    console.log(Habit)
  }

  return (
    <VStack flex={1} height={'100%'} paddingX={16} paddingY={2}>
      <Box
        alignItems="center"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent={'space-between'}
      >
        {/* {habitsList.map((habit, index) => (
          <Box key={index} alignSelf="center" marginX={3} marginY={1.5}>
            <SquaredIconButton
              key={index}
              mb={3}
              borderColor={theme.colors.primary.default}
              topRigthButton={
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              }
              label={habit.label}
              labelStyle={{ color: theme.colors.primary.default }}
              subLabel={habit.subLabel}
              Icon={habit.icon}
              onPress={() => {}}
            />
          </Box>
        ))} */}
        {Habit.map((habit: any, index: any) => (
          <Box key={index} alignSelf="center" marginX={3} marginY={1.5}>
            <SquaredIconButton
              key={index}
              mb={3}
              borderColor={theme.colors.primary.default}
              topRigthButton={
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              }
              label={habit.habit.name}
              labelStyle={{ color: theme.colors.primary.default }}
              subLabel={
                <Text>
                  {habit.sunday && 'D '}
                  {habit.monday && ' L '}
                  {habit.tuesday && ' M '}
                  {habit.wednesday && ' M '}
                  {habit.thursday && ' J '}
                  {habit.friday && ' V '}
                  {habit.saturday && ' S'}
                </Text>
              }
              Icon={
                habit.habit.name === 'Salir a caminar'
                  ? Walk
                  : habit.habit.name === 'Meditar'
                  ? Meditation
                  : Book
              }
              onPress={() => {}}
            />
          </Box>
        ))}
      </Box>
      {isFocused && (
        <Fab
          bg={theme.colors.primary.default}
          icon={
            <AntDesign
              name="plus"
              size={24}
              color="white"
              style={{ backgroundColor: theme.colors.primary.default }}
            />
          }
          bottom={90}
          onPress={onShowPopup}
        />
      )}

      <AddHabit
        title="Añadir Habito"
        onTouchOutside={onClosePopup}
        show={show}
      />
    </VStack>
  )
}

export default Habits
