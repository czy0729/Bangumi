import { StyleSheet, Platform } from 'react-native'

export default theme =>
  StyleSheet.create({
    popover: {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: { width: 8, height: 8 },
          shadowOpacity: 0.16,
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
    arrowAndroid: {
      borderTopColor: 'transparent'
    },
    background: {
      backgroundColor: 'transparent'
    }
  })
