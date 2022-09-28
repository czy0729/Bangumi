/*
 * @Author: czy0729
 * @Date: 2020-03-19 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-28 17:14:47
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, RenderHtml, Loading, Text, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function Content(props, { $, navigation }: Ctx) {
  global.rerender('Topic.Content')

  const event = {
    id: '帖子.跳转',
    data: {
      from: '#1',
      topicId: $.topicId
    }
  } as const

  const { translateResult } = $.state
  const isGroup = $.topicId.includes('group/')
  return (
    <View style={styles.html}>
      {isGroup && !$.html && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
      {translateResult.length ? (
        <View>
          {translateResult.map((item, index) => (
            <View key={index}>
              <Text style={_.mt.md} size={13} lineHeight={14} type='sub'>
                {item.src.trim()}
              </Text>
              <Text style={_.mt.xs} size={15} lineHeight={17}>
                {item.dst.trim()}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        !!$.html && (
          <>
            {$.isEp && (
              <View style={styles.iconTranslate}>
                <IconTouchable
                  name='md-g-translate'
                  size={18}
                  onPress={$.doTranslate}
                />
                <Heatmap id='帖子.翻译内容' />
              </View>
            )}
            <View style={_.mt.md}>
              <RenderHtml
                html={$.html}
                matchLink
                onLinkPress={(href, passProps = {}) =>
                  appNavigate(href, navigation, passProps, event)
                }
              />
              <Heatmap bottom={133} id='帖子.跳转' to='Blog' alias='日志' transparent />
              <Heatmap
                bottom={100}
                id='帖子.跳转'
                to='CatalogDetail'
                alias='目录'
                transparent
              />
              <Heatmap bottom={67} id='帖子.跳转' to='Topic' alias='帖子' transparent />
              <Heatmap bottom={34} id='帖子.跳转' to='Mono' alias='人物' transparent />
              <Heatmap id='帖子.跳转' to='WebBrowser' alias='浏览器' transparent />
            </View>
          </>
        )
      )}
    </View>
  )
}

export default obc(Content)
