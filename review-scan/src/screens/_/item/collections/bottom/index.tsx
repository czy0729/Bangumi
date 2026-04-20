/*
 * @Author: czy0729
 * @Date: 2022-08-08 17:35:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 16:54:38
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text } from '@components'
import { _, subjectStore } from '@stores'
import { getTimestamp } from '@utils'
import { ob } from '@utils/decorators'
import { Rank, Stars, Tag, Tags } from '../../../base'
import { memoStyles } from './styles'

function Bottom({
  id,
  score,
  rank,
  total,
  simpleStars,
  time,
  tags,
  hideScore,
  isDo,
  isOnHold,
  isDropped,
  hasComment
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
    .filter((_item: string, index: number) => index < 4)

  const styles = memoStyles()
  const showRank = !hideScore && !!rank
  const showScore = !hideScore && hasScore
  const showTotal = !hideScore && !!total
  const showInfo = !!info.length
  const showVisibility = tags.includes('自己可见')
  const showR18 = subjectStore.nsfw(id)
  const showTags = !!tag?.length

  const hasLeft = showRank || showScore || showTotal || showInfo
  const hasCenter = showVisibility || showR18
  const hasRight = showTags
  if (!hasLeft && !hasCenter && !hasRight) {
    if (hasComment) return null
    return <View style={_.mt.md} />
  }

  return (
    <Flex style={_.mt.md}>
      {/* left */}
      {hasLeft && (
        <>
          {showRank && <Rank value={rank} />}
          {showScore && <Stars value={score} simple={simpleStars} hideScore={hideScore} />}
          {showTotal && (
            <Text style={(showRank || showScore) && _.ml.sm} type='sub' size={10}>
              ({total}人评分)
            </Text>
          )}
          {showInfo && (
            <Text
              style={(showRank || showScore || showTotal) && _.ml.sm}
              type='sub'
              size={11}
              lineHeight={12}
              numberOfLines={1}
            >
              {info}
            </Text>
          )}
        </>
      )}

      {/* center */}
      {hasCenter && (
        <>
          {hasLeft && <View style={styles.split} />}
          {showVisibility && (
            <Tag>
              <Iconfont
                name='md-visibility-off'
                color={_.select(_.colorSub, _.colorDesc)}
                size={12}
              />
            </Tag>
          )}
          {showR18 && <Tag style={showVisibility && _.ml.sm} value='R18' />}
        </>
      )}

      {/* right */}
      {hasRight && (
        <>
          {(hasLeft || hasCenter) && <View style={styles.split} />}
          <Tags value={tag} />
        </>
      )}
    </Flex>
  )
}

export default ob(Bottom)
