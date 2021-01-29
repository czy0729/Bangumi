/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 13:59:19
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import Tabs from './tabs'
import Store from './store'

const title = '收藏的人物'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['character', 'Character']
})
@obc
class Character extends React.Component {
  static navigationOptions = {
    title: '用户人物'
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    const { userName } = $.params
    navigation.setParams({
      heatmap: '收藏的人物.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('收藏的人物.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(`${HOST}/user/${userName}/mono`)
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
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>
        {!!_loaded && <Tabs />}
        <Heatmap
          right={_.wind + 62}
          bottom={_.window.height - _.tabsHeaderHeight - 12}
          id='收藏的人物.标签页切换'
          transparent
        />
        <Heatmap
          right={_.wind}
          bottom={_.window.height - _.tabsHeaderHeight - 12}
          id='收藏的人物.标签页点击'
          transparent
        />
      </View>
    )
  }
}
