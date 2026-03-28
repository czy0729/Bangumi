/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-26 02:48:05
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { _, systemStore, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import Dashboard from '../dashboard'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List({ onTouchMove }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  const elHeader = useMemo(() => <Dashboard />, [])

  const { dragging } = $.state

  return (
    <BlurViewRoot>
      <View
        style={styles.wrap}
        onTouchMove={systemStore.setting.live2DV2 ? onTouchMove : undefined}
      >
        <ListView
          ref={$.forwardRef}
          keyExtractor={keyExtractor}
          contentContainerStyle={_.container.bottom}
          progressViewOffset={_.ios(statusBarHeight, headerHeight)}
          data={$.state.home}
          ListHeaderComponent={elHeader}
          showFooter={!dragging && !systemStore.setting.live2DV2}
          scrollEnabled={!dragging}
          scrollEventThrottle={16}
          renderItem={renderItem}
          onScroll={$.onScroll}
          onHeaderRefresh={dragging ? undefined : $.onHeaderRefresh}
        />
      </View>
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default observer(List)
