/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 14:51:53
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import Tabs from './tabs'
import List from './list'
import Store from './store'

const title = '收藏的人物'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['character', 'Character']
})
@observer
class Character extends React.Component {
  static navigationOptions = {
    title: '用户人物'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    const { userName } = $.params
    navigation.setParams({
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
      <View style={_.container.bg}>
        {!!_loaded && (
          <Tabs tabs={$.tabs}>
            {$.tabs.map((item, index) => (
              <List key={item.key} index={index} />
            ))}
          </Tabs>
        )}
      </View>
    )
  }
}
