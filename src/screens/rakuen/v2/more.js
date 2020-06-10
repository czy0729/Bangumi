/*
 * @Author: czy0729
 * @Date: 2020-03-29 14:23:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-10 11:17:12
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Iconfont } from '@components'
import { Popover } from '@screens/_'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NEW_TOPIC } from '@constants/html'
import { _ } from '@stores'

const data = ['本地帖子', '设置', '新讨论']

function More({ style }, { navigation }) {
  return (
    <Popover
      style={[styles.icon, style]}
      data={data}
      onSelect={key => {
        t('超展开.右上角菜单', {
          key
        })

        switch (key) {
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
    </Popover>
  )
}

More.contextTypes = {
  navigation: PropTypes.object
}

export default observer(More)

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
