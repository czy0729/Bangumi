/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目操作菜单
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { TEXT_MENU_IGNORE } from '@constants'
import { TEXT_PREFIX_BLOCK, TEXT_PREFIX_ENTER } from '../../../ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BtnPopover({ groupCn, groupHref, href, topicId, userId, userName, isGroup }: Props) {
  const { $, navigation } = useStore<Ctx>()

  const isSubject = topicId.includes('subject/')
  const type = isGroup ? '小组' : isSubject || topicId.includes('ep/') ? '条目' : '人物'

  const data = [`${TEXT_PREFIX_ENTER}${type}`, `${TEXT_PREFIX_BLOCK}${type}`]
  if (isGroup || isSubject) data.push(TEXT_MENU_IGNORE)

  const handleSelect = useCallback(
    (title: string) => {
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
    },
    [$, navigation, topicId, href, groupCn, groupHref, userId, userName]
  )

  return (
    <Popover style={styles.touch} data={data} onSelect={handleSelect}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-more-vert' size={18} />
      </Flex>
    </Popover>
  )
}

export default observer(BtnPopover)
