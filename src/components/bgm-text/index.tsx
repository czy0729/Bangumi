/*
 * bgm表情已通过本地工具转换成一种字体，此组件为封装调用字体
 * @Author: czy0729
 * @Date: 2019-08-13 19:46:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 22:57:58
 */
import React from 'react'
import { Text } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { TextStyle } from '@types'
import { bgmMap } from './ds'
import { styles } from './styles'

type Props = {
  /** 图标当成文字一样使用 */
  style?: TextStyle

  /** 表情索引 */
  index?: number

  /** 大小 */
  size?: number

  /** 行高 */
  lineHeight?: number

  children?: string
}

export const BgmText = observer(
  ({ style, index = 0, size = 14, lineHeight, children, ...other }: Props) => {
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
