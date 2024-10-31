/*
 * @Author: czy0729
 * @Date: 2022-07-30 16:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-30 22:45:54
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Advance from './advance'
import AdvanceMono from './advance-mono'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function AdvanceWrap(_props, { $, navigation }: Ctx) {
  if (!$.showAdvance) return null

  const styles = memoStyles()
  const { cat, value } = $.state
  const handleSubmit = (text: string) => $.onAdvance(text, navigation)
  if (cat === 'mono_all') {
    return (
      <AdvanceMono navigation={navigation} styles={styles} value={value} onSubmit={handleSubmit} />
    )
  }

  return (
    <Advance
      navigation={navigation}
      styles={styles}
      cat={cat}
      value={value}
      onSubmit={handleSubmit}
    />
  )
}

export default obc(AdvanceWrap, COMPONENT)
