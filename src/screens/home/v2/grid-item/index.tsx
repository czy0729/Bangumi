/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 22:55:54
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { OnairProgress } from '@_'
import { _, systemStore } from '@stores'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'
import Opacity from './opacity'
import Cover from './cover'
import { memoStyles } from './styles'
import { Props } from './types'
import { MODEL_SUBJECT_TYPE } from '@constants'

function GridItem({ subject = {}, subjectId = 0, epStatus }: Props, { $ }: Ctx) {
  // global.rerender('Home.GridItem')

  const styles = memoStyles()
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
      {!isGame && <OnairProgress epStatus={epStatus} total={total} current={current} />}
      {homeGridTitle && (
        <Text style={[_.mt.sm, _.mb.xs]} size={11} bold numberOfLines={2}>
          {cnjp(subject.name_cn, subject.name)}
        </Text>
      )}
    </View>
  )
}

export default obc(GridItem)
