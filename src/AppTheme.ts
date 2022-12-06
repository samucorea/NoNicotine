import { extendTheme } from 'native-base'

const defaultPrimaryColor = '#3c5a82'

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      default: defaultPrimaryColor,
      light: '#8faadc',
    },
    subText: {
      primary: '#889ab3',
    },
    danger: '#ef756d',

    message: {
      sent: '#97acc9',
      received: '#adb9ca',
    },
  },
  components: {
    Box: {
      baseStyle: {
        bg: '#FFFFFF',
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'Lato-Regular',
      },
      variants: {
        previewLabel: {
          color: defaultPrimaryColor,
          fontSize: 'md',
        },
        previewValue: {
          color: defaultPrimaryColor,
          bold: true,
          fontSize: 'lg',
        },
      },
    },
    VStack: { variants: { previewVStack: { space: 2 } } },
    Input: {
      variants: {
        date: {
          rounded: 10,
          textAlign: 'center',
          borderWidth: 1,
        },
      },
    },
  },
})

export default theme
