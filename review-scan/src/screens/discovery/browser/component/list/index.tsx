/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:22:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-25 21:06:00
 */
import React from 'react'
import { View } from 'react-native'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  const { fixed } = $.state
  const elToolbar = <ToolBar />
  const numColumns = $.isList ? undefined : _.portrait(3, 5)
  return (
    <>
      {fixed && <View style={styles.fixedToolBar}>{elToolbar}</View>}
      {!!$.list._loaded && (
        <ListView
          key={`${$.state.layout}${numColumns}`}
          keyExtractor={keyExtractor}
          ref={$.forwardRef}
          contentContainerStyle={!fixed ? styles.contentContainerStyle : _.container.bottom}
          numColumns={numColumns}
          data={$.list}
          ListHeaderComponent={!fixed && elToolbar}
          renderItem={renderItem}
          scrollEventThrottle={16}
          onScroll={$.onScroll}
          onHeaderRefresh={$.onHeaderRefresh}
          onFooterRefresh={$.fetchBrowser}
        />
      )}
    </>
  )
}

export default ob(List, COMPONENT)
