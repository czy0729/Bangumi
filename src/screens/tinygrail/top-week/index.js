/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:39:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 13:00:44
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { Avatar, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { M } from '@constants'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Store from './store'

const title = '每周萌王'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/top-week', 'TopWeek'],
  withHeaderParams
})
@observer
class TinygrailTopWeek extends React.Component {
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
          color={_.colorTinygrailPlain}
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
              changeColor = 'warning'
            } else if (item.rankChange < 0) {
              changeColor = 'ask'
            } else {
              changeColor = 'bid'
            }

            let extraText
            if (item.extra > M) {
              extraText = `${formatNumber(item.extra / M, 1)}万`
            } else {
              extraText = formatNumber(item.extra, 1)
            }

            let extraChangeColor
            if (item.extraChange < 0) {
              extraChangeColor = 'ask'
            } else {
              extraChangeColor = 'bid'
            }

            let extraChangeText
            if (item.extraChange > M) {
              extraChangeText = `${formatNumber(item.extraChange / M, 1)}万`
            } else {
              extraChangeText = formatNumber(Math.abs(item.extraChange), 1)
            }

            let typeChangeColor
            if (item.typeChange < 0) {
              typeChangeColor = 'ask'
            } else {
              typeChangeColor = 'bid'
            }

            return (
              <View key={item.id} style={this.styles.item}>
                <Flex
                  style={[this.styles.wrap, index !== 0 && this.styles.border]}
                >
                  <Avatar
                    style={this.styles.avatar}
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
                          <Text type='tinygrailPlain' size={15} bold>
                            {item.rank}. {item.name}
                            {!!item.rankChange && (
                              <Text type={changeColor} size={15}>
                                {' '}
                                {item.rankChange > 0 && '+'}
                                {item.rankChange}
                              </Text>
                            )}
                          </Text>
                        </Flex.Item>
                        <View style={_.ml.sm}>
                          <Text type='tinygrailText' size={11} align='right'>
                            <Text size={13} bold>
                              +{extraText}
                            </Text>{' '}
                            {item.type}人
                          </Text>
                          <Flex style={_.mt.xs} justify='end'>
                            {!!item.extraChange && (
                              <Text type={extraChangeColor} size={11}>
                                {item.extraChange > 0 ? '+' : '-'}
                                {extraChangeText}
                              </Text>
                            )}
                            {!!item.typeChange && (
                              <>
                                <Text type='tinygrailText' size={11}>
                                  {' '}
                                </Text>
                                <Text type={typeChangeColor} size={11}>
                                  {item.typeChange > 0 && '+'}
                                  {item.typeChange}人
                                </Text>
                              </>
                            )}
                          </Flex>
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
    flex: 1,
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
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
