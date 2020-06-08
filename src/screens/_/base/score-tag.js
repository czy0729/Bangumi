/*
 * @Author: czy0729
 * @Date: 2019-03-23 08:43:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 20:49:23
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { getRating } from '@utils/app'

function ScoreTag({ style, value }) {
  const styles = memoStyles()
  return (
    <Flex style={[styles.container, style]}>
      <Text type={_.select('plain', 'main')} size={12}>
        {getRating(value)}
      </Text>
    </Flex>
  )
}

ScoreTag.defaultProps = {
  value: 0
}

export default observer(ScoreTag)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: _.select(_.colorMain, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
