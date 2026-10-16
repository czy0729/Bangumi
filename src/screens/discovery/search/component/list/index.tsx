/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 17:55:08
 *
 * 搜索结果列表
 */
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ITEM_SEARCH_HEIGHT } from '@_'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ENTERING_ANIMATIONS_NUM } from '../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.search._loaded) return null

  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={$.search}
      estimatedItemHeight={ITEM_SEARCH_HEIGHT}
      skipEnteringExitingAnimations={ENTERING_ANIMATIONS_NUM}
      keyboardDismissMode='on-drag'
      renderItem={renderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.doSearch}
    />
  )
}

export default observer(List)
