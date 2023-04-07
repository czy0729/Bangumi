/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-16 11:47:15
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Head from './head'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  // global.rerender('Subject.Head')

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
      year={$.year}
      coverPlaceholder={$.coverPlaceholder}
      imageWidth={$.imageWidth}
      imageHeight={$.imageHeight}
      titleLabel={$.titleLabel}
      hideScore={$.hideScore}
      rating={$.rating}
      x18={$.x18}
    />
  )
})
