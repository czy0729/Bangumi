/*
 * @Author: czy0729
 * @Date: 2019-04-04 05:24:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 15:51:08
 */
import React from 'react'
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import { stl } from '@utils'
import { Props as FlexProps } from './types'

/**
 * Flex 布局
 * @doc https://github.com/ant-design/ant-design-mobile-rn/blob/3.1.3/components/flex/Flex.tsx
 */
export default class Flex extends React.Component<FlexProps, any> {
  static Item: any

  static defaultProps = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'center'
  }

  render() {
    const { style, direction, wrap, justify, align, children, ...restProps } = this.props
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

    const inner = (
      <View style={stl(flexStyle, style)} {...restProps}>
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
