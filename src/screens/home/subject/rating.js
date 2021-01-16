/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:21:54
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { open, toFixed } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

export default
@obc
class Ranting extends React.Component {
  state = {
    show: false
  }

  setShow = () =>
    this.setState({
      show: true
    })

  /**
   * 标准差
   */
  get deviation() {
    const { $ } = this.context
    const { total, count, score } = $.rating
    if (total == 0) {
      return 0
    }

    const scores = Object.values(count).reverse()
    return calculateSD(scores, score, total)
  }

  get showScore() {
    const { $ } = this.context
    const { show } = this.state
    return !$.hideScore || show
  }

  renderTitle() {
    const { showRating } = systemStore.setting
    const { $ } = this.context
    const { rank = '-' } = $.subject
    return (
      <SectionTitle
        right={
          showRating && (
            <Touchable
              onPress={() => {
                t('条目.跳转', {
                  to: 'Netabare',
                  from: '评分分布',
                  subjectId: $.subjectId
                })
                open(`https://netaba.re/subject/${$.subjectId}`)
              }}
            >
              <Flex>
                {this.showScore && (
                  <Text type='sub' bold>
                    #{rank}{' '}
                  </Text>
                )}
                <Text type='sub'>趋势</Text>
                <Iconfont name='right' size={16} />
              </Flex>
              <Heatmap
                id='条目.跳转'
                data={{
                  from: '评分分布'
                }}
              />
            </Touchable>
          )
        }
        icon={!showRating && 'right'}
        onPress={() => $.switchBlock('showRating')}
      >
        评分{' '}
        {this.showScore && (
          <>
            <Text type='warning' size={18} lineHeight={18} bold>
              {' '}
              {$.rating.score}{' '}
            </Text>
            {!!$.rating.total && (
              <Text size={12} lineHeight={18} type='sub'>
                ({$.rating.total}){' '}
              </Text>
            )}
          </>
        )}
      </SectionTitle>
    )
  }

  renderRating() {
    const { $, navigation } = this.context
    const { friend = {} } = $.subjectFormHTML
    const { rating = 0 } = $.collection
    return (
      <>
        <Flex style={_.mt.md}>
          {Object.keys($.rating.count)
            .reverse()
            .map((item, index) => {
              const height = getHeight($.rating.total, $.rating.count[item])
              const isActive = rating == item
              return (
                <Flex.Item key={item} style={index > 0 && _.ml.xs}>
                  <Flex style={this.styles.item} justify='center' align='end'>
                    <View
                      style={[
                        this.styles.itemFill,
                        isActive && this.styles.itemFillActive,
                        {
                          height
                        }
                      ]}
                    />
                    <Text
                      style={[
                        this.styles.total,
                        {
                          bottom: height
                        }
                      ]}
                      size={10}
                      type={isActive ? 'warning' : 'sub'}
                      align='center'
                      bold
                    >
                      {$.rating.count[item]}{' '}
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
            <Touchable onPress={() => $.toRating(navigation, '评分分布')}>
              <Flex>
                {friend.score ? (
                  <Text size={12} type='sub'>
                    好友
                    <Text size={12} type='main' bold>
                      {' '}
                      {friend.score}{' '}
                    </Text>
                    <Text size={12} lineHeight={12} type='sub'>
                      ({friend.total}){' '}
                    </Text>
                  </Text>
                ) : (
                  <Text size={12} lineHeight={12} type='sub'>
                    用户评分{' '}
                  </Text>
                )}
                <Iconfont name='right' size={12} />
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
            name='right'
            size={14}
            onPress={() =>
              Alert.alert(
                '标准差',
                '0-1 异口同声\n1.15 基本一致\n1.3 略有分歧\n1.45 莫衷一是\n1.6 各执一词\n1.75 你死我活\n'
              )
            }
          >
            <Flex>
              <Text size={12} type='sub'>
                标准差
              </Text>
              <Text size={12} type='main' bold>
                {' '}
                {toFixed(this.deviation, 2)}{' '}
              </Text>
              <Text size={12} lineHeight={12} type='sub'>
                {getDispute(this.deviation)}{' '}
              </Text>
              <Iconfont name='information' size={14} />
            </Flex>
          </Touchable>
        </Flex>
      </>
    )
  }

  render() {
    const { style } = this.props
    const { showRating } = systemStore.setting
    return (
      <View style={[_.container.wind, style, !showRating && _.short]}>
        {this.renderTitle()}
        {showRating && (
          <View>
            {this.showScore ? (
              this.renderRating()
            ) : (
              <Touchable onPress={this.setShow}>
                <Flex style={this.styles.hideScore} justify='center'>
                  <Text>评分已隐藏, 点击显示</Text>
                </Flex>
              </Touchable>
            )}
          </View>
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  item: {
    height: 112,
    paddingBottom: _.xs,
    marginTop: -_.md
  },
  itemFill: {
    position: 'absolute',
    left: '50%',
    width: 6,
    marginLeft: -3,
    backgroundColor: _.select(_.colorWait, _._colorSub),
    borderRadius: 3
  },
  itemFillActive: {
    backgroundColor: _.colorWarning
  },
  total: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    left: 0,
    marginBottom: 4
  },
  hideScore: {
    height: 144
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
