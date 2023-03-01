/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-01 08:30:33
 */
import React from 'react'
import { systemStore, userStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Box from './box'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  global.rerender('Subject.Box')

  return (
    <Box
      styles={memoStyles()}
      navigation={navigation}
      isLogin={$.isLogin}
      status={$.status}
      showCount={systemStore.setting.showCount}
      showManageModel={$.showManageModel}
      toRating={$.toRating}
      outdate={userStore.outdate}
    />
  )
})
