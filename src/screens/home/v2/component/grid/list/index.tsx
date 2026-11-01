/*
 * @Author: czy0729
 * @Date: 2022-11-21 06:55:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 23:47:44
 */
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { _, systemStore, useStore } from '@stores'
import { memoStyles } from '../styles'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { ItemType } from '../../list/types'
import type { Props } from './types'

function List({ title }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)

  // 网格 numColumns>1 时 getItemLayout 按「行」索引调用, estimatedItemHeight 须传「行高」估算值
  // (高度缓存前 ceil(len/numColumns) 个槽位与行索引一一对应, 可正常工作, 先例见 discovery/character);
  // 此处暂未接入
  return (
    <PaginationList
      key={`${_.orientation}${numColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={$.currentCollection(title).list as ItemType[]}
      progressViewOffset={20}
      limit={systemStore.setting.homeGridCoverLayout === 'square' ? 20 : 16}
      numColumns={numColumns}
      renderItem={renderItem}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default observer(List)
