/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:27:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-09 01:35:46
 */
import React from 'react'
import { Text } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ListItem from '../list-item'
import { LIST } from '../ds'

function List() {
  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={(item: any) => String(item.data)}
      data={LIST}
      numColumns={2}
      limit={40}
      ListHeaderComponent={
        <Text style={[_.mt.sm, _.mb.md]} size={12} bold align='center'>
          截止至 2023-06-09 共 {LIST.length} 人投食了，感谢你们的支持！
        </Text>
      }
      renderItem={renderItem}
    />
  )
}

export default obc(List)

function renderItem({ item }) {
  return <ListItem item={item} />
}
