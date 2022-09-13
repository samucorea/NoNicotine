import { extendTheme } from 'native-base'

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      default: '#3c5a82',
      ligth: '#8faadc',
    },
    danger: '#ef756d',
  },
})

export default theme
