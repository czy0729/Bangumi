/*
 * @Author: czy0729
 * @Date: 2022-01-04 04:32:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 17:19:18
 */
import React from 'react'
import { View } from 'react-native'
import { RenderHtml, Text } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function Content(props, { $, navigation }: Ctx) {
  global.rerender('Mono.Content')

  if (!$.info) return null

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
