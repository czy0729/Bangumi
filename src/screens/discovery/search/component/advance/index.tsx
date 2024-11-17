/*
 * @Author: czy0729
 * @Date: 2022-07-30 16:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:51:51
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Advance from './advance'
import AdvanceMono from './advance-mono'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function AdvanceWrap() {
  const { $, navigation } = useStore<Ctx>()
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

export default ob(AdvanceWrap, COMPONENT)
