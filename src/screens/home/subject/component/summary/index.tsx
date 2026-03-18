/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:35:48
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { TITLE_SUMMARY } from '../../ds'
import Split from '../split'
import Summary from './summary'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function SummaryWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  if (!$.showSummary[1]) return null

  return (
    <Component id='screen-subject-summary'>
      <View
        ref={ref => onBlockRef(ref, TITLE_SUMMARY)}
        style={_.container.layout}
        collapsable={false}
      />
      <Summary
        navigation={navigation}
        styles={memoStyles()}
        subjectId={$.subjectId}
        showSummary={systemStore.setting.showSummary}
        subjectHtmlExpand={systemStore.setting.subjectHtmlExpand}
        translateResult={$.state.translateResult.slice()}
        content={$.summary.replace(/\r\n\r\n/g, '\r\n')}
        name={cnjp($.cn, $.jp)}
        onSwitchBlock={$.onSwitchBlock}
      />
      <Split />
    </Component>
  )
}

export default observer(SummaryWrap)
