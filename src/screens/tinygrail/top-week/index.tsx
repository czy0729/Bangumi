/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:39:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 15:48:31
 */
import React from 'react'
import { View } from 'react-native'
import {
  Avatar,
  Component,
  Flex,
  HeaderV2,
  Page,
  ScrollView,
  Text,
  TextType,
  Touchable
} from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { formatNumber, info, tinygrailOSS } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { M } from '@constants'
import { NavigationProps } from '@types'
import { useTinygrailTopWeekPage } from './hooks'
import { HM } from './ds'
import { memoStyles } from './styles'

/** 每周萌王 */
const TinygrailTopWeek = (props: NavigationProps) => {
  const { id, $, navigation } = useTinygrailTopWeekPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-tinygrail-top-week'>
        <StoreContext.Provider value={id}>
          <Page style={_.container.tinygrail}>
            <ScrollView contentContainerStyle={_.container.page} scrollToTop>
              {$.topWeek.list.map(item => {
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
                  <View key={item.id} style={styles.item}>
                    <Flex style={styles.wrap}>
                      <Avatar
                        style={styles.avatar}
                        src={tinygrailOSS(item.avatar)}
                        size={36}
                        borderColor='transparent'
                        name={item.name}
                        skeletonType='tinygrail'
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
                                <Text style={styles.rank} size={12} bold align='center'>
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
              })}
            </ScrollView>
          </Page>
          <HeaderV2
            backgroundStyle={_.container.tinygrail}
            title='每周萌王'
            hm={HM}
            headerRight={() => (
              <IconHeader
                name='md-refresh'
                color={_.colorTinygrailPlain}
                onPress={async () => {
                  await $.fetchTopWeek()
                  info('已刷新')

                  t('每周萌王.刷新')
                }}
              />
            )}
          />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailTopWeek
