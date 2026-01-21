/*
 * @Author: czy0729
 * @Date: 2025-04-23 08:54:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:30:50
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { copy } from '@utils'
import { r } from '@utils/dev'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Title() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default Title
