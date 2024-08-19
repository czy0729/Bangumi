/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 12:48:19
 */
import React, { Suspense } from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Series from './series.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SeriewWrap({ size }: { size: number }, { $, navigation }: Ctx) {
  if (!$.hasSeries) return null

  /**
   * 实际显示顺序为, 前传 > 续集 > 动画化 > 不同演绎, 最多显示 2 个
   * 当上面 4 种都不存在时, 若有系列显示系列,
   * 所以按顺序只需要优化传递最多 2 组数据, 可以减少重渲染次数
   */
  type SeriesItem = typeof $.subjectPrev
  let i = 0
  let subjectPrev: SeriesItem
  let subjectAfter: SeriesItem
  let subjectAnime: SeriesItem
  let subjectDiff: SeriesItem
  let subjectSeries: SeriesItem

  if ($.subjectPrev) {
    subjectPrev = $.subjectPrev
    i += 1
  }

  if ($.subjectAfter) {
    subjectAfter = $.subjectAfter
    i += 1
  }

  if (i < 2 && $.subjectAnime) {
    subjectAnime = $.subjectAnime
    i += 1
  }

  if (i < 2 && $.subjectDiff) {
    subjectDiff = $.subjectDiff
    i += 1
  }

  if (!i && $.subjectSeries) {
    subjectSeries = $.subjectSeries
  }

  return (
    <Suspense fallback={null}>
      <Series
        navigation={navigation}
        styles={memoStyles()}
        showRelation={systemStore.setting.showRelation}
        size={size}
        subjectId={$.subjectId}
        subjectPrev={subjectPrev}
        subjectAfter={subjectAfter}
        subjectAnime={subjectAnime}
        subjectDiff={subjectDiff}
        subjectSeries={subjectSeries}
      />
    </Suspense>
  )
}

export default obc(SeriewWrap, COMPONENT)
