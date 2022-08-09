/*
 * @Author: czy0729
 * @Date: 2022-08-08 17:35:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 10:45:35
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import { ob } from '@utils/decorators'
import { Rank, Stars } from '../../../base'
import { memoStyles } from './styles'

function Bottom({ score, rank, time, tags, hideScore, isDo, isOnHold, isDropped }) {
  const styles = memoStyles()
  const hasScore = !!score

  let days: number
  if (isDo || isOnHold || isDropped) {
    days = Math.ceil((getTimestamp() - getTimestamp(time)) / 86400)
  }

  const info = []
  if (isDo) info.push(`${days}天`)
  if (isOnHold) info.push(`搁置${days}天`)
  if (isDropped) info.push(`抛弃${days}天`)

  const tag = tags
    .split(' ')
    .filter((item: string) => !!item && item !== '自己可见')
    .filter((item: string, index: number) => index < 4)

  return (
    <>
      {!hideScore && hasScore && (
        <>
          <Rank value={rank} />
          <Stars style={_.mr.sm} value={score} />
        </>
      )}
      {!!info.length && (
        <Text style={_.mr.sm} type='sub' size={11} numberOfLines={1}>
          {hasScore && !!info.length && '/ '}
          {info}
        </Text>
      )}
      {tag.map((item: string) => (
        <View key={item} style={styles.tag}>
          <Text size={11}>{item}</Text>
        </View>
      ))}
    </>
  )
}

export default ob(Bottom)
