/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:21:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:20:07
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconEpFilter() {
  const { $ } = useStore<Ctx>()

  if (($.eps.length || 0) < 160) return null

  const { filterEps } = $.state

  return (
    <Popover style={styles.touch} data={$.filterEpsData} onSelect={$.updateFilterEps}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-filter-list' />
        {!!filterEps && (
          <Text style={styles.text} type='sub' size={12} bold>
            {filterEps}
          </Text>
        )}
      </Flex>
      <Heatmap right={-6} bottom={18} id='条目.设置章节筛选' />
    </Popover>
  )
}

export default observer(IconEpFilter)
