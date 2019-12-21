/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-21 14:01:32
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { ItemNotify } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { HTML_NOTIFY } from '@constants/html'
import Store from './store'

const title = '电波提醒'

export default
@inject(Store)
@withHeader({
  screen: title
})
@observer
class Notify extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('电波提醒.右上角菜单', {
            key
          })
          switch (key) {
            case '浏览器查看':
              open(HTML_NOTIFY())
              break
            default:
              break
          }
        }
      }
    })

    await $.init()
    $.doClearNotify()

    hm('notify/all', 'Notify')
  }

  render() {
    const { $, navigation } = this.context
    const event = {
      id: '电波提醒.跳转'
    }
    return (
      <ListView
        style={_.container.content}
        keyExtractor={(item, index) => String(index)}
        data={$.notify}
        renderItem={({ item, index }) => (
          <ItemNotify
            key={item.userId}
            navigation={navigation}
            index={index}
            event={event}
            {...item}
          />
        )}
        onHeaderRefresh={$.fetchNotify}
      />
    )
  }
}
