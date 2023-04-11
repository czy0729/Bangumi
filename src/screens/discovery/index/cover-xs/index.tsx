/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:51:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 06:56:08
 */
import React from 'react'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import CoverXs from './cover-xs'
import { memoStyles } from './styles'

export default obc(({ title, avatar, data }, { navigation }: Ctx) => {
  // global.rerender('Discovery.CoverXs')

  const { avatarRound } = systemStore.setting
  return (
    <CoverXs
      navigation={navigation}
      styles={memoStyles()}
      imageWidth={_.windowSm.contentWidth * _.device(0.34, 0.4) * 0.5625}
      avatarRound={avatarRound}
      title={title}
      avatar={avatar}
      data={data}
    />
  )
})
