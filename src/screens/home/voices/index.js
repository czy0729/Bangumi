/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-13 22:54:51
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const title = '角色'

export default
@inject(Store)
@withHeader({
  title: ({ name } = {}) => `${name}的${title}`,
  screen: title,
  hm: ['voices', 'Voices']
})
@obc
class Voices extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: '角色.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('角色.右上角菜单', {
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
    return (
      <View style={_.container.plain}>
        <ToolBar />
        <List />
      </View>
    )
  }
}
