/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-05 17:43:43
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ActivityIndicator } from '@ant-design/react-native'
import { FixedTextarea, Flex } from '@components'
import { NavigationBarEvents } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { HOST } from '@constants'
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
          t('吐槽.右上角菜单', {
            key
          })

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

  connectRefScrollView = ref => (this.scrollView = ref)

  connectRefFixedTextarea = ref => (this.fixedTextarea = ref)

  showFixedTextare = () => this.fixedTextarea.onFocus()

  render() {
    const { $, navigation } = this.context
    const { value } = $.state
    const { _loaded } = $.say
    return (
      <View style={_.container.screen}>
        <NavigationBarEvents />
        {_loaded ? (
          <>
            <ScrollView
              ref={this.connectRefScrollView}
              style={_.container.screen}
              contentContainerStyle={_.container.bottom}
            >
              <Chat />
            </ScrollView>
            {$.isWebLogin && (
              <FixedTextarea
                ref={this.connectRefFixedTextarea}
                placeholder={$.isNew ? '新吐槽' : '回复吐槽, 长按头像@某人'}
                simple
                value={value}
                onChange={$.onChange}
                onClose={$.closeFixedTextarea}
                onSubmit={value =>
                  $.doSubmit(value, this.scrollView, navigation)
                }
              />
            )}
          </>
        ) : (
          <Flex style={_.container.screen} justify='center'>
            <ActivityIndicator />
          </Flex>
        )}
      </View>
    )
  }
}
