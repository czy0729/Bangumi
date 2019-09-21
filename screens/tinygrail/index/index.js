/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-22 00:34:26
 */
import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { StatusBarEvents } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import { colorContainer } from '../styles'
import Auth from './auth'
import Menus from './menus'
import Store from './store'

export default
@inject(Store)
@observer
class Tinygrail extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('tinygrail')
  }

  render() {
    return (
      <ScrollView
        style={[
          _.container.flex,
          {
            backgroundColor: colorContainer
          }
        ]}
      >
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <StatusBarPlaceholder style={{ backgroundColor: colorContainer }} />
        <Auth />
        <Menus />
      </ScrollView>
    )
  }
}
