/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:48:52
 */
import React from 'react'
import { ListView } from '@components'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import HeaderComponent from '../../header-component'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List(_props, { $ }: Ctx) {
  const { dragging } = $.state
  return (
    <BlurViewRoot>
      <ListView
        ref={$.forwardRef}
        keyExtractor={keyExtractor}
        style={_.container.flex}
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

export default obc(List, COMPONENT)
