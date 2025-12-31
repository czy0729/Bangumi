/*
 * @Author: czy0729
 * @Date: 2022-07-30 16:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-30 18:11:30
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Advance from './advance'
import AdvanceMono from './advance-mono'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function AdvanceWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.showAdvance) return null

    const styles = memoStyles()
    const { cat, value } = $.state
    const onSubmit = (text: string) => $.onAdvance(text, navigation)

    const commonProps = {
      navigation,
      styles,
      value,
      onSubmit
    }

    return cat === 'mono_all' ? (
      <AdvanceMono {...commonProps} />
    ) : (
      <Advance {...commonProps} cat={cat} />
    )
  })
}

export default AdvanceWrap
