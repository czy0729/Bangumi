/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 19:38:17
 */
import React from 'react'
import { Heatmap, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function BtnPopover(
  { index, groupCn, groupHref, href, topicId, userId, userName, isGroup },
  { $, navigation }
) {
  const isSubject = topicId.includes('subject/')

  // 类别进入点击
  let type
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
      <Iconfont
        style={styles.popover}
        name='extra'
        size={17}
        color={_.colorSub}
      />
      {index === 1 && (
        <>
          <Heatmap bottom={34} id='超展开.小组菜单点击' />
          <Heatmap id='超展开.人物菜单点击' transparent />
          <Heatmap bottom={-32} id='超展开.项额外点击' transparent />
        </>
      )}
    </Popover>
  )
}

export default obc(BtnPopover)

const styles = _.create({
  item: {
    paddingVertical: _.md
  },
  popover: {
    width: 44,
    height: 64,
    paddingTop: 16,
    paddingHorizontal: _._wind
  }
})
