/*
 * @Author: czy0729
 * @Date: 2022-08-08 17:35:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 20:31:12
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import { ob } from '@utils/decorators'
import { Rank, Stars, Tags } from '../../../base'

function Bottom({
  score,
  rank,
  simpleStars,
  time,
  tags,
  hideScore,
  isDo,
  isOnHold,
  isDropped
}) {
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

  if (!(!hideScore && hasScore) && !info.length && !tag.length && !rank) return null

  return (
    <Flex style={_.mt.sm}>
      {!hideScore && !!rank && <Rank value={rank} />}
      {!hideScore && hasScore && (
        <Stars style={_.mr.sm} value={score} simple={simpleStars} />
      )}
      {!!info.length && (
        <Text style={_.mr.sm} type='sub' size={11} numberOfLines={1}>
          {info}
        </Text>
      )}
      <Tags value={tag} />
    </Flex>
  )
}

export default ob(Bottom)
