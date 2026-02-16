/*
 * @Author: czy0729
 * @Date: 2025-03-07 18:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 21:34:36
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, userStore, useStore } from '@stores'
import { confirm, lastDate } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Menu({ id }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
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
    }, [detail?.userId, userId])

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
      [detail?.userId]
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
  })
}

export default Menu
