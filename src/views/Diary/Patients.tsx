import { FlatList } from 'native-base'
import React, { FC } from 'react'
import { ScreenContainer, SquaredIconButton } from '../../components'
import ProfileIcon from '../../../assets/profile.svg'
import { DiaryScreenProps } from '../../routes/Diary/DiaryNavigator'

const Patients: FC<DiaryScreenProps<'Patients'>> = ({ navigation }) => {
  const data = [
    { icon: ProfileIcon, label: 'Juan Perez' },
    { icon: ProfileIcon, label: 'Juan Perez' },
    { icon: ProfileIcon, label: 'Juan Perez' },
    { icon: ProfileIcon, label: 'Juan Perez' },
    { icon: ProfileIcon, label: 'Juan Perez' },
    { icon: ProfileIcon, label: 'Juan Perez' },
    { icon: ProfileIcon, label: 'Juan Perez' },
    { icon: ProfileIcon, label: 'Juan Perez' },

    { icon: ProfileIcon, label: 'Juan Perez' },

    { icon: ProfileIcon, label: 'Juan Perez' },
  ]

  return (
    <ScreenContainer
      borderTopColor={'#949494'}
      borderTopWidth={1}
      containerProps={{ maxW: '85%' }}
    >
      <FlatList
        data={data}
        renderItem={({ item: { icon, label } }) => (
          <SquaredIconButton
            Icon={icon}
            label={label}
            my={3.5}
            w="45%"
            shadow={7}
            borderColor={'primary.default'}
            onPress={() => navigation.navigate('Diary', { patientName: label })}
          />
        )}
        numColumns={2}
        w="full"
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  )
}

export default Patients
