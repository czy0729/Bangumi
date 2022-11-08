/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:49:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 17:38:13
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Item from '../../_/item'
import { Ctx } from '../types'

const EVENT = {
  id: '粘贴板.跳转'
} as const

function List(props, { $ }: Ctx) {
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

export default obc(List)

function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}
