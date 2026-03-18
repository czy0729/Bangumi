/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:31:54
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { TITLE_INFO } from '../../ds'
import Split from '../split'
import Info from './info'
import { processHtml } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function InfoWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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
}

export default observer(InfoWrap)
