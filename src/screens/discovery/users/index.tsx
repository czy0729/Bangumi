/*
 * @Author: czy0729
 * @Date: 2025-12-31 21:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-01 14:43:50
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, HeaderPlaceholder, Page, ScrollView, Text, Touchable } from '@components'
import { _, userStore } from '@stores'
import { appNavigate, open } from '@utils'
import { useObserver } from '@utils/hooks'
import Header from './header'
import { DATA } from './ds'
import { memoStyles } from './styles'

import type { NavigationProps } from '@types'

/** 社区项目 */
const DiscoveryUsers = ({ navigation }: NavigationProps) => {
  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component id='screen-discovery-users'>
        <Page>
          <HeaderPlaceholder />

          <ScrollView contentContainerStyle={styles.container}>
            {DATA.map(item => {
              const isInner = 'path' in item
              const isPost = item.topic.includes('/group/topic/')

              return (
                <Flex key={item.title} style={styles.item}>
                  <Flex.Item>
                    <Touchable
                      onPress={() => {
                        if (isInner) {
                          navigation.push(item.path)
                        } else {
                          open(item.url.replace('[USER_ID]', String(userStore.myId || '')))
                        }
                      }}
                    >
                      <View style={styles.main}>
                        <Text size={16} bold>
                          {item.title}
                        </Text>
                        <Text style={_.mt.sm} type='sub' size={12}>
                          {item.name}@{item.userId}
                        </Text>
                      </View>
                    </Touchable>
                  </Flex.Item>

                  <Touchable
                    onPress={() => {
                      appNavigate(item.topic, navigation)
                    }}
                  >
                    <Flex style={styles.sub}>
                      <Text type={_.select('sub', 'icon')}>{isPost ? '讨论' : '小组'}</Text>
                    </Flex>
                  </Touchable>
                </Flex>
              )
            })}

            <Text style={_.mt.lg} type='icon' size={12} align='center'>
              不定期收录一些班友开发的社区项目（非官方）
            </Text>
          </ScrollView>
        </Page>

        <Header />
      </Component>
    )
  })
}

export default DiscoveryUsers
