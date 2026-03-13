import * as React from 'react'
import { TouchableOpacity, StyleProp, ViewStyle, ViewProps } from 'react-native'

type Props = ViewProps & {
  onPress: () => void
  onLongPress?: () => void
  delayPressIn?: number
  borderless?: boolean
  pressColor: string
  pressOpacity?: number
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export default class TouchableItem extends React.Component<Props> {
  static defaultProps = {
    pressColor: 'rgba(255, 255, 255, .4)'
  }

  render() {
    const { style, pressOpacity, pressColor, borderless, children, ...rest } =
      this.props

    return (
      <TouchableOpacity {...rest} style={style} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    )
  }
}
