/*
 * @Doc: https://github.com/ant-design/ant-design-mobile-rn/blob/3.1.3/components/flex/FlexItem.tsx
 * @Author: czy0729
 * @Date: 2023-04-11 12:49:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:51:45
 */
import React, { ReactNode } from 'react'
import { StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { WEB } from '@constants'

interface FlexItemPropsType {
  disabled?: boolean
  children?: ReactNode
}

export interface FlexItemProps extends FlexItemPropsType {
  flex?: number
  onPress?: () => void
  onLongPress?: () => void
  onPressIn?: () => void
  onPressOut?: () => void
  style?: StyleProp<ViewStyle>
}

export default class FlexItem extends React.Component<FlexItemProps, any> {
  static defaultProps = {
    flex: 1
  }

  render() {
    const { style, children, flex, ...restProps } = this.props
    const flexItemStyle: ViewStyle = {
      flex: flex || 1
    }
    if (WEB) flexItemStyle.width = '100%'

    // support other touchablewithoutfeedback props
    // TODO  support TouchableHighlight
    const inner = (
      <View style={[flexItemStyle, style]} {...restProps}>
        {children}
      </View>
    )

    const shouldWrapInTouchableComponent =
      restProps.onPress || restProps.onLongPress || restProps.onPressIn || restProps.onPressOut

    if (shouldWrapInTouchableComponent) {
      return <TouchableWithoutFeedback {...restProps}>{inner}</TouchableWithoutFeedback>
    } else {
      return inner
    }
  }
}
