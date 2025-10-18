/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-24 02:08:32
 */
import React, { Suspense } from 'react'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Series from './series'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { SubjectFromHtmlRelationsItem } from '@stores/subject/types'
import type { Ctx } from '../../types'

function SeriewWrap({ size }: { size: number }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.hasSeries) return null

    /**
     * 实际显示顺序为: 前传 > 续集 > 动画化 > 不同演绎 > 原作书籍
     * 最多显示 2 个。当上述 5 种都不存在时，若有系列显示系列。
     */
    let subjectPrev: SubjectFromHtmlRelationsItem
    let subjectAfter: SubjectFromHtmlRelationsItem
    let subjectAnime: SubjectFromHtmlRelationsItem
    let subjectDiff: SubjectFromHtmlRelationsItem
    let subjectBook: SubjectFromHtmlRelationsItem
    let subjectSeries: SubjectFromHtmlRelationsItem
    let count = 0

    if ($.subjectPrev && count < 2) {
      subjectPrev = $.subjectPrev
      count += 1
    }

    if ($.subjectAfter && count < 2) {
      subjectAfter = $.subjectAfter
      count += 1
    }

    if ($.subjectAnime && count < 2) {
      subjectAnime = $.subjectAnime
      count += 1
    }

    if ($.subjectDiff && count < 2) {
      subjectDiff = $.subjectDiff
      count += 1
    }

    if ($.subjectBook && count < 2) {
      subjectBook = $.subjectBook
      count += 1
    }

    if (count === 0 && $.subjectSeries) {
      subjectSeries = $.subjectSeries
    }

    return (
      <Suspense fallback={null}>
        <Series
          styles={memoStyles()}
          showRelation={systemStore.setting.showRelation}
          size={size}
          subjectId={$.subjectId}
          subjectPrev={subjectPrev}
          subjectAfter={subjectAfter}
          subjectAnime={subjectAnime}
          subjectDiff={subjectDiff}
          subjectBook={subjectBook}
          subjectSeries={subjectSeries}
        />
      </Suspense>
    )
  })
}

export default SeriewWrap
