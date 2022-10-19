/*
 * bgm表情已通过本地工具转换成一种字体，此组件为封装调用字体
 * @Author: czy0729
 * @Date: 2019-08-13 19:46:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 13:41:35
 */
import React from 'react'
import { Text } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { TextStyle } from '@types'
import { bgmMap } from './ds'
import { styles } from './styles'
import { Props as BgmTextProps } from './types'

export { BgmTextProps, bgmMap }

export const BgmText = observer(
  ({ style, index = 0, size = 14, lineHeight, children, ...other }: BgmTextProps) => {
    const _style: TextStyle[] = [styles.text]
    if (size) _style.push(styles[size])
    if (lineHeight !== undefined) {
      _style.push({
        lineHeight: lineHeight <= 2 ? lineHeight * size : lineHeight * _.lineHeightRatio
      })
    }
    if (style) _style.push(style)

    return (
      <Text style={_style} allowFontScaling={false} selectable {...other}>
        {children || bgmMap[index - 1]}
      </Text>
    )
  }
)
