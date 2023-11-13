/*
 * @Author: czy0729
 * @Date: 2023-02-02 08:17:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:28:28
 */
import React from 'react'
import { Page, Header, ScrollView, Text, Component } from '@components'
import { _ } from '@stores'

const Information = ({ navigation, route }) => {
  const { title = '', message = [], advance = false } = route.params
  return (
    <Component id='screen-information'>
      <Header title='' />
      <Page>
        <ScrollView style={_.container.wind} contentContainerStyle={_.container.bottom}>
          {!!title && (
            <Text style={[_.mt.md, _.mb.sm]} size={24} lineHeight={28} bold>
              {title}说明
            </Text>
          )}
          {(typeof message === 'string' ? [message] : message)
            .filter(item => !!item.trim())
            .map((item: string, index: number) => (
              <Text key={index} style={_.mt.md} size={16} lineHeight={18}>
                {item
                  .replace(/,/g, '，')
                  .replace(/\?/g, '？')
                  .replace(/\(/g, '「')
                  .replace(/\)/g, '」')}
              </Text>
            ))}
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
    </Component>
  )
}

export default Information
