/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:14:13
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { TITLE_SUMMARY } from '../../ds'
import BlockAnchor from '../block-anchor'
import Split from '../split'
import Summary from './summary'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function SummaryWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const content = useMemo(() => $.summary.replace(/\r\n\r\n/g, '\r\n'), [$.summary])

  if (!$.showSummary[1]) return null

  return (
    <Component id='screen-subject-summary'>
      <BlockAnchor title={TITLE_SUMMARY} onBlockRef={onBlockRef} />
      <Summary
        navigation={navigation}
        styles={memoStyles()}
        subjectId={$.subjectId}
        showSummary={systemStore.setting.showSummary}
        subjectHtmlExpand={systemStore.setting.subjectHtmlExpand}
        translateResult={$.translateResult}
        content={content}
        name={cnjp($.cn, $.jp)}
        onSwitchBlock={$.onSwitchBlock}
      />
      <Split />
    </Component>
  )
}

export default observer(SummaryWrap)
