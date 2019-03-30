import { StyleSheet, Platform } from 'react-native'

export default theme =>
  StyleSheet.create({
    popover: {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: { height: 16 },
          shadowOpacity: 0.12,
          shadowRadius: 16
        }
      })
    },
    content: {
      padding: 0,
      backgroundColor: theme.fill_base,
      borderRadius: 8,
      elevation: 2,
      overflow: 'hidden'
    },
    arrow: {
      borderTopColor: '#ffffff'
    },
    background: {
      backgroundColor: 'transparent'
    }
  })
