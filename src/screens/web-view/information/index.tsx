/*
 * @Author: czy0729
 * @Date: 2023-02-02 08:17:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 23:34:45
 */
import React from 'react'
import { Component, HeaderV2, Page, ScrollView, Text } from '@components'
import { _ } from '@stores'
import Images from './images'
import { HM } from './ds'
import { styles } from './styles'

/** 说明 */
const Information = ({ navigation, route }) => {
  const { title = '', message = [], images = [], advance = false } = route.params
  const messageData: string[] = typeof message === 'string' ? message.split(',') : message
  const imagesData: string[] = typeof images === 'string' ? images.split(',') : images
  return (
    <Component id='screen-information'>
      <Page>
        <ScrollView style={_.container.wind} contentContainerStyle={styles.contentContainerStyle}>
          {!!title && (
            <Text style={[_.mt.md, _.mb.sm]} size={24} lineHeight={28} bold selectable>
              「{title}」补充说明
            </Text>
          )}
          {messageData
            .filter(item => !!item.trim())
            .map((item: string, index: number) => (
              <Text key={index} style={_.mt.md} size={16} lineHeight={18} selectable>
                {item
                  .replace(/,/g, '，')
                  .replace(/\?/g, '？')
                  .replace(/\(/g, '「')
                  .replace(/\)/g, '」')}
              </Text>
            ))}
          <Images data={imagesData} />
          {!!advance && (
            <Text
              style={_.mt.lg}
              type='sub'
              size={16}
              lineHeight={18}
              onPress={() => navigation.push('Qiafan')}
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

export default Information
