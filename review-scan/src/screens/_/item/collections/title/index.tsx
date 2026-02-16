/*
 * @Author: czy0729
 * @Date: 2022-08-08 16:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 08:26:30
 */
import React from 'react'
import { Flex, Katakana, Highlight } from '@components'
import { _ } from '@stores'
import { cnjp, HTMLDecode, getPinYinFilterValue } from '@utils'
import { ob } from '@utils/decorators'

function Title({ name, nameCn, filter, numberOfLines }) {
  const hasName = !!name
  const left = HTMLDecode(cnjp(nameCn, name))
  const right = HTMLDecode(cnjp(name, nameCn))

  let filterValue = ''
  if (filter) filterValue = getPinYinFilterValue(left, filter)
  if (filterValue) {
    return (
      <Flex wrap='wrap' align='end'>
        <Highlight size={15} bold numberOfLines={numberOfLines} value={filterValue}>
          {`${left} `}
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

  const { length: lt } = left
  const size = lt >= 32 ? 12 : lt >= 24 ? 13 : lt >= 12 ? 14 : 15

  const { length: lb } = right
  const sizeBottom = lb >= 32 ? 9 : lb >= 24 ? 10 : lb >= 16 ? 11 : 12
  return (
    <Flex style={lt + lb >= 16 && _.mb.xs} wrap='wrap' align='end'>
      <Katakana.Provider size={size} numberOfLines={numberOfLines}>
        <Katakana size={size} bold>
          {left}{' '}
        </Katakana>
      </Katakana.Provider>
      {hasName && right !== left && (
        <Katakana.Provider size={sizeBottom} lineHeight={13} bold numberOfLines={1}>
          <Katakana type='sub' size={sizeBottom} lineHeight={13} bold>
            {right}
          </Katakana>
        </Katakana.Provider>
      )}
    </Flex>
  )
}

export default ob(Title)
