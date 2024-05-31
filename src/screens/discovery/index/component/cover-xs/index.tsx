/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:51:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 14:47:09
 */
import React from 'react'
import { _, subjectStore, systemStore } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import CoverXs from './cover-xs'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CoverXsWrap({ title, avatar, data }, { navigation }: Ctx) {
  if (!avatar || !data.cover) return null

  const subjectId = data.id
  const cn = subjectStore.cn(subjectId)
  const jp = subjectStore.jp(subjectId) || data.name
  return (
    <CoverXs
      navigation={navigation}
      styles={memoStyles()}
      imageWidth={_.windowSm.contentWidth * 0.2}
      avatarRound={systemStore.setting.avatarRound}
      title={title}
      avatar={avatar}
      subjectId={subjectId}
      cover={data.cover}
      cn={cn}
      jp={jp}
      name={HTMLDecode(cnjp(cn, jp))}
      userId={data.userId}
      userName={data.userName}
    />
  )
}

export default obc(CoverXsWrap, COMPONENT)
