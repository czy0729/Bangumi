/*
 * @Author: czy0729
 * @Date: 2022-01-04 04:32:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-16 06:07:07
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { HTML, IconTouchable } from '@_'
import { _ } from '@stores'
import { isChineseParagraph } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Content(_props, { $, navigation }: Ctx) {
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
      <HTML
        navigation={navigation}
        style={_.mt.lg}
        ratio={1.2}
        msg={$.detail}
        length={400}
        matchLink={false}
      />
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

export default obc(Content, COMPONENT)
