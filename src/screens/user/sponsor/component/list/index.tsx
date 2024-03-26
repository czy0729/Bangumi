/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:27:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-10 13:53:46
 */
import React from 'react'
import { Text } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TEXT_UPDATE_SPONSOR } from '@constants'
import { LIST } from '../../ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={LIST}
      numColumns={2}
      limit={40}
      ListHeaderComponent={
        <Text style={[_.mt.sm, _.mb.md]} size={12} bold align='center'>
          截止至 {TEXT_UPDATE_SPONSOR} 共 {LIST.length} 人投食了，感谢你们的支持！
        </Text>
      }
      renderItem={renderItem}
    />
  )
}

export default obc(List, COMPONENT)
