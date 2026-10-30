/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * 吐槽对话列表
 */
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { useListScroll, useRenderItem } from './hooks'
import { keyExtractor } from './utils'
import { COMPONENT, ENTERING_EXITING_ANIMATIONS_NUM } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Chat() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { handleListViewRef } = useListScroll()
  const renderItem = useRenderItem()

  return (
    <ListView
      ref={handleListViewRef}
      keyExtractor={keyExtractor}
      skipEnteringExitingAnimations={ENTERING_EXITING_ANIMATIONS_NUM}
      style={_.container.screen}
      contentContainerStyle={styles.container}
      data={$.say}
      inverted
      renderItem={renderItem}
      showFooter={false}
      onScroll={$.onScroll}
    />
  )
}

export default observer(Chat)
