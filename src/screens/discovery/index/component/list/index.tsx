/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 14:10:06
 */
import React from 'react'
import { ListView } from '@components'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { WSA } from '@constants'
import { Ctx } from '../../types'
import HeaderComponent from '../../header-component'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List({ isFocused }, { $ }: Ctx) {
  return (
    <BlurViewRoot>
      <ListView
        ref={$.forwardRef}
        keyExtractor={keyExtractor}
        style={_.container.flex}
        contentContainerStyle={_.container.bottom}
        data={$.state.home}
        ListHeaderComponent={<HeaderComponent />}
        showFooter={!systemStore.setting.live2D && !$.state.dragging}
        renderItem={renderItem}
        scrollToTop={WSA || isFocused}
        scrollEnabled={!$.state.dragging}
        scrollEventThrottle={4}
        onScroll={$.onScroll}
      />
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default obc(List, COMPONENT)
