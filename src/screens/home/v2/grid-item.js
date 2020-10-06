/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-06 18:28:31
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Progress } from '@ant-design/react-native'
import { Cover } from '@screens/_'
import { _ } from '@stores'

const margin = 10
const num = _.isPad ? 5 : 4
const imageWidth = (_.window.width - (num - 1) * margin - 2 * _.wind) / num

function GridItem({ subject, subjectId, epStatus }, { $ }) {
  const styles = memoStyles()
  const percent = Math.min(
    (parseInt(epStatus || 0) / parseInt(subject.eps_count || 24)) * 100,
    100
  )
  return (
    <View style={styles.item}>
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
      <Progress
        style={styles.progress}
        barStyle={styles.bar}
        percent={percent}
        unfilled
      />
    </View>
  )
}

GridItem.defaultProps = {
  subject: {},
  subject_id: 0
}

GridItem.contextTypes = {
  $: PropTypes.object
}

export default observer(GridItem)

const memoStyles = _.memoStyles(_ => ({
  item: {
    width: imageWidth,
    marginLeft: margin,
    marginBottom: margin
  },
  progress: {
    borderRadius: _.radiusXs,
    backgroundColor: _.select('transparent', _._colorDarkModeLevel1)
  },
  bar: {
    borderBottomWidth: 4,
    borderRadius: _.radiusXs,
    borderColor: _.colorWarning
  }
}))
