/*
 * @Author: czy0729
 * @Date: 2022-08-08 17:35:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-24 11:15:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text } from '@components'
import { _, subjectStore } from '@stores'
import { ob } from '@utils/decorators'
import { Rank, Stars, Tag, Tags } from '../../../base'
import { memoStyles } from './styles'

function Bottom({ id, score, rank, total, simpleStars, time, tags, hideScore, hasComment }) {
  const styles = memoStyles()

  // 数据预处理
  const info = String(time).slice(2)
  const tag = tags
    .split(' ')
    .filter(item => !!item && item !== '自己可见')
    .slice(0, 4)

  const hasScore = !!score
  const showRank = !hideScore && !!rank
  const showScore = !hideScore && hasScore
  const showTotal = !hideScore && !!total
  const showInfo = !!info
  const showVisibility = tags.includes('自己可见')
  const showNSFW = subjectStore.nsfw(id)
  const showTags = tag.length > 0

  const hasLeft = showRank || showScore || showTotal || showInfo
  const hasCenter = showVisibility || showNSFW
  const hasRight = showTags

  if (!hasLeft && !hasCenter && !hasRight) {
    return hasComment ? null : <View style={_.mt.md} />
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
            <>
              {(showRank || showScore || showTotal) && <View style={styles.split} />}
              <Text type='sub' size={11} lineHeight={12} numberOfLines={1} bold>
                {info}
              </Text>
            </>
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
          {showNSFW && <Tag style={showVisibility && _.ml.sm} value='NSFW' type='ask' />}
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
