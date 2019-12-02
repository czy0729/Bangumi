/*
 * @Author: czy0729
 * @Date: 2019-03-23 08:43:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-02 12:18:21
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { getRating } from '@utils/app'

function ScoreTag({ style, value }) {
  const styles = memoStyles()
  return (
    <Text
      style={[styles.container, style]}
      type={_.select('plain', 'main')}
      size={12}
      lineHeight={1}
    >
      {getRating(value)}
    </Text>
  )
}

ScoreTag.defaultProps = {
  value: 0
}

export default observer(ScoreTag)

const memoStyles = _.memoStyles(_ => ({
  container: {
    padding: 4,
    backgroundColor: _.select(_.colorMain, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
