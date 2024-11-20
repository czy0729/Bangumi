/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:49:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 10:30:00
 */
import React from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import Item from '../../_/item'

const EVENT = {
  id: '粘贴板.跳转'
} as const

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      footerEmptyDataText={`您可以复制带有人物链接或id的文本\n进入本页面后会自动获取粘贴板文本中所有角色id\n获取角色数据并生成列表`}
      data={$.list}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop
      renderItem={renderItem}
    />
  )
}

export default ob(List)

function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}
