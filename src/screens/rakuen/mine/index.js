/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 21:04:35
 */
import React from 'react'
import { ScrollView, Flex } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Item from './item'
import Store from './store'

const title = '我的小组'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['group/mine', 'Mine']
})
@obc
class Mine extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: '我的小组.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('我的小组.右上角菜单', {
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
  }

  render() {
    const { $ } = this.context
    const { list } = $.mine
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.outer}
        scrollToTop
      >
        <Flex wrap='wrap'>
          {list.map(item => (
            <Item key={item.id} {...item} />
          ))}
        </Flex>
      </ScrollView>
    )
  }
}
