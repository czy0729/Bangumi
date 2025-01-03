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
import { _, systemStore, useStore } from '@stores'
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
        {translateResult.map((item, index) => (
          <View key={index} style={_.mt.sm}>
            {!!item.src && (
              <Text style={[_.mt.md, _.mb.xs]} type='sub' size={12} lineHeight={14} selectable>
                {item.src.trim()}
              </Text>
            )}
            <Text style={_.mt.xs} size={15} lineHeight={17} selectable>
              {item.dst.trim()}
            </Text>
          </View>
        ))}
        {systemStore.setting.translateEngine === 'deeplx' && (
          <Text style={_.mt.sm} type='sub' size={10} bold align='right'>
            by DeepLX
          </Text>
        )}
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
