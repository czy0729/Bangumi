/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:51:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 21:18:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _, subjectStore, systemStore } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { useNavigation } from '@utils/hooks'
import CoverXs from './cover-xs'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function CoverXsWrap({ title, avatar, data }: Props) {
  const navigation = useNavigation(COMPONENT)

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

export default observer(CoverXsWrap)
