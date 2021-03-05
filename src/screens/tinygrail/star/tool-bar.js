/*
 * @Author: czy0729
 * @Date: 2021-03-02 17:57:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-05 15:50:48
 */
import React from 'react'
import { Text } from '@components'
import { obc } from '@utils/decorators'
import Btns from '@tinygrail/_/btns'

function ToolBar(props, { $ }) {
  const { page, limit } = $.state
  return (
    <Btns>
      <Btns.Touchable onSelect={() => $.setPage(1, 100)}>
        <Text
          type={page === 1 && limit === 100 ? 'main' : 'tinygrailText'}
          size={12}
          bold
        >
          100
        </Text>
      </Btns.Touchable>
      <Btns.Touchable onSelect={() => $.setPage(2, 100)}>
        <Text
          type={page === 2 && limit === 100 ? 'main' : 'tinygrailText'}
          size={12}
          bold
        >
          200
        </Text>
      </Btns.Touchable>
      <Btns.Touchable onSelect={() => $.setPage(3, 100)}>
        <Text
          type={page === 3 && limit === 100 ? 'main' : 'tinygrailText'}
          size={12}
          bold
        >
          300
        </Text>
      </Btns.Touchable>
      <Btns.Touchable onSelect={() => $.setPage(4, 100)}>
        <Text
          type={page === 4 && limit === 100 ? 'main' : 'tinygrailText'}
          size={12}
          bold
        >
          400
        </Text>
      </Btns.Touchable>
      <Btns.Touchable onSelect={() => $.setPage(5, 100)}>
        <Text
          type={page === 5 && limit === 100 ? 'main' : 'tinygrailText'}
          size={12}
          bold
        >
          500
        </Text>
      </Btns.Touchable>
    </Btns>
  )
}

export default obc(ToolBar)
