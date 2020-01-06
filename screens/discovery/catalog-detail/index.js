/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-06 19:57:06
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { _ } from '@stores'
import { ItemCollections } from '@screens/_'
import { open } from '@utils'
import { inject, withTransitionHeader, observer } from '@utils/decorators'
import { findBangumiCn } from '@utils/app'
import { hm, t } from '@utils/fetch'
import { HOST } from '@constants'
import IconFavor from './icon-favor'
import Info from './info'
import Store from './store'

const title = '目录详情'

export default
@inject(Store)
@withTransitionHeader({
  screen: title
})
@observer
class CatalogDetail extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    const { title, joinUrl, byeUrl } = $.catalogDetail
    navigation.setParams({
      extra: !!(joinUrl || byeUrl) && <IconFavor $={$} />,
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('目录详情.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(`${HOST}/index/${$.catalogId}`)
              break
            default:
              break
          }
        }
      }
    })
    withTransitionHeader.setTitle(navigation, title)

    hm(`index/${$.catalogId}`, 'CatalogDetail')
  }

  render() {
    const { $, navigation } = this.context
    const { onScroll } = this.props
    const event = {
      id: '目录详情.跳转'
    }
    return (
      <ListView
        style={_.container.content}
        contentContainerStyle={_.container.bottom}
        keyExtractor={item => String(item.id)}
        data={$.catalogDetail}
        ListHeaderComponent={<Info />}
        renderItem={({ item }) => (
          <ItemCollections
            navigation={navigation}
            event={event}
            id={item.id}
            type={item.type}
            cover={item.image}
            name={item.title}
            nameCn={findBangumiCn(item.title)}
            tip={item.info}
            comments={item.comment}
            isCatalog
            isCollect={item.isCollect}
          />
        )}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onHeaderRefresh={$.fetchCatalogDetail}
        {...withTransitionHeader.listViewProps}
      />
    )
  }
}
