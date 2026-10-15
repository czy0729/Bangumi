/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:16:34
 *
 * 分页模式的列表布局
 */
import { observer } from 'mobx-react'
import { Empty, Entering, Heatmap } from '@components'
import { FilterText } from '@_'
import { useStore } from '@stores'
import { ENTERING_ANIMATIONS_NUM } from '../../ds'
import Item from '../../item'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list } = $.list
  const { _filter } = $.rank

  return (
    <>
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
      <Heatmap id='排行榜.跳转' />
    </>
  )
}

export default observer(List)
