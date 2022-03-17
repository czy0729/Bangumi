/*
 * @Author: czy0729
 * @Date: 2022-01-04 04:32:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-11 05:35:22
 */
import React from 'react'
import { View } from 'react-native'
import { RenderHtml, Text } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'

function Content(props, { $, navigation }) {
  rerender('Mono.Content')

  if (!$.info) return null

  const styles = memoStyles()
  const { translateResult } = $.state
  return (
    <View style={styles.content}>
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
        <>
          <RenderHtml
            html={$.info}
            onLinkPress={href => appNavigate(href, navigation)}
          />
          <View style={styles.iconTranslate}>
            <IconTouchable
              name='md-g-translate'
              size={18}
              onPress={() => $.doTranslate('translateResult', $.info)}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default obc(Content)

const memoStyles = _.memoStyles(() => ({
  content: {
    paddingHorizontal: _.xs,
    marginTop: _.md
  },
  iconTranslate: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -4
  }
}))
