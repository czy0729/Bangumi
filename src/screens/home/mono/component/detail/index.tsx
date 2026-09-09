/*
 * @Author: czy0729
 * @Date: 2022-01-04 04:32:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:01:23
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { HTML, IconTouchable } from '@_'
import { _, systemStore, useStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Content() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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
        {systemStore.translateEngine === 'gemini' && (
          <Text style={_.mt.sm} type='sub' size={10} bold align='right'>
            by ✨Gemini
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

export default observer(Content)
