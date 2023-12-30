/*
 * @Author: czy0729
 * @Date: 2023-12-29 08:47:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 10:08:30
 */
import { _ } from '@stores'
import { getStorage, setStorage } from '@utils'
import { ViewStyle } from '@types'
import { styles } from './styles'
import { Layout } from './types'

export function getIndicatorWidth(indicatorStyle: ViewStyle) {
  const { width } = _.flatten([styles.indicator, indicatorStyle])
  if (typeof width === 'number') return width
  return styles.indicator.width
}

export function setLocalLayout(
  tabBarLocalKey: string,
  data: {
    range: number[]
    layouts: Layout[]
  }
) {
  if (!tabBarLocalKey) return

  setStorage(tabBarLocalKey, data)
}

export function getLocalLayout(tabBarLocalKey: string): Promise<{
  range: number[]
  layouts: Layout[]
}> {
  if (!tabBarLocalKey) return

  return getStorage(tabBarLocalKey)
}
