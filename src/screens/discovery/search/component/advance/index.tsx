/*
 * @Author: czy0729
 * @Date: 2022-07-30 16:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-30 18:11:30
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Advance from './advance'
import AdvanceMono from './advance-mono'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function AdvanceWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleSubmit = useCallback(
    (text: string) => {
      $.onAdvance(text, navigation)
    },
    [$, navigation]
  )

  if (!$.showAdvance) return null

  const styles = memoStyles()

  const { cat, value } = $.state
  const passProps = {
    navigation,
    styles,
    value,
    onSubmit: handleSubmit
  } as const

  return cat === 'mono_all' ? <AdvanceMono {...passProps} /> : <Advance {...passProps} cat={cat} />
}

export default observer(AdvanceWrap)
