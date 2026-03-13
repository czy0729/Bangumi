/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 14:58:45
 */
import React from 'react'
import { View } from 'react-native'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderGridItem, renderListItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  const { fixed, list } = $.state
  const numColumns = list ? undefined : _.portrait(3, 5)
  const elToolBar = <ToolBar />
  return (
    <>
      {fixed && <View style={styles.fixedToolBar}>{elToolBar}</View>}
      <ListView
        key={`${_.orientation}${numColumns}`}
        keyExtractor={keyExtractor}
        contentContainerStyle={!fixed ? styles.contentContainerStyle : _.container.bottom}
        data={$.list}
        numColumns={numColumns}
        ListHeaderComponent={!fixed && elToolBar}
        renderItem={list ? renderListItem : renderGridItem}
        scrollEventThrottle={16}
        onScroll={$.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchMonoWorks}
      />
    </>
  )
}

export default ob(List, COMPONENT)
