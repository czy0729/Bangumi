/*
 * @Author: czy0729
 * @Date: 2021-01-20 12:15:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 21:42:05
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { _, rakuenStore, uiStore } from '@stores'
import { info, confirm, getCommentPlainText, copy, stl } from '@utils'
import { obc } from '@utils/decorators'
import { SHARE_MODE } from '@constants'
import { Popover } from '../../../base'
import { styles } from './styles'

function IconExtra(
  {
    style,
    topicId,
    id,
    formhash,
    likeType,
    replySub,
    erase,
    userId,
    userName,
    message = '',
    msg,
    showFixedTextare
  },
  { $ }
) {
  if (SHARE_MODE) return null

  const data = []
  if (rakuenStore.setting.likes && likeType) data.push('贴贴')
  if (replySub && !$?.isLimit && $?.showFixedTextarea) data.push('回复')
  data.push('复制回复')
  if ($?.doTranslateFloor) data.push('翻译')
  data.push('屏蔽用户')
  if (erase && $?.doDeleteReply) data.push('删除')

  return (
    <Popover
      style={stl(styles.touch, style)}
      data={data}
      onSelect={title => {
        if (title === '翻译') {
          return $?.doTranslateFloor(id, msg)
        }

        if (title === '贴贴') {
          return uiStore.showLikesGrid(topicId, id, formhash, likeType, {
            recommandPosition: 'top'
          })
        }

        if (title === '回复') {
          $?.showFixedTextarea(userName, replySub, message, msg)
          return showFixedTextare()
        }

        if (title === '删除') {
          return confirm('确定删除回复?', () => $?.doDeleteReply(erase))
        }

        if (title === '屏蔽用户') {
          confirm('确定屏蔽用户?', () => {
            rakuenStore.addBlockUser(`${userName}@${userId}`)
            info(`已屏蔽 ${userName}`)
          })
          return
        }

        if (title === '复制回复') {
          copy(getCommentPlainText(msg), `已复制 ${userName} 的回复`)
        }
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont style={_.ml.md} name='md-more-vert' size={18} />
      </Flex>
    </Popover>
  )
}

export default obc(IconExtra)
