/*
 * @Author: czy0729
 * @Date: 2020-03-29 14:23:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 07:49:32
 */
import React from 'react'
import { Flex, Touchable, Iconfont, Heatmap } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NEW_TOPIC } from '@constants'
import { Ctx } from '../types'

const DATA = [
  '小组搜索',
  '超展开设置',
  '添加新讨论'
  // , '预读取帖子'
] as const

function IconMore({ style }, { navigation }: Ctx) {
  return (
    <Flex style={_.mr.xs}>
      <Touchable
        onPress={() => {
          navigation.push('RakuenHistory')
        }}
      >
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-star-outline' color={_.colorTitle} />
        </Flex>
      </Touchable>
      <Popover
        style={stl(styles.touch, style)}
        data={DATA}
        onSelect={key => {
          t('超展开.右上角菜单', {
            key
          })

          switch (key) {
            // case '预读取帖子':
            //   setTimeout(() => {
            //     $.prefetchConfirm()
            //   }, 80)
            //   break

            case '小组搜索':
              navigation.push('RakuenSearch')
              break

            case '超展开设置':
              navigation.push('RakuenSetting')
              break

            case '添加新讨论':
              navigation.push('WebBrowser', {
                url: HTML_NEW_TOPIC(),
                title: '添加新讨论',
                desc: '发帖组件复杂并没有重新开发实装。若你看见的不是发帖页面，请先在此页面进行登录。请务必刷新一下验证码再登录。成功后点击右上方刷新页面。',
                injectedViewport: true
              })
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
    </Flex>
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
