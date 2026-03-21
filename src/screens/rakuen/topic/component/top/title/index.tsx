/*
 * @Author: czy0729
 * @Date: 2025-04-23 08:54:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 05:52:42
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { copy } from '@utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Title() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { _replies: replies } = $.params

  return (
    <>
      <Touchable
        onLongPress={() => {
          copy($.title, '已复制标题')
        }}
      >
        <Text type='title' size={20} bold>
          {$.title}
          {!!replies && (
            <Text type='main' size={12} lineHeight={26} bold>
              {`  ${replies.includes('+') ? '' : '+'}${replies.trim()}`}
            </Text>
          )}
        </Text>
      </Touchable>
      {!!$.subTitle && (
        <Touchable
          style={_.mv.md}
          onLongPress={() => {
            copy($.subTitle, '已复制副标题')
          }}
        >
          <Text type='sub' size={14} bold>
            {$.subTitle}
          </Text>
        </Touchable>
      )}
    </>
  )
}

export default observer(Title)
