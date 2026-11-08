/*
 * @Author: czy0729
 * @Date: 2023-02-02 08:17:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:00:00
 *
 * 通用说明页: 标题 + 正文 + 配图, 支持会员与引用来源入口
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, HeaderV2, Page, ScrollView, Text } from '@components'
import { _ } from '@stores'
import { appNavigate, stl } from '@utils'
import Images from './components/images'
import { HM } from './ds'

import type { NavigationProps } from '@types'
import type { Params } from './types'

/** 说明 */
function Information({ navigation, route }: NavigationProps) {
  const { title = '', message = [], images = [], advance = false, ai, url } = (route?.params ||
    {}) as Params
  const messageData: string[] = typeof message === 'string' ? message.split(',') : message
  const imagesData: string[] = typeof images === 'string' ? images.split(',') : images
  const size = messageData.length >= 10 ? 14 : 16

  const handlePressUrl = useCallback(() => {
    if (url) appNavigate(url, navigation)
  }, [url, navigation])

  const handlePressQiafan = useCallback(() => {
    navigation.push('Qiafan')
  }, [navigation])

  return (
    <Component id='screen-information'>
      <Page>
        <HeaderPlaceholder />
        <ScrollView style={_.container.wind} contentContainerStyle={_.container.bottom}>
          {!!title && (
            <Text style={stl(_.mt.md, _.mb.sm)} size={24} lineHeight={28} bold selectable>
              「{title}」补充说明
            </Text>
          )}
          {messageData
            .filter(item => !!item.trim())
            .map((item: string, index: number) => (
              <Text
                key={index}
                style={_.mt.md}
                size={size}
                lineHeight={size + 2}
                selectable
              >
                {item
                  .replace(/,/g, '，')
                  .replace(/\?/g, '？')
                  .replace(/\(/g, '「')
                  .replace(/\)/g, '」')}
              </Text>
            ))}
          <Images data={imagesData} />
          {!!ai && (
            <Text style={_.mt.lg} type='sub' align='right'>
              内容整理自 @DeepSeek
            </Text>
          )}
          {!!url && (
            <Text
              style={stl(_.mt.md, _.mr._sm)}
              type='sub'
              align='right'
              onPress={handlePressUrl}
            >
              内容引用地址 〉
            </Text>
          )}
          {advance && (
            <Text
              style={stl(_.mt.lg, _.mr._sm)}
              type='sub'
              size={16}
              lineHeight={18}
              align='right'
              onPress={handlePressQiafan}
            >
              关于会员 〉
            </Text>
          )}
        </ScrollView>
      </Page>
      <HeaderV2 title='' hm={HM} />
    </Component>
  )
}

export default observer(Information)
