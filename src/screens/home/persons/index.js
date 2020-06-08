/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:36:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 20:21:04
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import List from './list'
import Store from './store'

const title = '制作人员'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['persons', 'Persons']
})
@observer
class Persons extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: `${name}的制作人员`
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
          t('制作人员.右上角菜单', {
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
        <List />
      </View>
    )
  }
}
