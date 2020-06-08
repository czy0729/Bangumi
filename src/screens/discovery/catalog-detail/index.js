/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-19 19:35:21
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { _ } from '@stores'
import { ItemCollections } from '@screens/_'
import { open } from '@utils'
import { inject, withTransitionHeader, observer } from '@utils/decorators'
import { findSubjectCn, keyExtractor } from '@utils/app'
import { hm, t } from '@utils/fetch'
import { HOST } from '@constants'
import IconFavor from './icon-favor'
import Info from './info'
import Store from './store'

const title = '目录详情'
const event = {
  id: '目录详情.跳转'
}
const ListHeaderComponent = <Info />

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

  renderItem = ({ item }) => {
    const { navigation } = this.context
    return (
      <ItemCollections
        navigation={navigation}
        event={event}
        id={item.id}
        type={item.type}
        cover={item.image}
        name={item.title}
        nameCn={findSubjectCn(item.title, item.id)}
        tip={item.info}
        comments={item.comment}
        isCatalog
        isCollect={item.isCollect}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { onScroll } = this.props
    return (
      <ListView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.catalogDetail}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={this.renderItem}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onHeaderRefresh={$.fetchCatalogDetail}
        {...withTransitionHeader.listViewProps}
      />
    )
  }
}
