/*
 * @Author: czy0729
 * @Date: 2020-03-29 14:23:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 23:35:10
 */
import React from 'react'
import { Flex, Iconfont, Heatmap } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NEW_TOPIC } from '@constants/html'

const data = ['收藏', '设置', '新讨论', '预读取帖子']

function IconMore({ style }, { $, navigation }) {
  return (
    <Popover
      style={[styles.touch, style]}
      data={data}
      onSelect={key => {
        t('超展开.右上角菜单', {
          key
        })

        switch (key) {
          case '收藏':
            navigation.push('RakuenHistory')
            break

          case '预读取帖子':
            setTimeout(() => {
              $.prefetchConfirm()
            }, 80)
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
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-more-horiz' color={_.colorTitle} />
      </Flex>
      <Heatmap id='超展开.右上角菜单' />
      <Heatmap right={57} bottom={-32} id='超展开.取消预读取' />
      <Heatmap bottom={-32} id='超展开.预读取' />
    </Popover>
  )
}

export default obc(IconMore)

const styles = _.create({
  touch: {
    marginRight: _.xs,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
})
