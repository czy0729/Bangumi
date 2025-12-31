/*
 * @Author: czy0729
 * @Date: 2019-12-28 13:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 02:54:13
 */
import React, { useCallback } from 'react'
import { Button, Heatmap } from '@components'
import { KeyboardDismiss, Popover } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants'
import { NO_LEGACY_DS } from '../ds'
import { COMPONENT, DATA } from './ds'
import { memoStyles } from './styles'

import type { SearchCatCn } from '@types'
import type { Ctx } from '../../types'

function Legacy({ onFocus }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (label: string) => {
      $.onLegacySelect(label)

      setTimeout(() => {
        onFocus()
      }, 0)
    },
    [$, onFocus]
  )

  return useObserver(() => {
    if (NO_LEGACY_DS.includes(MODEL_SEARCH_CAT.getLabel<SearchCatCn>($.state.cat))) return null

    const styles = memoStyles()

    return (
      <Popover style={styles.touch} data={DATA} onSelect={handleSelect}>
        <KeyboardDismiss>
          <Button style={styles.btn} styleText={styles.text} type='ghostPlain' size='sm'>
            {MODEL_SEARCH_LEGACY.getLabel<SearchCatCn>($.state.legacy)}
          </Button>
        </KeyboardDismiss>
        <Heatmap id='搜索.切换细分类型' />
      </Popover>
    )
  })
}

export default Legacy
