/*
 * @Author: czy0729
 * @Date: 2023-11-09 08:31:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 08:39:09
 */
import { StyleSheet } from 'react-native'
import { ViewStyle } from '@types'

/** React.createElement 有部分 react-native 中的样式写法不支持, 需要转换 */
export function transformStyles(style: ViewStyle = {}) {
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

  return _style
}
