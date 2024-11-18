/*
 * @Author: czy0729
 * @Date: 2023-02-21 01:34:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:31:11
 */
import React from 'react'
import { Flex, Highlight } from '@components'
import { useStore } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { TEXT_SPACE } from '@constants'
import { Ctx } from '../../../types'

function Title({ name, nameCn }) {
  const { $ } = useStore<Ctx>()
  const { filter } = $.state
  const hasName = !!name
  const left = HTMLDecode(cnjp(nameCn, name))
  const right = HTMLDecode(cnjp(name, nameCn))

  const { length: lengthLeft } = left
  const { length: lengthRight } = right
  const sizeLeft = lengthLeft >= 20 ? 13 : lengthLeft >= 12 ? 14 : 15
  const sizeRight = lengthRight >= 24 ? 9 : lengthRight >= 16 ? 10 : 11
  return (
    <Flex wrap='wrap' align='end'>
      <Highlight size={sizeLeft} bold numberOfLines={1} value={filter}>
        {`${left}${TEXT_SPACE}`}
      </Highlight>
      {hasName && right !== left && (
        <Highlight
          type='sub'
          size={sizeRight}
          lineHeight={24 - sizeRight}
          bold
          numberOfLines={1}
          value={filter}
        >
          {right}
        </Highlight>
      )}
    </Flex>
  )
}

export default ob(Title)
