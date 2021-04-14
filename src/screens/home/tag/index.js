/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-13 22:54:48
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const title = '用户标签'

export default
@inject(Store)
@withHeader({
  title: ({ type, tag } = {}) => `${MODEL_SUBJECT_TYPE.getTitle(type)}标签 ${tag}`,
  screen: title
})
@obc
class Tag extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: '用户标签.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('用户标签.右上角菜单', {
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

    const { type, tag, airtime } = navigation.state.params
    hm([type, tag, airtime].filter(item => !!item).join('/'), 'Tag')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>
        <ToolBar />
        {_loaded && <List />}
      </View>
    )
  }
}
