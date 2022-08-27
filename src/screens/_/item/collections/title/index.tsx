/*
 * @Author: czy0729
 * @Date: 2022-08-08 16:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 20:21:23
 */
import React from 'react'
import { Flex, Katakana, Highlight } from '@components'
import { cnjp, HTMLDecode, getPinYinFilterValue } from '@utils'
import { ob } from '@utils/decorators'

function Title({ name, nameCn, filter }) {
  const hasName = !!name
  const left = `${HTMLDecode(cnjp(nameCn, name))} `
  const right = HTMLDecode(cnjp(name, nameCn))

  let filterValue = ''
  if (filter) filterValue = getPinYinFilterValue(left, filter)
  if (filterValue) {
    return (
      <Flex wrap='wrap' align='end'>
        <Highlight size={15} bold numberOfLines={1} value={filterValue}>
          {left}
        </Highlight>
        {hasName && right !== left && (
          <Highlight
            type='sub'
            size={11}
            lineHeight={12}
            bold
            numberOfLines={1}
            value={filterValue}
          >
            {right}
          </Highlight>
        )}
      </Flex>
    )
  }

  return (
    <Flex wrap='wrap' align='end'>
      <Katakana.Provider size={15} numberOfLines={1}>
        <Katakana size={15} bold>
          {left}
        </Katakana>
      </Katakana.Provider>
      {hasName && right !== left && (
        <Katakana.Provider size={11} lineHeight={13} bold numberOfLines={1}>
          <Katakana type='sub' size={11} lineHeight={13} bold>
            {right}
          </Katakana>
        </Katakana.Provider>
      )}
    </Flex>
  )
}

export default ob(Title)
