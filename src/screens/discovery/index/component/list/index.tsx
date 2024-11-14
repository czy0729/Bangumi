/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:51:36
 */
import React from 'react'
import { ListView } from '@components'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import HeaderComponent from '../../header-component'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  const { dragging } = $.state
  return (
    <BlurViewRoot>
      <ListView
        ref={$.forwardRef}
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        progressViewOffset={_.ios(_.statusBarHeight, _.headerHeight)}
        data={$.state.home}
        ListHeaderComponent={<HeaderComponent />}
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
}

export default ob(List, COMPONENT)
