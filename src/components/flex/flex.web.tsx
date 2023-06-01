/*
 * @Author: czy0729
 * @Date: 2023-06-01 01:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-01 01:50:21
 */
import React from 'react'
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { Props as FlexProps } from './types'

export default class Flex extends React.Component<FlexProps, any> {
  static Item: any

  static defaultProps = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'center'
  }

  render() {
    const { style, direction, wrap, justify, align, children, ...restProps } =
      this.props
    const transferConst = [justify, align]
    const transferConstStyle = transferConst.map(el => {
      let tempTxt
      switch (el) {
        case 'start':
          tempTxt = 'flex-start'
          break
        case 'end':
          tempTxt = 'flex-end'
          break
        case 'between':
          tempTxt = 'space-between'
          break
        case 'around':
          tempTxt = 'space-around'
          break
        default:
          tempTxt = el
          break
      }

      return tempTxt
    })
    const flexStyle: ViewStyle = {
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: transferConstStyle[0],
      alignItems: transferConstStyle[1]
    }
    if (wrap === 'wrap') {
      flexStyle.maxWidth = '100vw'
    }

    const inner = (
      <View style={[flexStyle, style]} {...restProps}>
        {children}
      </View>
    )

    const shouldWrapInTouchableComponent =
      // @ts-expect-error
      restProps.onPress ||
      // @ts-expect-error
      restProps.onLongPress ||
      // @ts-expect-error
      restProps.onPressIn ||
      // @ts-expect-error
      restProps.onPressOut

    if (shouldWrapInTouchableComponent) {
      return <TouchableWithoutFeedback {...restProps}>{inner}</TouchableWithoutFeedback>
    } else {
      return inner
    }
  }
}
