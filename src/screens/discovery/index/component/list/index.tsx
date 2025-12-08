/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:51:36
 */
import React, { useMemo } from 'react'
import { ListView } from '@components'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import HeaderComponent from '../../header-component'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elHeader = useMemo(() => <HeaderComponent />, [])

  return useObserver(() => {
    const { dragging } = $.state

    return (
      <BlurViewRoot>
        <ListView
          ref={$.forwardRef}
          keyExtractor={keyExtractor}
          contentContainerStyle={_.container.bottom}
          progressViewOffset={_.ios(_.statusBarHeight, _.headerHeight)}
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
