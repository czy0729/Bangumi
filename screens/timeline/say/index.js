/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-26 20:58:52
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

const title = '吐槽'

export default
@inject(Store)
@withHeader({
  screen: title
})
@observer
class Say extends React.Component {
  static navigationOptions = {
    title
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
      title: $.isNew ? '新吐槽' : '吐槽',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(
                $.isNew
                  ? `${HOST}/timeline?type=say`
                  : `${HOST}/user/${userId}/timeline/status/${id}`
              )
              break
            default:
              break
          }
        }
      }
    })

    hm(
      $.isNew
        ? `${HOST}/timeline?type=say`
        : `/user/${userId}/timeline/status/${id}`,
      'Say'
    )
  }

  showFixedTextare = () => {
    this.fixedTextarea.onFocus()
  }

  render() {
    const { $, navigation } = this.context
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
            placeholder={$.isNew ? '新吐槽' : '回复吐槽, 长按头像@某人'}
            simple
            value={value}
            onClose={$.closeFixedTextarea}
            onChange={$.onChange}
            onSubmit={value => $.doSubmit(value, this.scrollView, navigation)}
          />
        )}
      </>
    )
  }
}
