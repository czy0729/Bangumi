/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:24:27
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TEXT_IGNORE_USER } from '../../../ds'
import { Ctx } from '../../../types'
import { styles } from './styles'

function BtnPopover({ groupCn, groupHref, href, topicId, userId, userName, isGroup }) {
  const { $, navigation } = useStore<Ctx>()
  const isSubject = topicId.includes('subject/')

  // 类别进入点击
  let type: string
  if (isGroup) {
    type = '小组'
  } else if (isSubject || topicId.includes('ep/')) {
    type = '条目'
  } else {
    type = '人物'
  }

  // 只有小组和条目可以屏蔽用户
  const popoverData = [`进入${type}`, `屏蔽${type}`]
  if (isGroup || isSubject) popoverData.push(TEXT_IGNORE_USER)

  return (
    <Popover
      style={styles.touch}
      data={popoverData}
      onSelect={title => {
        $.onExtraSelect(
          title,
          {
            topicId,
            href,
            groupCn,
            groupHref,
            userId,
            userName
          },
          navigation
        )
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-more-vert' size={18} />
      </Flex>
      {/* <Heatmap bottom={34} id='超展开.小组菜单点击' />
      <Heatmap id='超展开.人物菜单点击' transparent />
      <Heatmap bottom={-32} id='超展开.项额外点击' transparent /> */}
    </Popover>
  )
}

export default ob(BtnPopover)
