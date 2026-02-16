/*
 * @Author: czy0729
 * @Date: 2022-01-10 11:19:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 13:11:59
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, Image, ScrollView, Text, Touchable } from '@components'
import { InView } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const title = '资讯'

function List() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const handlePress = item => {
    const { useWebView } = $.state
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
    hm(item.url, title)
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle} onScroll={$.onScroll}>
      {$.state.show && (
        <View style={styles.container}>
          {$.article.list.map((item, index) => (
            <Touchable key={item.aid} style={styles.item} animate onPress={() => handlePress(item)}>
              <Text align='right'>
                © {[item.author, item.origin].filter(item => !!item).join(' / ')}
              </Text>
              <InView style={_.mt.md} y={280 * (index + 1)}>
                <Image
                  src={item.cover.url}
                  headers={item.cover.headers}
                  width={styles.cover.width}
                  height={styles.cover.height}
                  radius
                  errorToHide
                />
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

export default ob(List, COMPONENT)
