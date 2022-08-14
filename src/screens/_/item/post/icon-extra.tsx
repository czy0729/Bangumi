/*
 * @Author: czy0729
 * @Date: 2021-01-20 12:15:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-26 04:33:45
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { _, rakuenStore } from '@stores'
import { obc } from '@utils/decorators'
import { info, confirm } from '@utils/ui'
import { Popover } from '../../base'

function IconExtra(
  { id, replySub, erase, userId, userName, message = '', msg, showFixedTextare },
  { $ }
) {
  const data = []

  // @todo 状态分离optimize
  if (replySub && !$.isLimit && $.showFixedTextarea) data.push('回复')
  if (erase && $.doDeleteReply) data.push('删除')
  data.push('屏蔽用户')
  if ($.doTranslateFloor) data.push('翻译')

  return (
    <Popover
      style={styles.touch}
      data={data}
      onSelect={title => {
        if (title === '翻译') {
          return $.doTranslateFloor(id, msg)
        }

        if (title === '回复') {
          $.showFixedTextarea(userName, replySub, message)
          return showFixedTextare()
        }

        if (title === '删除') {
          return confirm('确定删除回复?', () => $.doDeleteReply(erase))
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
        <Iconfont style={_.ml.md} name='md-more-vert' size={16} />
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
