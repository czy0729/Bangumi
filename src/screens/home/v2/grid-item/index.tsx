/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-20 15:52:10
 */
import React from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Cover } from '@_'
import { obc } from '@utils/decorators'
import { memoStyles } from './styles'
import { Subject, SubjectId } from '@types'

type Props = {
  subject?: Subject
  subjectId?: SubjectId
  epStatus?: number
}

function GridItem({ subject = {}, subjectId = 0, epStatus }: Props, { $ }) {
  global.rerender('Home.GridItem')

  const styles = memoStyles()
  const { grid } = $.state
  const { subject_id: current } = grid || {}
  const percent = Math.min(
    (Math.floor(epStatus || 0) / Math.floor(subject.eps_count || 24)) * 100,
    100
  )
  const isActive = current === subjectId
  return (
    <View style={styles.item}>
      <View style={isActive && styles.active}>
        <Cover
          size={styles.item.width}
          src={subject?.images?.medium || ''}
          shadow
          radius
          delay={false}
          onPress={() =>
            $.selectGirdSubject(subjectId, {
              subject_id: subjectId,
              subject,
              ep_status: epStatus
            })
          }
        />
      </View>
      <Progress
        style={styles.progress}
        barStyle={styles.bar}
        percent={percent}
        unfilled
      />
    </View>
  )
}

export default obc(GridItem)
