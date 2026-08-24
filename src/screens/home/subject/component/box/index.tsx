/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 19:37:45
 */
import React from 'react'

import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, systemStore, userStore, useStore } from '@stores'
import { TITLE_BOX } from '../../ds'
import Split from '../split'
import Box from './box'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import BlockAnchor from '../block-anchor'
import type { Ctx } from '../../types'
import type { Props } from './types'

function BoxWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <Component id='screen-subject-box'>
      <BlockAnchor title={TITLE_BOX} onBlockRef={onBlockRef} />

      <Box
        styles={memoStyles()}
        navigation={navigation}
        isLogin={userStore.isLogin}
        status={$.status}
        url={$.url}
        showCount={systemStore.setting.showCount}
        showManageModel={$.showManageModel}
        toRating={$.toRating}
        outdate={userStore.outdate}
      />

      <Split />
    </Component>
  )
}

export default observer(BoxWrap)
