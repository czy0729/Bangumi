/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-10 06:56:42
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, userStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_BOX } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Box from './box'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function BoxWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <Component id='screen-subject-box'>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_BOX)} />
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

export default ob(BoxWrap, COMPONENT)
