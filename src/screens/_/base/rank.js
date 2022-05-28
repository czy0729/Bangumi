/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 12:10:42
 */
import React from 'react'
import { Text } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'

export const Rank = ob(({ style, size = 10, value }) => {
  if (systemStore.setting.hideScore || !value) return null

  const styles = memoStyles()
  return (
    <Text
      style={[styles.rank, style]}
      size={size}
      lineHeight={size + 1}
      bold
      align='center'
    >
      {value}
    </Text>
  )
})

const memoStyles = _.memoStyles(() => ({
  rank: {
    minWidth: 24,
    paddingHorizontal: 6,
    marginRight: 8,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    backgroundColor: _.select('#ffc107', _._colorDarkModeLevel2),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
