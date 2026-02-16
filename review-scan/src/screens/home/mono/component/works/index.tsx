/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:05:56
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Works from './works'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function WorksWrap({ style }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.works.length) return null

  return <Works navigation={navigation} styles={memoStyles()} style={style} works={$.works} />
}

export default ob(WorksWrap, COMPONENT)
