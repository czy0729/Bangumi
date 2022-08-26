/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:26:30
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Series from './series'
import { memoStyles } from './styles'

export default obc(({ size }: { size: number }, { $, navigation }: Ctx) => {
  global.rerender('Subject.Series')

  if (!($.subjectPrev || $.subjectAfter || $.subjectSeries || $.subjectAnime)) {
    return null
  }

  return (
    <Series
      navigation={navigation}
      styles={memoStyles()}
      showRelation={systemStore.setting.showRelation}
      size={size}
      subjectId={$.subjectId}
      subjectPrev={$.subjectPrev}
      subjectAfter={$.subjectAfter}
      subjectSeries={$.subjectSeries}
      subjectAnime={$.subjectAnime}
    />
  )
})
