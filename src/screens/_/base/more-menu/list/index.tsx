/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 *
 * 菜单列表
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ScrollView } from '@components'
import { _ } from '@stores'
import Item from '../item'
import { memoStyles } from './styles'

import type { Props } from './types'

function List({ all, bottom, visibleMenus, hiddenMenus }: Props) {
  const styles = memoStyles()

  return (
    <ScrollView
      style={_.container.flex}
      contentContainerStyle={[styles.contentContainerStyle, { paddingBottom: _.lg + bottom }]}
    >
      {all && visibleMenus.map(item => <Item key={item.key} item={item} />)}
      {all && !!visibleMenus.length && !!hiddenMenus.length && (
        <View style={styles.dividerWrap}>
          <View style={styles.divider} />
        </View>
      )}
      {hiddenMenus.map(item => (
        <Item key={item.key} item={item} />
      ))}
    </ScrollView>
  )
}

export default observer(List)
