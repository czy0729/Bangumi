/*
 * @Author: czy0729
 * @Date: 2023-02-02 08:17:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:12:11
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, HeaderPlaceholder, HeaderV2, Page, ScrollView, Text } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import Images from './images'
import { HM } from './ds'

import type { Params } from './types'

/** 说明 */
const Information = ({ navigation, route }) => {
  return useObserver(() => {
    const {
      title = '',
      message = [],
      images = [],
      advance = false,
      ai,
      url
    } = route.params as Params
    const messageData: string[] = typeof message === 'string' ? message.split(',') : message
    const imagesData: string[] = typeof images === 'string' ? images.split(',') : images
    const size = messageData.length >= 10 ? 15 : 16

    return (
      <Component id='screen-information'>
        <Page>
          <HeaderPlaceholder />
          <ScrollView style={_.container.wind} contentContainerStyle={_.container.bottom}>
            {!!title && (
              <Text style={[_.mt.md, _.mb.sm]} size={24} lineHeight={28} bold selectable>
                「{title}」补充说明
              </Text>
            )}
            {messageData
              .filter(item => !!item.trim())
              .map((item: string, index: number) => (
                <Text
                  key={index}
                  style={_.mt.md}
                  size={messageData.length >= 10 ? 14 : 16}
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
                style={[_.mt.md, _.mr._sm]}
                type='sub'
                align='right'
                onPress={() => {
                  appNavigate(url, navigation)
                }}
              >
                内容引用地址 〉
              </Text>
            )}
            {advance && (
              <Text
                style={[_.mt.lg, _.mr._sm]}
                type='sub'
                size={16}
                lineHeight={18}
                align='right'
                onPress={() => {
                  navigation.push('Qiafan')
                }}
              >
                关于会员 〉
              </Text>
            )}
          </ScrollView>
        </Page>
        <HeaderV2 title='' hm={HM} />
      </Component>
    )
  })
}

export default Information
