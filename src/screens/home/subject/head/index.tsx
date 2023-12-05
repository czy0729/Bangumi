/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 20:43:15
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Head from './head'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  rerender('Subject.Head')

  // 书籍显示连载时间段
  let year = $.year
  if (year && $.subjectTypeValue === 'book' && $.end && $.end !== $.year) {
    year = `${$.year} - ${$.end}`
  }

  return (
    <Head
      styles={memoStyles()}
      showRelation={systemStore.setting.showRelation}
      subject={$.subject}
      subjectPrev={$.subjectPrev}
      subjectAfter={$.subjectAfter}
      subjectSeries={$.subjectSeries}
      cn={$.cn}
      jp={$.jp}
      release={$.release}
      year={year}
      coverPlaceholder={$.coverPlaceholder}
      imageWidth={$.imageWidth}
      imageHeight={$.imageHeight}
      titleLabel={$.titleLabel}
      hideScore={$.hideScore}
      rating={$.rating}
      x18={$.x18}
      hasSeries={$.hasSeries}
    />
  )
})
