/*
 * @Author: czy0729
 * @Date: 2021-01-20 12:15:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-15 15:37:41
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _, rakuenStore } from '@stores'
import { obc } from '@utils/decorators'
import { info, confirm } from '@utils/ui'

function IconExtra(
  { replySub, erase, userId, userName, message, showFixedTextare },
  { $ }
) {
  const data = []
  if (replySub && !$.isLimit) data.push('回复')
  if (erase) data.push('删除')
  data.push('屏蔽用户')
  return (
    <Popover
      style={styles.touch}
      data={data}
      onSelect={title => {
        if (title === '回复') {
          $.showFixedTextarea(userName, replySub, message)
          showFixedTextare()
          return
        }

        if (title === '删除') {
          confirm('确定删除回复?', () => $.doDeleteReply(erase))
          return
        }

        if (title === '屏蔽用户') {
          confirm('确定屏蔽用户?', () => {
            rakuenStore.addBlockUser(`${userName}@${userId}`)
            info(`已屏蔽 ${userName}`)
          })
        }
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-more-vert' size={16} />
      </Flex>
    </Popover>
  )
}

export default obc(IconExtra)

const styles = _.create({
  touch: {
    marginVertical: -8,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
})
