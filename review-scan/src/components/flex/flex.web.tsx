/*
 * @Author: czy0729
 * @Date: 2023-06-01 01:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-12 10:33:28
 */
import React from 'react'
import { View, ViewStyle } from 'react-native'
import { stl } from '@utils'
import { Props as FlexProps } from './types'

/** Flex 布局 */
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
      // @ts-ignore
      zIndex: 'unset',
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: transferConstStyle[0],
      alignItems: transferConstStyle[1]
    }
    if (wrap === 'wrap') flexStyle.maxWidth = '100%'

    return (
      <View style={stl(flexStyle, style)} {...restProps}>
        {children}
      </View>
    )
  }
}
