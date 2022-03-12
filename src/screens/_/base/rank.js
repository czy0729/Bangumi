/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 22:47:36
 */
import React from 'react'
import { Text } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'

export const Rank = ob(({ style, size = 10, value }) => {
  if (systemStore.setting.hideScore || !value) return null

  const styles = memoStyles()
  return (
    <Text style={[styles.rank, style]} size={size} bold align='center'>
      {value}
    </Text>
  )
})

const memoStyles = _.memoStyles(() => ({
  rank: {
    minWidth: 28,
    paddingRight: 1,
    marginRight: 6,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    backgroundColor: _.select('#ffc107', '#f2b600'),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
