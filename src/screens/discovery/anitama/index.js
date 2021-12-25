/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-25 08:05:39
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Page, ScrollView, Touchable, Text, Image, Heatmap } from '@components'
import { Pagination } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useObserver, useMount } from '@utils/hooks'
import { hm, t } from '@utils/fetch'
import Store from './store'

const title = '资讯'
const heatmaps = {
  prev: 'Anitama.上一页',
  next: 'Anitama.下一页',
  search: 'Anitama.页码跳转'
}

const Anitama = (props, { $, navigation }) => {
  useMount(() => {
    $.init()

    navigation.setParams({
      heatmap: 'Anitama.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('Anitama.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open('https://m.news.dmzj.com')
              break

            default:
              break
          }
        }
      }
    })
  })

  const onPress = useCallback(item => {
    t('Anitama.跳转', {
      to: 'WebBrowser',
      url: item.url
    })

    open(item.url)
    hm(item.url, title)
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    const { show, ipt, _loaded } = $.state
    const { list } = $.article
    return (
      <Page style={_.select(_.container.bg, _.container.plain)} loaded={_loaded}>
        <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
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
                      © {item.author} / {item.origin}
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
              <Pagination
                style={_.mt.md}
                input={ipt}
                heatmaps={heatmaps}
                onPrev={$.prev}
                onNext={$.next}
                onChange={$.onChange}
                onSearch={$.doSearch}
              />
            </>
          )}
        </ScrollView>
      </Page>
    )
  })
}

export default injectWithHeader(Store, Anitama, {
  screen: title,
  alias: 'Anitama',
  hm: ['discovery/anitama', 'Anitama']
})

const memoStyles = _.memoStyles(() => {
  const width = _.window.width - _.wind * 2
  return {
    container: {
      minHeight: _.window.height
    },
    item: {
      paddingTop: 24,
      paddingBottom: _.sm,
      paddingHorizontal: _.wind,
      marginVertical: _.md,
      backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
    },
    cover: {
      width,
      height: width * 0.64
    },
    info: {
      paddingVertical: _.space
    }
  }
})
