/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-27 06:54:52
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { TITLE_HEAD } from '../../ds'
import Head from './head'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function HeadWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { statusBarHeight } = useInsets()

  // 书籍需要显示连载时间段
  const { subjectShowAirdayMonth, pinnedGameDuration } = systemStore.setting
  let year = subjectShowAirdayMonth ? $.yearAndMount : $.year
  if (year && $.subjectTypeValue === 'book') {
    const end = subjectShowAirdayMonth ? $.yearAndMountEnd : $.end
    if (end && end !== year) {
      year = `${year.replace('-', '/')} - ${end.replace('-', '/')}`
    }
  }

  // 游戏时长：VNDB 默认 pin，否则使用 pinnedGameDuration
  const { vndb } = $.state.gameDuration
  const gameDuration = vndb
    ? $.state.gameDuration.vndb || ''
    : pinnedGameDuration
    ? $.state.gameDuration[pinnedGameDuration] || ''
    : ''

  const styles = memoStyles()

  return (
    <Component id='screen-subject-head'>
      <View
        ref={ref => onBlockRef(ref, TITLE_HEAD)}
        style={{
          paddingTop: _.r(statusBarHeight) + _.device(_.ios(0, 16), 24),
          marginTop: _.ios(_.r(statusBarHeight) + 48, -80)
        }}
      >
        <Head
          styles={styles}
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
          musicDuration={$.musicDuration}
          gameDuration={gameDuration}
          pinnedGameDuration={vndb ? 'vndb' : pinnedGameDuration}
          nsfw={$.nsfw}
          hasSeries={$.hasSeries}
          isMusic={$.type === '音乐'}
        />
      </View>
    </Component>
  )
}

export default observer(HeadWrap)
