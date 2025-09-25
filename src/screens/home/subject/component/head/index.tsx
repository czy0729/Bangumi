/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-22 18:23:01
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_HEAD } from '../../ds'
import { Ctx } from '../../types'
import Head from './head'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function HeadWrap({ onBlockRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    // 书籍显示连载时间段
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
            nsfw={$.nsfw}
            hasSeries={$.hasSeries}
            isMusic={$.type === '音乐'}
          />
        </View>
      </Component>
    )
  })
}

export default HeadWrap
