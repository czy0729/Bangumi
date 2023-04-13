/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 21:57:24
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SHARE_MODE } from '@constants'
import { Ctx } from '../types'

function BtnPopover(
  { groupCn, groupHref, href, topicId, userId, userName, isGroup },
  { $, navigation }: Ctx
) {
  if (SHARE_MODE) return null

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
  const popoverData = [`进入${type}`]
  if (isGroup || isSubject) {
    popoverData.push(`屏蔽${type}`, '屏蔽用户')
  } else {
    popoverData.push(`屏蔽${type}`)
  }
  return (
    <Popover
      style={styles.touch}
      data={popoverData}
      onSelect={title =>
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
      }
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

export default obc(BtnPopover)

const styles = _.create({
  touch: {
    marginRight: 4,
    marginTop: 8,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
})
