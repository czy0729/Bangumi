/*
 * @Author: czy0729
 * @Date: 2023-01-10 05:37:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:02:20
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { Avatar, InView, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Collabs() {
  const { $, navigation } = useStore<Ctx>()
  const { collabs } = $.mono
  if (!collabs?.length) return null

  return (
    <InView style={styles.container}>
      <SectionTitle
        style={_.container.wind}
        right={
          <Flex>
            <Touchable
              style={styles.touch}
              onPress={() => {
                navigation.push('WebBrowser', {
                  url: `${HOST}/${$.monoId}/collabs`,
                  title: `${$.nameTop}的合作`
                })

                t('人物.跳转', {
                  from: '合作',
                  to: 'WebBrowser',
                  monoId: $.monoId
                })
              }}
            >
              <Flex>
                <Text style={_.ml.sm} type='sub'>
                  全部
                </Text>
                <Iconfont style={_.ml.xs} name='md-open-in-new' color={_.colorSub} size={16} />
              </Flex>
            </Touchable>
          </Flex>
        }
      >
        合作
      </SectionTitle>
      <ScrollView
        style={_.mt.md}
        contentContainerStyle={_.container.wind}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {collabs.map(item => (
          <Touchable
            key={item.href}
            style={styles.item}
            animate
            onPress={() => {
              appNavigate(item.href, navigation)

              t('人物.跳转', {
                from: '合作',
                to: 'Mono',
                monoId: $.monoId,
                href: item.href
              })
            }}
          >
            <Flex>
              <Avatar name={item.name} src={item.cover} />
              <View style={_.ml.sm}>
                <Flex>
                  <Text size={13} bold>
                    {item.name}
                  </Text>
                </Flex>
                <Text style={_.mt.xs} size={10} type='sub' bold>
                  {item.count}
                </Text>
              </View>
            </Flex>
          </Touchable>
        ))}
      </ScrollView>
      <PreventTouchPlaceholder />
    </InView>
  )
}

export default ob(Collabs, COMPONENT)
