/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-25 23:09:58
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
  if (id === 'notify') {
    return (
      <ListView
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        data={$.notify}
        renderItem={({ item, index }) => <ItemNotify item={item} index={index} />}
        onHeaderRefresh={$.fetchNotify}
      />
    )
  }

  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$[id] as ListEmpty}
      renderItem={({ item }) => <ItemPM item={item} id={id} />}
      onHeaderRefresh={() => $.fetchPM(true, id)}
      onFooterRefresh={() => $.fetchPM(false, id)}
    />
  )
}

export default obc(List)

function keyExtractor(item, index) {
  return String(index)
}
