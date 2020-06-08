/*
 * @Author: czy0729
 * @Date: 2020-03-29 14:23:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-06 16:26:43
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Iconfont } from '@components'
import { Popover } from '@screens/_'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import { HTML_NEW_TOPIC } from '@constants/html'
import { _ } from '@stores'

const data = ['本地帖子', '设置', '新讨论']

function More({ style, navigation }) {
  return (
    <View style={IOS && styles.ios}>
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

            // case '社区指导原则':
            //   navigation.push('UGCAgree')
            //   break

            default:
              break
          }
        }}
      >
        <Iconfont name='more' color={_.colorTitle} />
      </Popover>
    </View>
  )
}

export default observer(More)

const styles = StyleSheet.create({
  icon: {
    padding: _.sm,
    marginRight: IOS ? -_.sm : 0
  },
  ios: {
    marginBottom: _.tabsHeight
  }
})
