/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-12 22:41:48
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'

const initialRating = {
  count: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  },
  score: 0,
  total: 0
}

function getHeight(total, current) {
  if (!total) {
    return 0
  }
  let percent = current / total
  if (percent > 0 && percent < 0.01) {
    percent = 0.01
  }
  return `${percent * 100}%`
}

class Ranting extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  state = {
    show: false
  }

  setShow = () =>
    this.setState({
      show: true
    })

  renderTitle() {
    const { $ } = this.context
    return (
      <SectionTitle
        right={
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
              <Text type='sub'>netabare</Text>
              <Iconfont name='right' size={16} />
            </Flex>
          </Touchable>
        }
      >
        评分
      </SectionTitle>
    )
  }

  renderRating() {
    const { $ } = this.context
    const { rating = initialRating, rank = '-' } = $.subject
    const { friend = {} } = $.subjectFormHTML
    return (
      <>
        <Flex style={[this.styles.container, _.mt.md]}>
          {Object.keys(rating.count)
            .reverse()
            .map((item, index) => (
              <Flex.Item key={item} style={index > 0 && _.ml.xs}>
                <Flex style={this.styles.item} justify='center' align='end'>
                  <View
                    style={[
                      this.styles.itemFill,
                      {
                        height: getHeight(rating.total, rating.count[item])
                      }
                    ]}
                  />
                  <Text size={10} type='sub'>
                    {rating.count[item]}
                  </Text>
                </Flex>
                <Text style={_.mt.xs} size={12} align='center'>
                  {item}
                </Text>
              </Flex.Item>
            ))}
        </Flex>
        <Text style={_.mt.sm} size={12}>
          <Text size={12} type='main'>
            {rating.score}
          </Text>{' '}
          / {rating.total} votes / Ranked:{' '}
          <Text size={12} type='main'>
            #{rank}
          </Text>
        </Text>
        {!!friend.score && (
          <Text style={_.mt.sm} size={12}>
            好友{' '}
            <Text size={12} type='main'>
              {friend.score}
            </Text>{' '}
            / {friend.total} votes
          </Text>
        )}
      </>
    )
  }

  render() {
    const { $ } = this.context
    const { style } = this.props
    const { show } = this.state
    return (
      <View style={[_.container.wind, style]}>
        {this.renderTitle()}
        {$.hideScore && !show ? (
          <Touchable onPress={this.setShow}>
            <Flex style={this.styles.hideScore} justify='center'>
              <Text>评分已隐藏, 点击显示</Text>
            </Flex>
          </Touchable>
        ) : (
          this.renderRating()
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default observer(Ranting)

const memoStyles = _.memoStyles(_ => ({
  container: {
    backgroundColor: _.colorPlain
  },
  item: {
    height: 80,
    paddingBottom: _.xs,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  itemFill: {
    position: 'absolute',
    right: 0,
    left: 0,
    backgroundColor: _.select(_.colorWait, _._colorDarkModeLevel2)
  },
  hideScore: {
    height: 120
  }
}))
