import { Box, Text, Image, HStack, Center } from 'native-base'
import React, { FC, ReactNode } from 'react'
import { ImageSourcePropType } from 'react-native'

interface SectionContent {
  leftIcon?: ImageSourcePropType
  rigthIcon?: ImageSourcePropType
  content: ReactNode
}

export interface InfoSectionProps {
  sectionTitle: string
  sectionItems: SectionContent[]
}

const InfoSection: FC<InfoSectionProps & { key: any }> = ({
  sectionTitle,
  sectionItems,
  key,
}) => {
  const borderRadius = 'xl'

  return (
    <Box mb={'3'} key={key}>
      <Text bold pl={'4'} pb={'1'} color={'primary.default'}>
        {sectionTitle}
      </Text>
      {sectionItems.map((item, index) => (
        <HStack
          shadow={index + 1 === sectionItems.length ? '8' : undefined}
          rounded={borderRadius}
          borderTopRadius={index === 0 ? borderRadius : 'none'}
          borderBottomRadius={
            index + 1 === sectionItems.length ? borderRadius : 'none'
          }
          borderColor={'#949494'}
          borderWidth="1"
          borderTopWidth={index === 0 ? '1' : '0'}
          py={'3'}
          alignItems={'center'}
          key={index}
          bg={'#f8f8f8'}
        >
          {item.leftIcon !== undefined && (
            <Center bg={'#f8f8f8'} flex="2">
              <Image source={item.leftIcon} alt="leftIcon" />
            </Center>
          )}
          <Box bg={'#f8f8f8'} flex="8">
            {item.content}
          </Box>
          {item.rigthIcon !== undefined && (
            <Center bg={'#f8f8f8'} flex="2">
              <Image source={item.rigthIcon} alt="rightIcon" />
            </Center>
          )}
        </HStack>
      ))}
    </Box>
  )
}

export default InfoSection
