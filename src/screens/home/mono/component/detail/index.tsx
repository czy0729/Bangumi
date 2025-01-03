/*
 * @Author: czy0729
 * @Date: 2022-01-04 04:32:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:03:10
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { HTML, IconTouchable } from '@_'
import { _, systemStore, useStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Content() {
  const { $, navigation } = useStore<Ctx>()
  if (!$.detail) return null

  const { translateResultDetail } = $.state
  if (translateResultDetail.length) {
    return (
      <View style={styles.content}>
        {translateResultDetail.map((item, index) => (
          <View key={index}>
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
      <HTML
        navigation={navigation}
        style={_.mt.lg}
        ratio={1.2}
        msg={$.detail.replace(/ {2,}/g, ' ')}
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

export default ob(Content, COMPONENT)
