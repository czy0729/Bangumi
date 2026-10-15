/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:09:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:17:09
 *
 * 分页模式的网格布局
 */
import { observer } from 'mobx-react'
import { Empty, Entering, Flex } from '@components'
import { FilterText } from '@_'
import { useStore } from '@stores'
import Item from '../../item'
import { ENTERING_ANIMATIONS_NUM } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Grid() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { list } = $.list
  const { _filter } = $.rank

  return (
    <Flex style={styles.grid} wrap='wrap' align='start'>
      {list.length ? (
        list.map((item, index) => (
          <Entering key={item.id} index={index} num={ENTERING_ANIMATIONS_NUM}>
            <Item item={item} index={index} />
          </Entering>
        ))
      ) : (
        <Empty />
      )}
      {!!_filter && <FilterText value={_filter} />}
    </Flex>
  )
}

export default observer(Grid)
