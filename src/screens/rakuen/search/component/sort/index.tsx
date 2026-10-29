/*
 * @Author: czy0729
 * @Date: 2026-10-29 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 05:14:05
 *
 * 搜索排序选择
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Button, Heatmap } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { SORT_DS, SORT_LABELS } from '../../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Sort() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (label?: string) => {
      if (label) $.onSortChange(label)
    },
    [$]
  )

  return (
    <Popover
      style={styles.touch}
      data={SORT_DS}
      value={SORT_LABELS[$.state.sort]}
      onSelect={handleSelect}
    >
      <Button style={styles.btn} styleText={styles.text} type='ghostMain' size='sm'>
        {SORT_LABELS[$.state.sort] || SORT_DS[0]}
      </Button>
      <Heatmap id='帖子搜索.排序' />
    </Popover>
  )
}

export default observer(Sort)
