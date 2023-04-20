/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 16:41:06
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { ListEmpty } from '@types'
import ItemNotify from '../item-notify'
import ItemPM from '../item-pm'
import { Ctx, TabsKey } from '../types'

function List({ id }: { id: TabsKey }, { $ }: Ctx) {
  const passProps = {
    keyExtractor,
    contentContainerStyle: _.container.bottom,
    scrollEventThrottle: 16,
    onScroll: $.onScroll
  }

  if (id === 'notify') {
    return (
      <ListView
        {...passProps}
        data={$.notify}
        renderItem={({ item, index }) => <ItemNotify item={item} index={index} />}
        onHeaderRefresh={$.fetchNotify}
      />
    )
  }

  return (
    <ListView
      {...passProps}
      data={$[id] as ListEmpty}
      renderItem={({ item, index }) => <ItemPM item={item} id={id} index={index} />}
      onHeaderRefresh={() => $.fetchPM(true, id)}
      onFooterRefresh={() => $.fetchPM(false, id)}
    />
  )
}

export default obc(List)

function keyExtractor(item, index) {
  return String(index)
}
