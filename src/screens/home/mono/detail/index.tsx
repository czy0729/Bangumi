/*
 * @Author: czy0729
 * @Date: 2022-01-04 04:32:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 22:05:48
 */
import React from 'react'
import { View } from 'react-native'
import { RenderHtml, Expand, Text } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { appNavigate, isChineseParagraph } from '@utils'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import { styles } from './styles'

function Content(props, { $, navigation }: Ctx) {
  rerender('Mono.Content')

  if (!$.detail) return null

  const { translateResultDetail } = $.state
  if (translateResultDetail.length) {
    return (
      <View style={styles.content}>
        <View>
          {translateResultDetail.map((item, index) => (
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
      </View>
    )
  }

  return (
    <View style={styles.content}>
      <Expand ratio={2}>
        <RenderHtml
          style={_.mt.lg}
          html={$.detail}
          onLinkPress={href => appNavigate(href, navigation)}
        />
      </Expand>
      {!isChineseParagraph($.detail) && (
        <View style={styles.iconTranslate}>
          <IconTouchable
            name='md-g-translate'
            size={18}
            onPress={() => $.doTranslate('translateResultDetail', $.detail)}
          />
        </View>
      )}
    </View>
  )
}

export default obc(Content)
