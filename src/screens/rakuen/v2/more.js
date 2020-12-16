/*
 * @Author: czy0729
 * @Date: 2020-03-29 14:23:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-16 20:11:59
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Iconfont, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NEW_TOPIC } from '@constants/html'
import { _ } from '@stores'

const data = ['预读取帖子', '本地帖子', '设置', '新讨论']

function More({ style }, { $, navigation }) {
  return (
    <Popover
      style={[styles.icon, style]}
      data={data}
      onSelect={key => {
        t('超展开.右上角菜单', {
          key
        })

        switch (key) {
          case '预读取帖子':
            setTimeout(() => {
              $.prefetchConfirm()
            }, 80)
            break

          case '本地帖子':
            navigation.push('RakuenHistory')
            break

          case '设置':
            navigation.push('RakuenSetting')
            break

          case '新讨论':
            open(HTML_NEW_TOPIC())
            break

          default:
            break
        }
      }}
    >
      <Iconfont name='more' color={_.colorTitle} />
      <Heatmap id='超展开.右上角菜单' />
      <Heatmap right={57} bottom={-32} id='超展开.取消预读取' />
      <Heatmap bottom={-32} id='超展开.预读取' />
    </Popover>
  )
}

More.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(More)

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
