/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 21:45:34
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const title = '角色'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['voices', 'Voices']
})
@observer
class Voices extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: `${name}的角色`
    }
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
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
      <View style={_.container.bg}>
        <ToolBar />
        <List />
      </View>
    )
  }
}
