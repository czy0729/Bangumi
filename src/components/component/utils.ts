/*
 * @Author: czy0729
 * @Date: 2023-11-09 08:31:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 04:38:55
 */
import { StyleSheet } from 'react-native'
import { ViewStyle } from '@types'
import { Text } from '../text'

/** React.createElement 有部分 react-native 中的样式写法不支持, 需要转换 */
export function transformStyles(style: ViewStyle = {}, Component?: any) {
  const _style = StyleSheet.flatten(style)

  const propertyMappings = [
    { original: 'paddingVertical', properties: ['paddingTop', 'paddingBottom'] },
    { original: 'paddingHorizontal', properties: ['paddingLeft', 'paddingRight'] },
    { original: 'marginVertical', properties: ['marginTop', 'marginBottom'] },
    { original: 'marginHorizontal', properties: ['marginLeft', 'marginRight'] }
  ]

  propertyMappings.forEach(({ original, properties }) => {
    if (original in _style) {
      const value = _style[original]
      properties.forEach(property => {
        if (!(property in _style)) {
          _style[property] = value
        }
      })
    }
  })

  if (!('position' in _style)) _style.position = 'relative'

  if ('height' in _style) {
    // 必须是块组件才能有高度
    // @ts-ignore
    if (!('display' in _style)) _style.display = 'block'
  } else if (Component && Component === Text) {
    // 若子组件都是文字
    // @ts-ignore
    // if (!('display' in _style)) _style.display = 'inline-block'
  }

  return _style
}

/** 将驼峰式命名的字符串转换为短横线连接的形式 */
export function convertToDashCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
