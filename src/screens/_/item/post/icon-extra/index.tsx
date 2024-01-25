/*
 * @Author: czy0729
 * @Date: 2021-01-20 12:15:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-23 19:16:09
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { _, rakuenStore, uiStore } from '@stores'
import {
  confirm,
  copy,
  getCommentPlainText,
  info,
  isChineseParagraph,
  removeHTMLTag,
  removeURLs,
  stl
} from '@utils'
import { obc } from '@utils/decorators'
import { SHARE_MODE } from '@constants'
import { Popover } from '../../../base'
import {
  ACTION_BLOCK,
  ACTION_COPY,
  ACTION_DELETE,
  ACTION_EDIT,
  ACTION_LIKES,
  ACTION_REPLY,
  ACTION_TRANSLATE
} from './ds'
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
    onJumpTo,
    onShowFixedTextare
  },
  { $ }
) {
  if (SHARE_MODE) return null

  const data = [
    // 编辑
    erase && $?.doDeleteReply && ACTION_EDIT,

    // 贴贴
    rakuenStore.setting.likes && likeType && ACTION_LIKES,

    // 回复
    replySub && !$?.isLimit && $?.showFixedTextarea && ACTION_REPLY,

    // 复制
    ACTION_COPY,

    // 翻译
    $?.doTranslateFloor &&
      !isChineseParagraph(removeURLs(removeHTMLTag(msg)), 0.5) &&
      ACTION_TRANSLATE,

    // 屏蔽
    !erase && ACTION_BLOCK,

    // 删除
    erase && $?.doDeleteReply && ACTION_DELETE
  ].filter(Boolean)

  return (
    <Popover
      style={stl(styles.touch, style)}
      data={data}
      onSelect={title => {
        if (title === ACTION_LIKES) {
          uiStore.showLikesGrid(topicId, id, formhash, likeType, {
            recommandPosition: 'top'
          })
          return
        }

        if (title === ACTION_REPLY) {
          $?.showFixedTextarea(userName, replySub, message, msg)
          onShowFixedTextare()
          return
        }

        if (title === ACTION_EDIT) {
          $?.showFixedTextareaEdit(id, onShowFixedTextare, onJumpTo)
          return
        }

        if (title === ACTION_COPY) {
          copy(getCommentPlainText(msg), `已复制 ${userName} 的回复`)
          return
        }

        if (title === ACTION_TRANSLATE) {
          $?.doTranslateFloor(id, msg)
          return
        }

        if (title === ACTION_BLOCK) {
          confirm('确定屏蔽用户?', () => {
            rakuenStore.addBlockUser(`${userName}@${userId}`)
            info(`已屏蔽 ${userName}`)
          })
          return
        }

        if (title === ACTION_DELETE) {
          confirm('确定删除回复?', () => $?.doDeleteReply(erase))
          return
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
