/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:39:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:42:28
 */
import React from 'react'
import { View } from 'react-native'
import { Header, Page, ScrollView, Flex, Text, Touchable, TextType } from '@components'
import { Avatar, IconHeader } from '@_'
import { _ } from '@stores'
import { formatNumber, info, tinygrailOSS } from '@utils'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { M } from '@constants'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

class TinygrailTopWeek extends React.Component {
  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()
  }

  renderItem = item => {
    const { navigation }: Ctx = this.context
    let changeColor: TextType
    if (item.rankChange === 'new') {
      changeColor = 'warning'
    } else if (item.rankChange < 0) {
      changeColor = 'ask'
    } else {
      changeColor = 'bid'
    }

    let extraText: string
    if (item.extra > M) {
      extraText = `${formatNumber(item.extra / M, 1)}万`
    } else {
      extraText = formatNumber(item.extra, 1)
    }

    let extraChangeColor: TextType
    if (item.extraChange < 0) {
      extraChangeColor = 'ask'
    } else {
      extraChangeColor = 'bid'
    }

    let extraChangeText: string
    if (item.extraChange > M) {
      extraChangeText = `${formatNumber(item.extraChange / M, 1)}万`
    } else {
      extraChangeText = formatNumber(Math.abs(item.extraChange), 1)
    }

    let typeChangeColor: TextType
    if (item.typeChange < 0) {
      typeChangeColor = 'ask'
    } else {
      typeChangeColor = 'bid'
    }

    return (
      <View key={item.id} style={this.styles.item}>
        <Flex style={this.styles.wrap}>
          <Avatar
            style={this.styles.avatar}
            src={tinygrailOSS(item.avatar)}
            size={36}
            borderColor='transparent'
            name={item.name}
            onPress={() => {
              t('每周萌王.跳转', {
                to: 'Mono',
                monoId: item.id
              })

              navigation.push('Mono', {
                monoId: `character/${item.id}`,
                _name: item.name
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
                  <Flex>
                    <Text style={this.styles.rank} size={12} bold align='center'>
                      {item.rank}
                    </Text>
                    <Text type='tinygrailPlain' bold>
                      {item.name}
                      {!!item.rankChange && (
                        <Text type={changeColor}>
                          {' '}
                          {item.rankChange > 0 && '+'}
                          {item.rankChange}
                        </Text>
                      )}
                    </Text>
                  </Flex>
                </Flex.Item>
                <View style={_.ml.sm}>
                  <Text type='tinygrailText' size={11} align='right' bold>
                    <Text size={13} type='tinygrailPlain' bold>
                      +{extraText}
                    </Text>
                    {'  '}
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
                  <Text style={_.mt.xs} type='tinygrailText' size={11} align='right'>
                    平均拍价：
                    {formatNumber(
                      (item.extra + item.price * item.sacrifices) / item.assets
                    )}
                  </Text>
                </View>
              </Flex>
            </Touchable>
          </Flex.Item>
        </Flex>
      </View>
    )
  }

  render() {
    const { $ }: Ctx = this.context
    const { list } = $.topWeek
    return (
      <>
        <StatusBarEvents />
        <Header
          title='每周萌王'
          hm={['tinygrail/top-week', 'TopWeek']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <IconHeader
              style={_.mr._sm}
              name='md-refresh'
              color={_.colorTinygrailPlain}
              onPress={async () => {
                t('每周萌王.刷新')

                await $.fetchTopWeek()
                info('已刷新')
              }}
            />
          )}
        />
        <Page style={_.container.tinygrail}>
          <ScrollView
            style={_.container.flex}
            contentContainerStyle={_.container.bottom}
            scrollToTop
          >
            {list.map(this.renderItem)}
          </ScrollView>
        </Page>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(TinygrailTopWeek))
