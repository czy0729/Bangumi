/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:51:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 14:47:09
 */
import React from 'react'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import CoverXs from './cover-xs'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CoverXsWrap({ title, avatar, data }, { navigation }: Ctx) {
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
}

export default obc(CoverXsWrap, COMPONENT)
