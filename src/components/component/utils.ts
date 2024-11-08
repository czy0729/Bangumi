/*
 * @Author: czy0729
 * @Date: 2023-11-09 08:31:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 04:38:55
 */
import { StyleSheet } from 'react-native'
import { ViewStyle } from '@types'
import { Text } from '../text'
import { Props } from './types'

const PROPERTY_MAPPINGS = [
  { original: 'paddingVertical', properties: ['paddingTop', 'paddingBottom'] },
  { original: 'paddingHorizontal', properties: ['paddingLeft', 'paddingRight'] },
  { original: 'marginVertical', properties: ['marginTop', 'marginBottom'] },
  { original: 'marginHorizontal', properties: ['marginLeft', 'marginRight'] }
] as const

/** React.createElement 有部分 react-native 中的样式写法不支持, 需要转换 */
export function transformStyles(style: ViewStyle = {}, Component?: any) {
  const styles = StyleSheet.flatten(style)

  PROPERTY_MAPPINGS.forEach(({ original, properties }) => {
    if (original in styles) {
      properties.forEach((property: string) => {
        if (!(property in styles)) styles[property] = styles[original]
      })
    }
  })

  if (!('position' in styles)) styles.position = 'relative'

  if ('height' in styles) {
    // 必须是块组件才能有高度
    // @ts-ignore
    if (!('display' in styles)) styles.display = 'block'
  } else if (Component && Component === Text) {
    // 若子组件都是文字
    // @ts-ignore
    // if (!('display' in styles)) styles.display = 'inline-block'
  }

  return styles
}

/** 将驼峰式命名的字符串转换为短横线连接的形式 */
export function convertToDashCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/** [DEV] 获取组件在 vscode 的路径 */
export function getVscodeFullPathToFile(id: Props['id']) {
  let fullPathToFile = `vscode://file/Users/chen/Bangumi32/src`
  const pathMapping = {
    'component-': '/component/',
    'base-': '/screens/_/base/',
    'item-': '/screens/_/item/',
    'icon-': '/screens/_/icon/'
  }

  for (const prefix in pathMapping) {
    if (id.startsWith(prefix)) {
      fullPathToFile += id.replace(prefix, pathMapping[prefix])
      fullPathToFile += '/index.tsx'
      return fullPathToFile
    }
  }

  if (id.startsWith('screen-')) {
    fullPathToFile += id.replace('screen-', '/screens/')
  }

  return fullPathToFile
}
