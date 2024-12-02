/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:51:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:45:13
 */
import React from 'react'
import { _, subjectStore, systemStore } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import CoverXs from './cover-xs'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function CoverXsWrap({ title, avatar, data }) {
  const navigation = useNavigation()
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

export default ob(CoverXsWrap, COMPONENT)
