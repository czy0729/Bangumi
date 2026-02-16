/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 06:06:43
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { OnairProgress } from '@_'
import { systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import Cover from './cover'
import Opacity from './opacity'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ subject = {}, subjectId = 0, epStatus }: Props) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  epStatus = Math.max(Number(epStatus) || 0, $.epStatus(subjectId))

  const { homeGridTitle } = systemStore.setting
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const isGame = typeCn === '游戏'

  let total: number
  let current: number
  if (!isGame) {
    total = $.epsCount(subjectId)
    current = $.currentOnAir(subjectId)

    // 有一种情况为多季度番剧, 章节数非 0 或 1 开始的
    // 会出现当前集数比总章节数多的情况, 需要使用实际放送章节数代替当前章节数
    if (current > total) {
      current = $.epsNoSp(subjectId).filter(item => item.status === 'Air').length
    }
  }

  return (
    <View style={styles.item}>
      <Opacity subjectId={subjectId}>
        <Cover subjectId={subjectId} subject={subject} epStatus={epStatus} />
      </Opacity>
      {!isGame && (
        <OnairProgress
          epStatus={epStatus || 0}
          total={Math.max(current || 0, total || 0)}
          current={current || 0}
        />
      )}
      {homeGridTitle && (
        <Text style={styles.title} size={11} bold numberOfLines={3} align='center'>
          {cnjp(subject.name_cn, subject.name)}
        </Text>
      )}
    </View>
  )
}

export default ob(Item, COMPONENT)
