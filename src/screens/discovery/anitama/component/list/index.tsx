/*
 * @Author: czy0729
 * @Date: 2022-01-10 11:19:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 04:09:29
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Heatmap, Image, ScrollView, Squircle, Text, Touchable } from '@components'
import { InView } from '@_'
import { _, systemStore, useStore } from '@stores'
import { open } from '@utils'
import { hm, t } from '@utils/fetch'
import { TITLE } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { NewsItem } from '@stores/discovery/types'
import type { Ctx } from '../../types'

function List() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { useWebView } = $.state

  const handlePress = useCallback(
    (item: NewsItem) => {
      if (useWebView) {
        navigation.push('WebBrowser', {
          url: item.url,
          title: item.title
        })
      } else {
        open(item.url)
      }

      t('Anitama.跳转', {
        to: 'WebBrowser',
        url: item.url,
        useWebView
      })
      hm(item.url, TITLE)
    },
    [navigation, useWebView]
  )

  return (
    <ScrollView keyboardDismissMode='on-drag' onScroll={$.onScroll}>
      {$.state.show && (
        <View style={styles.container}>
          {$.article.list.map((item, index) => (
            <Touchable key={item.aid} style={styles.item} animate onPress={() => handlePress(item)}>
              <Text align='right'>© {[item.author, item.origin].filter(i => !!i).join(' / ')}</Text>

              <InView style={_.mt.md} y={InView.y(index, 280)}>
                <Squircle
                  width={styles.cover.width}
                  height={styles.cover.height}
                  radius={systemStore.coverRadius}
                >
                  <Image
                    src={item.cover.url}
                    headers={item.cover.headers}
                    width={styles.cover.width}
                    height={styles.cover.height}
                    radius={0}
                    errorToHide
                  />
                </Squircle>
              </InView>

              <View style={styles.info}>
                <Text size={18} type='title' bold>
                  {item.title}
                </Text>
                {!!item.subtitle && (
                  <Text style={_.mt.sm} lineHeight={18} type='sub' bold>
                    {item.subtitle}
                  </Text>
                )}
                {!!item.intro && (
                  <Text style={_.mt.md} type='sub' lineHeight={18}>
                    {item.intro}
                  </Text>
                )}
              </View>

              {!index && <Heatmap id='Anitama.跳转' />}
            </Touchable>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

export default observer(List)
