/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-17 05:35:53
 */
import React, { useCallback } from 'react'
import { Button, Heatmap } from '@components'
import { KeyboardDismiss, Popover } from '@_'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { MODEL_SEARCH_CAT, SEARCH_CAT } from '@constants'
import { SearchCatCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

const DATA = SEARCH_CAT.map(item => item.label)

function Category({ onFocus }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const handleSelect = useCallback(
    (label: string) => {
      $.onSelect(label)
      setTimeout(() => {
        onFocus()
      }, 0)
    },
    [$, onFocus]
  )

  return useObserver(() => (
    <Popover style={styles.touch} data={DATA} onSelect={handleSelect}>
      <KeyboardDismiss>
        <Button style={styles.btn} styleText={styles.text} size='sm' type='ghostMain'>
          {MODEL_SEARCH_CAT.getLabel<SearchCatCn>($.state.cat)}
        </Button>
      </KeyboardDismiss>
      <Heatmap id='搜索.切换类型' />
    </Popover>
  ))
}

export default Category
