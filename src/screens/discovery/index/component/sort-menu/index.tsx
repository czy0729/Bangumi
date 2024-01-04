/*
 * @Author: czy0729
 * @Date: 2021-10-18 11:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 15:54:37
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import SortMenu from './sort-menu'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SortMenuWrap(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={stl(styles.container, $.discoveryMenuNum < 5 && _.mt.sm)}>
      <SortMenu
        navigation={navigation}
        styles={styles}
        orientation={_.orientation}
        dragging={$.state.dragging}
        discoveryMenu={$.discoveryMenu}
        discoveryTodayOnair={$.discoveryTodayOnair}
        discoveryMenuNum={$.discoveryMenuNum}
        onToggle={$.toggleDragging}
        onSubmit={$.saveDiscoveryMenu}
      />
    </View>
  )
}

export default obc(SortMenuWrap, COMPONENT)
