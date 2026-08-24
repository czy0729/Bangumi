/*
 * @Author: czy0729
 * @Date: 2019-08-23 00:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:12:33
 */
import React, { Suspense, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { TITLE_INFO } from '../../ds'
import BlockAnchor from '../block-anchor'
import Split from '../split'
import Info from './info'
import { processHtml } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function InfoWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const info = useMemo(() => processHtml($.rawInfo.replace('展开+', '')), [$.rawInfo])

  if (!$.showInfo[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-info'>
        <BlockAnchor title={TITLE_INFO} onBlockRef={onBlockRef} />

        <Info
          navigation={navigation}
          styles={memoStyles()}
          subjectId={$.subjectId}
          showInfo={systemStore.setting.showInfo}
          subjectHtmlExpand={systemStore.setting.subjectHtmlExpand}
          info={info}
          name={cnjp($.cn, $.jp)}
          onSwitchBlock={$.onSwitchBlock}
        />

        <Split />
      </Component>
    </Suspense>
  )
}

export default observer(InfoWrap)
