/*
 * @Author: czy0729
 * @Date: 2021-10-18 11:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:48:44
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import SortMenu from './sort-menu'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SortMenuWrap() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <View style={stl(styles.container, systemStore.setting.discoveryMenuNum < 5 && _.mt.sm)}>
      <SortMenu
        styles={styles}
        orientation={_.orientation}
        dragging={$.state.dragging}
        discoveryMenu={systemStore.setting.discoveryMenu}
        discoveryMenuNum={systemStore.setting.discoveryMenuNum}
        onToggle={$.toggleDragging}
        onSubmit={$.saveDiscoveryMenu}
      />
    </View>
  )
}

export default ob(SortMenuWrap, COMPONENT)
