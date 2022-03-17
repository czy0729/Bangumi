/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 21:23:49
 */
import React from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Cover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const margin = 10

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

export default obc(GridItem, {
  subject: {},
  subject_id: 0
})

const memoStyles = _.memoStyles(() => {
  const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)
  const imageWidth = (_.window.contentWidth - (numColumns - 1) * margin) / numColumns
  return {
    item: {
      width: imageWidth,
      marginLeft: margin,
      marginBottom: margin
    },
    active: {
      opacity: 0.5
    },
    progress: {
      marginTop: 1,
      borderRadius: _.radiusXs,
      backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
    },
    bar: {
      borderBottomWidth: 6,
      borderRadius: _.radiusXs,
      borderColor: _.colorWarning
    }
  }
})
