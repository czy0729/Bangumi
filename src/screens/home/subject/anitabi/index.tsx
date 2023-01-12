/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-12 08:38:26
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Anitabi from './anitabi'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  global.rerender('Subject.Anitabi')

  const { anitabi } = $.state
  if (!anitabi.pointsLength) return null

  return <Anitabi styles={memoStyles()} subjectId={$.subjectId} data={anitabi} />
})
