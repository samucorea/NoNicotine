import theme from '../../AppTheme'
import React from 'react'
import {
  HideKeyboardOnForms,
  ScreenHeader,
  ScreenContainer,
  SquaredIconButton,
} from '../../components'
import { ImageSourcePropType } from 'react-native'
import { Fab, Image, Text, VStack } from 'native-base'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import { Entypo, AntDesign } from '@expo/vector-icons'
const Walk: ImageSourcePropType = require('../../../assets/walking.png')
const Meditation: ImageSourcePropType = require('../../../assets/meditation.png')
const Book: ImageSourcePropType = require('../../../assets/book.png')

const Habits: React.FC<MenuScreenProps<'Habits'>> = () => {
  return (
    <VStack
      alignItems="center"
      flexDirection="row"
      flexWrap="wrap"
      height={'100%'}
      justifyContent={'space-between'}
      padding={2}
    >
      {HabitList.map((habit, index) => (
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
          icon={habit.icon}
          onPress={() => {}}
        />
      ))}
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
