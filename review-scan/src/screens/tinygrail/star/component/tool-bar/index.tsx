/*
 * @Author: czy0729
 * @Date: 2021-03-02 17:57:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 18:34:13
 */
import React from 'react'
import { Text } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import Btns from '@tinygrail/_/btns'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function ToolBar() {
  const { $ } = useStore<Ctx>()
  return (
    <Btns>
      <Btns.Touchable
        onSelect={() => {
          $.setPage(1, 24)
        }}
      >
        <Text
          type={$.state.page === 1 && $.state.limit === 24 ? 'main' : 'tinygrailPlain'}
          size={12}
          bold
        >
          24
        </Text>
      </Btns.Touchable>
      {([1, 2, 3, 4, 5] as const).map(item => (
        <Btns.Touchable
          key={String(item)}
          onSelect={() => {
            $.setPage(item, 100)
          }}
        >
          <Text
            type={$.state.page === item && $.state.limit === 100 ? 'main' : 'tinygrailPlain'}
            size={12}
            bold
          >
            {item * 100}
          </Text>
        </Btns.Touchable>
      ))}
    </Btns>
  )
}

export default ob(ToolBar, COMPONENT)
