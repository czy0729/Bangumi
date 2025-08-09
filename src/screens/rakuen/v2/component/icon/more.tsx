/*
 * @Author: czy0729
 * @Date: 2020-03-29 14:23:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-09 16:24:46
 */
import React, { useCallback } from 'react'
import { Flex, Heatmap, Iconfont, Link } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { HTML_NEW_TOPIC, WEB } from '@constants'
import { styles } from './styles'

const TEXT_SEARCH = '小组搜索'
const TEXT_SETTING = '超展开设置'
const TEXT_POST = '添加新讨论'

const DATA = []
if (!WEB) DATA.push(TEXT_SEARCH)
DATA.push(TEXT_SETTING, TEXT_POST)

function IconMore({ style }) {
  const navigation = useNavigation()

  const handleSelect = useCallback(
    (key: string) => {
      switch (key) {
        case TEXT_SEARCH:
          navigation.push('RakuenSearch')
          break

        case TEXT_SETTING:
          navigation.push('RakuenSetting')
          break

        case TEXT_POST:
          navigation.push('WebBrowser', {
            url: HTML_NEW_TOPIC(),
            title: '添加新讨论',
            desc: '发帖组件复杂并没有重新开发实装。若你看见的不是发帖页面，请先在此页面进行登录。请务必刷新一下验证码再登录。成功后点击右上方刷新页面。',
            injectedViewport: true,
            gestureEnabled: false
          })
          break

        default:
          break
      }

      t('超展开.右上角菜单', {
        key
      })
    },
    [navigation]
  )

  return useObserver(() => (
    <Flex style={_.mr.xs}>
      <Link style={_.mr._xxs} path='RakuenHistory'>
        <Flex style={styles.moreIcon} justify='center'>
          <Iconfont name='md-inbox' color={_.colorTitle} size={20} />
        </Flex>
      </Link>
      <Popover style={stl(styles.more, style)} data={DATA} onSelect={handleSelect}>
        <Flex style={styles.moreIcon} justify='center'>
          <Iconfont name='md-more-horiz' color={_.colorTitle} />
        </Flex>
        <Heatmap id='超展开.右上角菜单' />
        <Heatmap right={57} bottom={-32} id='超展开.取消预读取' />
        <Heatmap bottom={-32} id='超展开.预读取' />
      </Popover>
    </Flex>
  ))
}

export default IconMore
