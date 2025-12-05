/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:18:21
 */
import React from 'react'
import { View } from 'react-native'
import { Notice, PaginationList2 as PaginationList } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <View style={_.container.header}>
      <ToolBar />
      <PaginationList
        contentContainerStyle={_.container.bottom}
        data={$.data}
        limit={12}
        keyboardDismissMode='on-drag'
        ListHeaderComponent={
          $.data.length ? (
            <Notice>
              共查找到 {$.data.length} 项结果，其中 {$.matchCount} 项匹配成功
            </Notice>
          ) : null
        }
        renderItem={renderItem}
        onPage={$.onPage}
      />
    </View>
  )
}

export default ob(List, COMPONENT)
