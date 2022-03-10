/*
 * @Author: czy0729
 * @Date: 2022-03-10 02:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-10 05:30:00
 */
import { Animated } from 'react-native'

const { multiply } = Animated

export const routesConfig = {
  Discovery: {
    icon: 'home',
    size: 19,
    label: '发现'
  },
  Timeline: {
    icon: 'md-access-time',
    size: 21,
    label: '时间胶囊'
  },
  Home: {
    icon: 'md-star-outline',
    label: '收藏'
  },
  Rakuen: {
    icon: 'md-chat-bubble-outline',
    size: 19,
    label: '超展开'
  },
  User: {
    icon: 'md-person-outline',
    label: '时光机'
  }
}

/**
 * Standard iOS-style slide in from the right.
 */
export function forHorizontalIOS({ current, next, inverted, layouts: { screen } }) {
  const translateFocused = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: 'clamp'
    }),
    inverted
  )

  const translateUnfocused = next
    ? multiply(
        next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, screen.width * -0.24],
          extrapolate: 'clamp'
        }),
        inverted
      )
    : 0

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.07],
    extrapolate: 'clamp'
  })

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp'
  })

  return {
    cardStyle: {
      transform: [
        // Translation for the animation of the current card
        {
          translateX: translateFocused
        },
        // Translation for the animation of the card on top of this
        {
          translateX: translateUnfocused
        }
      ]
    },
    overlayStyle: {
      opacity: overlayOpacity
    },
    shadowStyle: {
      shadowOpacity
    }
  }
}
