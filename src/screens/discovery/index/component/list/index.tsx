/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 20:21:40
 */
import React, { useMemo } from 'react'
import { ListView } from '@components'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { _, systemStore, useStore } from '@stores'
import { useInsets, useObserver } from '@utils/hooks'
import HeaderComponent from '../../header-component'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  const elHeader = useMemo(() => <HeaderComponent />, [])

  return useObserver(() => {
    const { dragging } = $.state

    return (
      <BlurViewRoot>
        <ListView
          ref={$.forwardRef}
          keyExtractor={keyExtractor}
          contentContainerStyle={_.container.bottom}
          progressViewOffset={_.ios(statusBarHeight, headerHeight)}
          data={$.state.home}
          ListHeaderComponent={elHeader}
          showFooter={!dragging && !systemStore.setting.live2D}
          scrollEnabled={!dragging}
          scrollEventThrottle={16}
          renderItem={renderItem}
          onScroll={$.onScroll}
          onHeaderRefresh={dragging ? undefined : $.onHeaderRefresh}
        />
        <BlurViewBottomTab />
      </BlurViewRoot>
    )
  })
}

export default List
