import theme from '../../AppTheme'
import React from 'react'
import { SquaredIconButton } from '../../components'
import { ImageSourcePropType } from 'react-native'
import { Fab, Box, Text, VStack } from 'native-base'
import { MenuScreenProps } from '../../routes/MenuNavigator'
import { Entypo, AntDesign } from '@expo/vector-icons'
import AddHabit from './partials/AddHabit'
const Walk: ImageSourcePropType = require('../../../assets/walking.png')
const Meditation: ImageSourcePropType = require('../../../assets/meditation.png')
const Book: ImageSourcePropType = require('../../../assets/book.png')

const Habits: React.FC<MenuScreenProps<'Habits'>> = () => {
  let popupRef: any = React.createRef()

  const onShowPopup: any = () => {
    popupRef.show()
  }

  const onClosePopup: any = () => {
    popupRef.close()
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
          <Box alignSelf="center" marginX={3} marginY={1.5}>
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
          </Box>
        ))}
      </Box>
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
      <AddHabit
        title="Añadir Habito"
        ref={(target: any) => (popupRef = target)}
        onTouchOutside={onClosePopup}
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
