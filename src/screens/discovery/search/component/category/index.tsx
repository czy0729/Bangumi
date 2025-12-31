/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 02:51:09
 */
import React, { useCallback } from 'react'
import { Button, Heatmap } from '@components'
import { KeyboardDismiss, Popover } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SEARCH_CAT } from '@constants'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

import type { SearchCatCn } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Category({ onFocus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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
        <Button style={styles.btn} styleText={styles.text} type='ghostMain' size='sm'>
          {MODEL_SEARCH_CAT.getLabel<SearchCatCn>($.state.cat)}
        </Button>
      </KeyboardDismiss>
      <Heatmap id='搜索.切换类型' />
    </Popover>
  ))
}

export default Category
