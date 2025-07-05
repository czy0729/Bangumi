/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:06:53
 */
import React, { useMemo } from 'react'
import { Flex, Text, Touchable } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import { Ctx } from '../../types'
import ItemsFilter from '../items-filter'
import { createFilteredData, renderItem } from './utils'
import { COMPONENT } from './ds'
import { Props } from './types'

function List({ title = '全部' }: Props) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const elNoMore = useMemo(
      () => (
        <Flex style={_.mt.sm} justify='center'>
          <Touchable
            style={{
              padding: 8
            }}
            onPress={() => {
              $.fetchBalance(false)
            }}
          >
            <Text type='tinygrailText'>点击加载更多</Text>
          </Touchable>
        </Flex>
      ),
      []
    )

    return (
      <>
        {title === '道具' && <ItemsFilter />}
        <PaginationList2
          {...TINYGRAIL_LIST_PROPS}
          data={createFilteredData($.balance, title).list}
          limit={50}
          renderItem={renderItem}
          footerNoMoreDataComponent={elNoMore}
          onHeaderRefresh={$.fetchBalance}
        />
      </>
    )
  })
}

export default List
