/*
 * @Author: czy0729
 * @Date: 2022-01-10 11:19:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-30 21:28:21
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Touchable, Text, Image, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const title = '资讯'

function List(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { show } = $.state
  const { list } = $.article
  const onPress = item => {
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
    <ScrollView scrollToTop>
      {show && (
        <>
          <View style={styles.container}>
            {list.map((item, index) => (
              <Touchable
                key={item.aid}
                style={styles.item}
                onPress={() => onPress(item)}
              >
                <Text align='right'>
                  © {[item.author, item.origin].filter(item => !!item).join(' / ')}
                </Text>
                <Image
                  style={_.mt.md}
                  src={item.cover.url}
                  headers={item.cover.headers}
                  width={styles.cover.width}
                  height={styles.cover.height}
                  radius
                  shadow
                />
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
        </>
      )}
    </ScrollView>
  )
}

export default obc(List)
