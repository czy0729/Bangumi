/*
 * @Author: czy0729
 * @Date: 2025-12-31 21:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 21:53:33
 */
import React from 'react'
import {
  Component,
  Flex,
  HeaderPlaceholder,
  Iconfont,
  Page,
  ScrollView,
  Text,
  Touchable
} from '@components'
import { Notice } from '@_'
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
          <Notice>不定期收录一些班友开发的项目（非官方）</Notice>
          <ScrollView contentContainerStyle={styles.container}>
            {DATA.map(item => (
              <Flex key={item.title} style={styles.item}>
                <Flex.Item style={_.mr.lg}>
                  <Touchable
                    onPress={() => {
                      if ('path' in item) {
                        navigation.push(item.path)
                      } else {
                        open(item.url.replace('[USER_ID]', String(userStore.myId || '')))
                      }
                    }}
                  >
                    <Flex>
                      <Text size={15} bold underline>
                        {item.title}
                      </Text>
                      {'url' in item && (
                        <Iconfont style={_.ml.sm} name='md-open-in-new' size={18} />
                      )}
                    </Flex>
                  </Touchable>
                </Flex.Item>
                <Touchable
                  onPress={() => {
                    appNavigate(item.topic, navigation)
                  }}
                >
                  <Text type='sub' size={13}>
                    {item.topic.includes('/group/topic/') ? '帖子' : '小组'}
                  </Text>
                </Touchable>
              </Flex>
            ))}
          </ScrollView>
        </Page>
        <Header />
      </Component>
    )
  })
}

export default DiscoveryUsers
