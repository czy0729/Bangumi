/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:11:54
 */
import React from 'react'
import { Flex, ListView, Mesume, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { list, _loaded } = $.reviews
    if (_loaded && !list.length) {
      return (
        <Flex style={styles.empty} direction='column' justify='center'>
          <Mesume />
          <Text style={_.mt.sm} type='sub'>
            好像什么都没有
          </Text>
        </Flex>
      )
    }

    return (
      <ListView
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.page}
        data={$.reviews}
        renderItem={renderItem}
        onScroll={$.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchReviews}
      />
    )
  })
}

export default List
