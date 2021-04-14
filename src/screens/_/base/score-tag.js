/*
 * @Author: czy0729
 * @Date: 2019-03-23 08:43:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 18:13:16
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { getRating } from '@utils/app'
import { ob } from '@utils/decorators'

export const ScoreTag = ob(({ style, value = 0 }) => {
  const styles = memoStyles()
  return (
    <Flex style={[styles.container, style]}>
      <Text type={_.select('plain', 'main')} size={12}>
        {getRating(value)}
      </Text>
    </Flex>
  )
})

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: _.select(_.colorMain, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
