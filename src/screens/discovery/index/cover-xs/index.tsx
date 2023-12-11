/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:51:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 04:33:36
 */
import React from 'react'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import CoverXs from './cover-xs'
import { memoStyles } from './styles'

export default obc(({ title, avatar, data }, { navigation }: Ctx) => {
  rerender('Discovery.CoverXs')

  const { avatarRound } = systemStore.setting
  return (
    <CoverXs
      navigation={navigation}
      styles={memoStyles()}
      imageWidth={_.windowSm.contentWidth * 0.2}
      avatarRound={avatarRound}
      title={title}
      avatar={avatar}
      data={data}
    />
  )
})
