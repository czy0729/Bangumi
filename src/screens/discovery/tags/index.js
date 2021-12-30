/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-31 02:33:48
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import Tabs from './tabs'
import Store from './store'

const Tags = (props, { $, navigation }) => {
  useMount(() => {
    $.init()

    navigation.setParams({
      heatmap: '标签索引.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('标签索引.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open($.url)
              break

            default:
              break
          }
        }
      }
    })
  })

  return useObserver(() => (
    <Page loaded={$.state._loaded}>
      <Tabs />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='标签索引.标签页切换'
        transparent
      />
    </Page>
  ))
}

export default injectWithHeader(Store, Tags, {
  screen: '标签',
  alias: '标签索引',
  hm: ['discovery/tags', 'Tags']
})
