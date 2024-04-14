/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 01:11:34
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_HEAD } from '../../ds'
import { Ctx } from '../../types'
import Head from './head'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function HeadWrap({ onBlockRef }, { $ }: Ctx) {
  // 书籍显示连载时间段
  let year = $.year
  if (year && $.subjectTypeValue === 'book' && $.end && $.end !== $.year) {
    year = `${$.year} - ${$.end}`
  }

  return (
    <View ref={ref => onBlockRef(ref, TITLE_HEAD)}>
      <Head
        styles={memoStyles()}
        showRelation={systemStore.setting.showRelation}
        subjectId={Number($.subject.id || $.subjectId)}
        subjectPrev={$.subjectPrev}
        subjectAfter={$.subjectAfter}
        subjectSeries={$.subjectSeries}
        cn={$.cn}
        jp={$.jp}
        release={$.release}
        year={year}
        imageWidth={$.imageWidth}
        imageHeight={$.imageHeight}
        titleLabel={$.titleLabel}
        hideScore={$.hideScore}
        rating={$.rating}
        nsfw={$.nsfw}
        hasSeries={$.hasSeries}
      />
    </View>
  )
}

export default obc(HeadWrap, COMPONENT)
