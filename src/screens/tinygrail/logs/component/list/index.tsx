/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:36:36
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { feedback } from '@utils'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import ItemsFilter from '../items-filter'
import { createFilteredData, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ title = '全部' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elNoMore = useMemo(
    () => (
      <Flex style={_.mt.sm} justify='center'>
        <Touchable
          style={{
            padding: 8
          }}
          onPress={async () => {
            await $.fetchBalance(false)
            feedback(true)
          }}
        >
          <Text type='tinygrailText'>点击加载更多</Text>
        </Touchable>
      </Flex>
    ),
    [$]
  )

  return (
    <>
      {title === '道具' && <ItemsFilter />}
      <PaginationList
        {...TINYGRAIL_LIST_PROPS}
        data={createFilteredData($.balance, title).list}
        limit={50}
        renderItem={renderItem}
        footerNoMoreDataComponent={elNoMore}
        onHeaderRefresh={$.fetchBalance}
      />
    </>
  )
}

export default observer(List)
