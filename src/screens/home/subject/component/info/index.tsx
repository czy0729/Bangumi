/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-22 18:32:50
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import { TITLE_INFO } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Info from './info'
import { processHtml } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function InfoWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.showInfo[1]) return null

    return (
      <Suspense fallback={null}>
        <Component id='screen-subject-info'>
          <View
            ref={ref => onBlockRef(ref, TITLE_INFO)}
            style={_.container.layout}
            collapsable={false}
          />
          <Info
            navigation={navigation}
            styles={memoStyles()}
            subjectId={$.subjectId}
            showInfo={systemStore.setting.showInfo}
            subjectHtmlExpand={systemStore.setting.subjectHtmlExpand}
            info={processHtml($.rawInfo.replace('展开+', ''))}
            name={cnjp($.cn, $.jp)}
            onSwitchBlock={$.onSwitchBlock}
          />
          <Split />
        </Component>
      </Suspense>
    )
  })
}

export default InfoWrap
