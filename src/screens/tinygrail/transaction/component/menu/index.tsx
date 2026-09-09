/*
 * @Author: czy0729
 * @Date: 2025-03-07 18:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:54:33
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, userStore, useStore } from '@stores'
import { confirm, lastDate } from '@utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Menu({ id }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const detail = $.detail(id)
  const { userInfo } = userStore
  const { id: userId } = userInfo

  const data = useMemo(() => {
    const temp: string[] = []
    const likes = $.likes(id)
    if (likes?.list?.find?.(item => item.userId === userId)) {
      temp.push('取消点赞')
    } else {
      temp.push('点赞')
    }

    if (detail?.userId === userId) {
      if (likes?.list?.length) temp.push('清空点赞')
      temp.push('删除')
    } else {
      temp.push('发红包')
    }

    return temp
  }, [$, detail?.userId, id, userId])

  const handleSelect = useCallback(
    (title: string) => {
      switch (title) {
        case '点赞':
        case '取消点赞':
          $.onToggleLike(id)
          break

        case '清空点赞':
          confirm('确定清空点赞？', $.onResetLikes, '小圣杯助手')
          break

        case '删除':
          confirm('确定删除？', $.onDelete, '小圣杯助手')
          break

        case '发红包':
          confirm('确定给TA发送10000cc？', () => $.onSend(detail?.userId), '小圣杯助手')
          break

        default:
          break
      }
    },
    [$, detail?.userId, id]
  )

  return (
    <Popover data={data} onSelect={handleSelect}>
      <Flex style={styles.touch}>
        <Text size={12} type='sub' align='right'>
          {lastDate(detail?.ts)}
        </Text>
        <Iconfont style={_.ml.xs} name='md-more-vert' size={18} />
      </Flex>
    </Popover>
  )
}

export default observer(Menu)
