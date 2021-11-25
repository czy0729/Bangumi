/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-26 01:39:02
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { memo, obc } from '@utils/decorators'

const defaultProps = {
  navigation: {},
  styles: {},
  friend: {},
  rating: 0,
  total: 0,
  count: {},
  score: 0,
  toRating: Function.prototype
}

const Chart = memo(
  ({ navigation, styles, friend, rating, total, count, score, toRating }) => {
    rerender('Subject.Rating.Chart.Main')

    const deviation = getDeviation(total, count, score)
    return (
      <>
        {!!total && (
          <Text style={styles.total} size={11} type='sub'>
            {total}人评分
          </Text>
        )}
        <Flex style={_.mt.md}>
          {Object.keys(count)
            .reverse()
            .map((item, index) => {
              const height = getHeight(total, count[item])
              const isActive = rating == item
              return (
                <Flex.Item key={item} style={index > 0 && _.ml.xs}>
                  <Flex style={styles.item} justify='center' align='end'>
                    <View
                      style={[
                        styles.itemFill,
                        isActive && styles.itemFillActive,
                        {
                          height
                        }
                      ]}
                    />
                    <Text
                      style={[
                        styles.count,
                        {
                          bottom: height
                        }
                      ]}
                      size={10}
                      type={isActive ? 'warning' : 'sub'}
                      align='center'
                      bold
                    >
                      {count[item]}{' '}
                    </Text>
                  </Flex>
                  <Text
                    style={_.mt.sm}
                    size={12}
                    type={isActive ? 'warning' : 'title'}
                    align='center'
                  >
                    {item}
                  </Text>
                </Flex.Item>
              )
            })}
        </Flex>
        <Flex style={_.mt.md}>
          <Flex.Item>
            <Touchable
              style={styles.friend}
              onPress={() => toRating(navigation, '评分分布')}
            >
              <Flex>
                {friend.score ? (
                  <Text size={12} type='sub'>
                    好友
                    <Text size={12} type='main' bold>
                      {' '}
                      {friend.score}{' '}
                    </Text>
                    <Text size={12} lineHeight={12} type='sub'>
                      ({friend.total})
                    </Text>
                  </Text>
                ) : (
                  <Text size={12} lineHeight={12} type='sub'>
                    用户评分
                  </Text>
                )}
                <Iconfont name='md-navigate-next' />
              </Flex>
              <Heatmap
                id='条目.跳转'
                data={{
                  from: '评分分布'
                }}
              />
            </Touchable>
          </Flex.Item>
          <Touchable
            style={styles.deviation}
            name='right'
            size={14}
            onPress={() =>
              Alert.alert(
                '标准差',
                '0-1 异口同声\n1.15 基本一致\n1.3 略有分歧\n1.45 莫衷一是\n1.6 各执一词\n1.75 你死我活'
              )
            }
          >
            <Flex>
              <Text size={12} type='sub'>
                标准差
              </Text>
              <Text size={12} type='main' bold>
                {' '}
                {toFixed(deviation, 2)}{' '}
              </Text>
              <Text size={12} lineHeight={12} type='sub'>
                {getDispute(deviation)}{' '}
              </Text>
              <Iconfont name='md-info-outline' size={16} />
            </Flex>
          </Touchable>
        </Flex>
      </>
    )
  },
  defaultProps
)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Rating.Chart')

  const { total, count, score } = $.rating
  return (
    <Chart
      navigation={navigation}
      styles={memoStyles()}
      friend={$.subjectFormHTML.friend}
      rating={$.collection.rating}
      total={total}
      count={count}
      score={score}
      toRating={$.toRating}
    />
  )
})

const memoStyles = _.memoStyles(_ => ({
  total: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: -6
  },
  item: {
    height: 112 * _.ratio,
    paddingBottom: _.xs,
    marginTop: -_.md
  },
  itemFill: {
    position: 'absolute',
    left: '50%',
    width: _.device(6, 8),
    marginLeft: _.device(-3, -4),
    backgroundColor: _.select(_.colorWait, _._colorSub),
    borderRadius: _.device(6, 4)
  },
  itemFillActive: {
    backgroundColor: _.colorWarning
  },
  count: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    left: 0,
    marginBottom: 4
  },
  friend: {
    paddingLeft: _.xs,
    marginLeft: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  deviation: {
    paddingLeft: _.xs,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))

/**
 * 比例柱子高度
 * @param {*} total
 * @param {*} current
 */
const min = 0.04
function getHeight(total, current) {
  if (!total || !current) return 0
  let percent = current / total
  if (percent > 0 && percent < min) percent = min
  return `${Math.min(percent * 1.44 || min, 1) * 100}%`
}

/**
 * 计算标准差
 * @param {*} total
 * @param {*} count
 * @param {*} score
 */
function getDeviation(total, count, score) {
  if (total == 0) return 0

  const scores = Object.values(count).reverse()
  return calculateSD(scores, score, total)
}

/**
 * 计算标准差
 * @param {*} scores
 * @param {*} score
 * @param {*} n
 */
function calculateSD(scores, score, n) {
  let sd = 0
  scores.forEach((item, index) => {
    if (item === 0) return
    sd += (10 - index - score) * (10 - index - score) * item
  })
  return Math.sqrt(sd / n)
}

/**
 * 计算争议度
 * @param {*} deviation
 */
function getDispute(deviation) {
  if (deviation === 0) return '-'
  if (deviation < 1) return '异口同声'
  if (deviation < 1.15) return '基本一致'
  if (deviation < 1.3) return '略有分歧'
  if (deviation < 1.45) return '莫衷一是'
  if (deviation < 1.6) return '各执一词'
  if (deviation < 1.75) return '你死我活'
  return '厨黑大战'
}
