/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:26:25
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { OnairProgress } from '@_'
import { systemStore, useStore } from '@stores'
import { cnjp } from '@utils'
import { MODEL_SUBJECT_TYPE } from '@constants'
import Cover from './cover'
import Opacity from './opacity'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../../types'
import type { Props } from './types'

function Item({ subject = {}, subjectId = 0, epStatus }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const maxEpStatus = Math.max(Number(epStatus) || 0, $.epStatus(subjectId))

  const { homeGridTitle } = systemStore.setting
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const isGame = typeCn === '游戏'

  const total = isGame ? 0 : $.epsCount(subjectId, true)
  const current = isGame ? 0 : $.airedCount(subjectId)

  return (
    <View style={styles.item}>
      <Opacity subjectId={subjectId}>
        <Cover subjectId={subjectId} subject={subject} epStatus={maxEpStatus} />
      </Opacity>
      {!isGame && (
        <OnairProgress
          epStatus={maxEpStatus || 0}
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

export default observer(Item)
