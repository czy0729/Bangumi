/*
 * @Author: czy0729
 * @Date: 2019-11-17 14:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-25 14:42:58
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'

export default
@observer
class AuctionList extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    show: false
  }

  onPress = () =>
    this.setState({
      show: true
    })

  render() {
    const { $, navigation } = this.context
    const { style } = this.props
    const { show } = this.state
    const { list, _loaded } = $.auctionList
    let successCount = 0
    let successAmount = 0
    list
      .filter(item => item.state === 1)
      .forEach(item => {
        successCount += 1
        successAmount += item.amount
      })
    return (
      <View style={[this.styles.container, style]}>
        {_loaded && (
          <View style={this.styles.info}>
            {list.length ? (
              <Text
                style={{
                  color: _.colorTinygrailPlain
                }}
              >
                上周公示：共 {list.length || '-'} 人拍卖，成功{' '}
                {successCount || '-'} 人 /{' '}
                {successAmount ? formatNumber(successAmount, 0) : '-'} 股
              </Text>
            ) : (
              <Flex style={_.mt.md} direction='column'>
                <Text
                  style={[
                    _.mt.sm,
                    {
                      color: _.colorTinygrailPlain
                    }
                  ]}
                >
                  上周没有拍卖纪录
                </Text>
              </Flex>
            )}
          </View>
        )}
        {show &&
          list
            .sort((a, b) => b.price - a.price)
            .map(item => {
              const isSuccess = item.state === 1
              return (
                <Flex
                  key={`${item.time}|${item.price}|${item.amount}`}
                  style={this.styles.item}
                >
                  <Text style={this.styles.time} size={12}>
                    {item.time}
                  </Text>
                  <Flex.Item style={_.ml.sm}>
                    <Text
                      style={this.styles.plain}
                      size={12}
                      onPress={() => {
                        t('资产重组.跳转', {
                          to: 'Zone',
                          from: '竞拍列表',
                          monoId: $.monoId,
                          userId: item.name
                        })

                        navigation.push('Zone', {
                          userId: item.name
                        })
                      }}
                    >
                      {item.nickname}
                    </Text>
                  </Flex.Item>
                  <Flex.Item style={_.ml.sm}>
                    <Text style={this.styles.text} size={12}>
                      ₵{item.price} / {formatNumber(item.amount, 0)}
                    </Text>
                  </Flex.Item>
                  <Text
                    style={
                      isSuccess ? this.styles.statusBid : this.styles.statusAsk
                    }
                    size={12}
                  >
                    {isSuccess ? '成功' : '失败'}
                  </Text>
                </Flex>
              )
            })}
        {!show && !!list.length && (
          <Touchable onPress={this.onPress}>
            <Flex style={this.styles.notice} justify='center'>
              <Text style={[this.styles.text, _.mt.md]}>[查看记录]</Text>
            </Flex>
          </Touchable>
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    padding: _.wind
  },
  info: {
    paddingBottom: _.sm
  },
  notice: {
    height: 64
  },
  item: {
    paddingVertical: _.sm,
    borderBottomColor: _.colorTinygrailBorder,
    borderBottomWidth: _.hairlineWidth
  },
  time: {
    width: 96,
    color: _.colorTinygrailText
  },
  plain: {
    color: _.colorTinygrailPlain
  },
  text: {
    color: _.colorTinygrailText
  },
  statusBid: {
    ..._.ml.sm,
    color: _.colorBid
  },
  statusAsk: {
    ..._.ml.sm,
    color: _.colorAsk
  }
}))
