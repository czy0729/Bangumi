/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-19 23:14:49
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, userStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_BOX } from '../../ds'
import Split from '../split'
import Box from './box'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function BoxWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Component id='screen-subject-box'>
      <View
        ref={ref => onBlockRef(ref, TITLE_BOX)}
        style={_.container.layout}
        collapsable={false}
      />
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
  ))
}

export default BoxWrap
