/*
 * @Author: czy0729
 * @Date: 2019-06-02 22:34:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:05:50
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Voice from './voice'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function VoiceWrap({ style }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.voices.length) return null

  return <Voice styles={memoStyles()} navigation={navigation} style={style} voices={$.voices} />
}

export default ob(VoiceWrap, COMPONENT)
