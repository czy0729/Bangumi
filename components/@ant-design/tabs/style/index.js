import { StyleSheet } from 'react-native'

export default theme =>
  StyleSheet.create({
    container: {
    },
    tabs: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      shadowRadius: 0,
      shadowOpacity: 0,
      elevation: 0
    },
    tab: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      height: theme.tabs_height,
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    underline: {
      height: 2,
      backgroundColor: theme.tabs_color
    },
    textStyle: {
      fontSize: 14
    }
  })
