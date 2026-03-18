/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:16:32
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { systemStore, useStore } from '@stores'
import { TITLE_HEAD } from '../../ds'
import Head from './head'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function HeadWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  // 书籍需要显示连载时间段
  const { subjectShowAirdayMonth } = systemStore.setting
  let year = subjectShowAirdayMonth ? $.yearAndMount : $.year
  if (year && $.subjectTypeValue === 'book') {
    const end = subjectShowAirdayMonth ? $.yearAndMountEnd : $.end
    if (end && end !== year) {
      year = `${year.replace('-', '/')} - ${end.replace('-', '/')}`
    }
  }

  return (
    <Component id='screen-subject-head'>
      <View ref={ref => onBlockRef(ref, TITLE_HEAD)} collapsable={false}>
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
          hideScore={systemStore.setting.hideScore}
          rating={$.rating}
          duration={$.duration}
          nsfw={$.nsfw}
          hasSeries={$.hasSeries}
          isMusic={$.type === '音乐'}
        />
      </View>
    </Component>
  )
}

export default observer(HeadWrap)
