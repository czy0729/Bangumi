/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:05:50
 */
import React from 'react'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Voice from './voice'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function VoiceWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.voices.length) return null

    return <Voice styles={memoStyles()} navigation={navigation} style={_.mt.md} voices={$.voices} />
  })
}

export default VoiceWrap
