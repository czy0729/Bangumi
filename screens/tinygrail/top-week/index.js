/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:39:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-08 21:51:27
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { inject, withHeader } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { M } from '@constants'
import { headerStyle } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Store from './store'

const title = '每周萌王'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/top-week', 'TopWeek'],
  ...headerStyle
})
@observer
class Tinygrail extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <IconHeader
          name='refresh'
          color={_.colorTinygrailText}
          onPress={async () => {
            t('每周萌王.刷新')
            await $.fetchTopWeek()
            info('已刷新')
          }}
        />
      )
    })
  }

  render() {
    const { $, navigation } = this.context
    const { list } = $.topWeek
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <ScrollView
          style={_.container.flex}
          contentContainerStyle={_.container.bottom}
        >
          {list.map((item, index) => {
            let changeColor
            if (item.rankChange === 'new') {
              changeColor = _.colorWarning
            } else if (item.rankChange < 0) {
              changeColor = _.colorAsk
            } else {
              changeColor = _.colorBid
            }

            let extraChangeColor
            if (item.extra < 0) {
              extraChangeColor = _.colorAsk
            } else {
              extraChangeColor = _.colorBid
            }

            let extraText
            if (item.extra > M) {
              extraText = `${formatNumber(item.extra / M, 1)}万`
            } else {
              extraText = item.extra
            }

            return (
              <View key={item.id} style={this.styles.item}>
                <Flex
                  style={[this.styles.wrap, index !== 0 && this.styles.border]}
                >
                  <Avatar
                    src={tinygrailOSS(item.avatar)}
                    size={44}
                    borderColor='transparent'
                    name={item.name}
                    onPress={() => {
                      t('每周萌王.跳转', {
                        to: 'Mono',
                        monoId: item.id
                      })

                      navigation.push('Mono', {
                        monoId: `character/${item.id}`
                      })
                    }}
                  />
                  <Flex.Item style={_.ml.md}>
                    <Touchable
                      onPress={() => {
                        t('每周萌王.跳转', {
                          to: 'TinygrailSacrifice',
                          monoId: item.id
                        })

                        navigation.push('TinygrailSacrifice', {
                          monoId: `character/${item.id}`
                        })
                      }}
                    >
                      <Flex>
                        <Flex.Item>
                          <Text
                            style={{
                              color: _.colorTinygrailPlain
                            }}
                            size={16}
                          >
                            {item.rank}. {item.name}
                            {!!item.rankChange && (
                              <Text
                                style={{
                                  color: changeColor
                                }}
                                size={16}
                              >
                                {' '}
                                {item.rankChange > 0 && '+'}
                                {item.rankChange}
                              </Text>
                            )}
                          </Text>
                        </Flex.Item>
                        <View style={_.ml.sm}>
                          <Text
                            style={{
                              color: _.colorTinygrailText
                            }}
                            size={16}
                            align='right'
                          >
                            +{extraText}
                          </Text>
                          {!!item.extraChange && (
                            <Text
                              style={[
                                _.mt.xs,
                                {
                                  color: extraChangeColor
                                }
                              ]}
                              align='right'
                            >
                              {item.extraChange > 0 && '+'}
                              {formatNumber(item.extraChange, 2)}
                            </Text>
                          )}
                        </View>
                      </Flex>
                    </Touchable>
                  </Flex.Item>
                </Flex>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    ..._.container.flex,
    backgroundColor: _.colorTinygrailContainer
  },
  item: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorTinygrailBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
