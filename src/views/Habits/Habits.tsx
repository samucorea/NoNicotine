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

const Habits: React.FC<MenuScreenProps<'Habits'>> = ({ navigation }) => {
  const [show, setShow] = useState(false)
  const isFocused = useFocus(navigation)

  const onShowPopup: any = () => {
    setShow(true)
  }

  const onClosePopup: any = () => {
    setShow(false)
  }

  return (
    <VStack flex={1} height={'100%'} paddingX={16} paddingY={2}>
      <Box
        alignItems="center"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent={'space-between'}
      >
        {HabitList.map((habit, index) => (
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

const HabitList = [
  {
    label: 'Salir a caminar',
    subLabel: (
      <>
        <Text fontSize={'sm'}>lun, mie, jue</Text>
        <Text fontSize={'sm'}>5:00 P.M.</Text>
      </>
    ),
    icon: Walk,
    navigateTo: '',
  },
  {
    label: 'Meditar',
    subLabel: (
      <>
        <Text fontSize={'sm'}>todos los dias</Text>
        <Text fontSize={'sm'}>6:30 P.M.</Text>
      </>
    ),
    icon: Meditation,
    navigateTo: '',
  },
  {
    label: 'Leer un libro',
    subLabel: (
      <>
        <Text fontSize={'sm'}>sáb, dom</Text>
        <Text fontSize={'sm'}>3:30 P.M.</Text>
      </>
    ),
    icon: Book,
    navigateTo: '',
  },
]

export default Habits
