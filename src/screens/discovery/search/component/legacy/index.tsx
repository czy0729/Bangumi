/*
 * @Author: czy0729
 * @Date: 2019-12-28 13:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-17 05:50:38
 */
import React, { useCallback } from 'react'
import { Button, Heatmap } from '@components'
import { KeyboardDismiss, Popover } from '@_'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY, SEARCH_LEGACY } from '@constants'
import { SearchCatCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT, EXCLUDE_DS } from './ds'
import { memoStyles } from './styles'

const DATA = SEARCH_LEGACY.map(item => item.label)

function Legacy({ onFocus }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
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
    if (EXCLUDE_DS.includes(MODEL_SEARCH_CAT.getLabel<SearchCatCn>($.state.cat))) return null

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
