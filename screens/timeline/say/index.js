/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-09 22:49:05
 */
import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { FixedTextarea } from '@components'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { HOST } from '@constants'
import _ from '@styles'
import Chat from './chat'
import Store from './store'

export default
@inject(Store)
@withHeader()
@observer
class Say extends React.Component {
  static navigationOptions = {
    title: '吐槽'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  scrollView
  fixedTextarea

  componentDidMount() {
    const { $, navigation } = this.context
    const { userId, id } = $.params
    $.init(this.scrollView)

    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(`${HOST}/user/${userId}/timeline/status/${id}`)
              break
            default:
              break
          }
        }
      }
    })

    hm(`/user/${userId}/timeline/status/${id}`)
  }

  showFixedTextare = () => {
    this.fixedTextarea.onFocus()
  }

  render() {
    const { $ } = this.context
    const { value } = $.state
    return (
      <>
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          style={_.container.screen}
          contentContainerStyle={_.container.bottom}
        >
          <Chat />
        </ScrollView>
        {$.isWebLogin && (
          <FixedTextarea
            ref={ref => (this.fixedTextarea = ref)}
            placeholder='回复吐槽'
            simple
            value={value}
            onClose={$.closeFixedTextarea}
            onChange={$.onChange}
            onSubmit={value => $.doSubmit(value, this.scrollView)}
          />
        )}
      </>
    )
  }
}
