/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 21:47:29
 */
import React, { Suspense } from 'react'
import { Flex } from '@components'
import { IconRelation } from '@_'
import { systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import Series from './series'
import { COMPONENT } from './ds'
import { memoStyles, styles } from './styles'

import type { SubjectFromHtmlRelationsItem } from '@stores/subject/types'
import type { Ctx } from '../../types'

function SeriewWrap({ size }: { size: number }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { showRelation } = systemStore.setting
    if (showRelation === -1) return null

    const elLink = (
      <IconRelation style={styles.icon} subjectId={$.subjectId} name={cnjp($.cn, $.jp)} />
    )
    if (!$.hasSeries) {
      return (
        <Flex>
          <Flex.Item />
          {elLink}
        </Flex>
      )
    }

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
        <Flex>
          <Flex.Item>
            <Series
              styles={memoStyles()}
              showRelation={showRelation}
              size={size}
              subjectId={$.subjectId}
              subjectPrev={subjectPrev}
              subjectAfter={subjectAfter}
              subjectAnime={subjectAnime}
              subjectDiff={subjectDiff}
              subjectBook={subjectBook}
              subjectSeries={subjectSeries}
            />
          </Flex.Item>
          {elLink}
        </Flex>
      </Suspense>
    )
  })
}

export default SeriewWrap
