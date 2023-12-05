/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 00:31:16
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Comic from './comic'

export default obc((props, { $, navigation }: Ctx) => {
  rerender('Subject.Comic')

  if (!$.comic.length) return null

  return <Comic navigation={navigation} subjectId={$.subjectId} comic={$.comic} />
})
