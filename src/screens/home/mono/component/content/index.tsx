/*
 * @Author: czy0729
 * @Date: 2022-01-04 04:32:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:03:02
 */
import React from 'react'
import { View } from 'react-native'
import { RenderHtml, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { appNavigate, isChineseParagraph, removeHTMLTag, removeURLs } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Content() {
  const { $, navigation } = useStore<Ctx>()
  if (!$.info) return null

  const { translateResult } = $.state
  if (translateResult.length) {
    return (
      <View style={styles.content}>
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
      </View>
    )
  }

  return (
    <View style={styles.content}>
      <RenderHtml
        baseFontStyle={_.baseFontStyle.md}
        html={$.info}
        onLinkPress={href => appNavigate(href, navigation)}
      />
      {!isChineseParagraph(removeURLs(removeHTMLTag($.info)), 0.5) && (
        <View style={styles.iconTranslate}>
          <IconTouchable
            name='md-g-translate'
            size={18}
            onPress={() => $.doTranslate('translateResult', $.info)}
          />
        </View>
      )}
    </View>
  )
}

export default ob(Content, COMPONENT)
