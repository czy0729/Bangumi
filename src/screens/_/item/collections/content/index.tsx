/*
 * @Author: czy0729
 * @Date: 2025-01-24 06:12:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:19:30
 *
 * 内容容器: 目录条目在无评论且不可编辑时撑满剩余高度
 */
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { styles } from './styles'

import type { Props } from './types'

function Content({ comments, isCatalog, isEditable, children }: Props) {
  let justify: 'between'
  if (!isCatalog || (!comments && !isEditable)) justify = 'between'

  return (
    <Flex style={!!justify && styles.content} direction='column' justify={justify} align='start'>
      {children}
    </Flex>
  )
}

export default observer(Content)
