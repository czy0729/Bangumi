/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:21:12
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Voice from './voice'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function VoiceWrap({ style }, { $, navigation }: Ctx) {
  if (!$.voices.length) return null

  return <Voice styles={memoStyles()} navigation={navigation} style={style} voices={$.voices} />
}

export default obc(VoiceWrap, COMPONENT)
