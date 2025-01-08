/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:27:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 10:42:08
 */
import React from 'react'
import { Text } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TEXT_UPDATE_SPONSOR } from '@constants'
import { LIST } from '../../ds'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.page}
      data={LIST}
      numColumns={2}
      limit={40}
      ListHeaderComponent={
        <Text style={[_.mt.sm, _.mb.md]} size={12} bold align='center'>
          截止至 {TEXT_UPDATE_SPONSOR} 共 {LIST.length} 人投食了，感谢你们的支持！
        </Text>
      }
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  )
}

export default ob(List, COMPONENT)
