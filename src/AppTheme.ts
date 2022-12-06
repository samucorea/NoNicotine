import { extendTheme } from 'native-base'

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      default: '#3c5a82',
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
    },
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
