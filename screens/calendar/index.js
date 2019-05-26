/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-25 02:47:07
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from '@components'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { HTML_CALENDAR } from '@constants/html'
import _ from '@styles'
import List from './list'
import Store from './store'

export default
@inject(Store)
@withHeader()
@observer
class Calendar extends React.Component {
  static navigationOptions = {
    title: '每日放送'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(HTML_CALENDAR())
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
    if (!$.calendar._loaded) {
      return <Loading style={_.container.screen} />
    }

    return <List />
  }
}
