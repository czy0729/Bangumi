/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-17 00:26:49
 */
import React from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const margin = 10
const num = _.isPad ? 5 : 4
const imageWidth = (_.window.width - (num - 1) * margin - 2 * _.wind) / num

function GridItem({ subject, subjectId, epStatus }, { $ }) {
  rerender('Home.GridItem')

  const styles = memoStyles()
  const { grid } = $.state
  const { subject_id: current } = grid || {}
  const percent = Math.min(
    (parseInt(epStatus || 0) / parseInt(subject.eps_count || 24)) * 100,
    100
  )
  const isActive = current === subjectId
  return (
    <View style={styles.item}>
      <View style={isActive && styles.active}>
        <Cover
          size={imageWidth}
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

export default obc(GridItem, {
  subject: {},
  subject_id: 0
})

const memoStyles = _.memoStyles(_ => ({
  item: {
    width: imageWidth,
    marginLeft: margin,
    marginBottom: margin
  },
  active: {
    opacity: 0.5
  },
  progress: {
    borderRadius: _.radiusXs,
    backgroundColor: _.select('transparent', _._colorDarkModeLevel1)
  },
  bar: {
    borderBottomWidth: 6,
    borderRadius: _.radiusXs,
    borderColor: _.colorWarning
  }
}))
