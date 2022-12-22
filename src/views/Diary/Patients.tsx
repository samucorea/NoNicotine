import { FlatList } from 'native-base'
import React, { FC } from 'react'
import { ScreenContainer, SquaredIconButton } from '../../components'
import ProfileIcon from '../../../assets/profile.svg'
import { DiaryScreenProps } from '../../routes/Diary/DiaryNavigator'
import {
  TherapistContextProps,
  useUserContext,
} from '../../contexts/UserContext'

const Patients: FC<DiaryScreenProps<'Patients'>> = ({ navigation }) => {
  const { user } = useUserContext<TherapistContextProps>() ?? {}
  console.log('🚀 ~ file: Patients.tsx:13 ~ user', user?.patients)

  return (
    <ScreenContainer
      borderTopColor={'#949494'}
      borderTopWidth={1}
      containerProps={{ maxW: '85%' }}
    >
      <FlatList
        data={user?.patients}
        renderItem={({ item: { name, id } }) => (
          <SquaredIconButton
            Icon={ProfileIcon}
            label={name}
            my={3.5}
            w="45%"
            shadow={7}
            borderColor={'primary.default'}
            onPress={() =>
              navigation.navigate('Diary', {
                patientName: name,
                patientId: id,
              })
            }
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
