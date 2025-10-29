/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:09:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:17:09
 */
import React from 'react'
import { Empty, Flex } from '@components'
import { FilterText } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Item from '../../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Grid() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const { list } = $.list
    const { _filter } = $.rank

    return (
      <Flex style={styles.grid} wrap='wrap' align='start'>
        {list.length ? (
          list.map((item, index) => <Item key={item.id} item={item} index={index} />)
        ) : (
          <Empty />
        )}
        {!!_filter && <FilterText value={_filter} />}
      </Flex>
    )
  })
}

export default Grid
