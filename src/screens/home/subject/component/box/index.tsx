/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:15:26
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore, userStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_BOX } from '../../ds'
import { Ctx } from '../../types'
import Box from './box'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function BoxWrap({ onBlockRef }, { $, navigation }: Ctx) {
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_BOX)} />
      <Box
        styles={memoStyles()}
        navigation={navigation}
        isLogin={$.isLogin}
        status={$.status}
        url={$.url}
        showCount={systemStore.setting.showCount}
        showManageModel={$.showManageModel}
        toRating={$.toRating}
        outdate={userStore.outdate}
      />
    </>
  )
}

export default obc(BoxWrap, COMPONENT)
