/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:26:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 20:25:48
 */
import React from 'react'
import { View } from 'react-native'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  const { fixed } = $.state
  const elToolBar = <ToolBar />
  return (
    <>
      {fixed && (
        <View style={styles.fixedToolBar}>
          <ToolBar />
        </View>
      )}
      <PaginationList2
        key={$.state.sort}
        contentContainerStyle={!fixed ? styles.contentContainerStyle : _.container.bottom}
        data={$.data}
        limit={24}
        ListHeaderComponent={!fixed && elToolBar}
        renderItem={renderItem}
        onScroll={$.onScroll}
        onPage={$.onPage}
      />
    </>
  )
}

export default ob(List, COMPONENT)
