/*
 * @Author: czy0729
 * @Date: 2019-10-20 17:49:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-20 18:19:50
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Progress } from '@ant-design/react-native'
import { Image } from '@components'
import { getCoverMedium } from '@utils/app'
import _ from '@styles'

const imageWidth = (_.window.width - 5 * _.sm) / 4

function GridItem({ subject, subject_id: subjectId }, { $ }) {
  const { current } = $.state
  const isCurrent = current === subjectId
  return (
    <View style={styles.item}>
      <Image
        style={{
          opacity: isCurrent ? 0.6 : 1
        }}
        size={imageWidth}
        src={getCoverMedium(subject.images.medium)}
        border
        radius
        delay={false}
        onPress={() => $.selectGirdSubject(subjectId)}
      />
      <Progress
        style={styles.progress}
        barStyle={styles.bar}
        percent={$.percent(subjectId, subject)}
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

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginLeft: _.sm,
    marginBottom: _.sm + 2
  },
  progress: {
    marginTop: 2,
    borderRadius: 6,
    backgroundColor: 'transparent'
  },
  bar: {
    borderBottomWidth: 6,
    borderRadius: 6,
    borderColor: _.colorWarning
  }
})
