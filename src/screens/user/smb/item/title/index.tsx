/*
 * @Author: czy0729
 * @Date: 2023-02-21 01:34:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 12:13:04
 */
import React from 'react'
import { Flex, Katakana } from '@components'
import { cnjp, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { TEXT_SPACE } from '@constants'

function Title({ name, nameCn }) {
  const hasName = !!name
  const left = HTMLDecode(cnjp(nameCn, name))
  const right = HTMLDecode(cnjp(name, nameCn))

  const { length: lengthLeft } = left
  const { length: lengthRight } = right
  const sizeLeft = lengthLeft >= 20 ? 13 : lengthLeft >= 12 ? 14 : 15
  const sizeRight = lengthRight >= 24 ? 9 : lengthRight >= 16 ? 10 : 11
  return (
    <Flex wrap='wrap' align='end'>
      <Katakana.Provider size={sizeLeft} numberOfLines={1}>
        <Katakana size={sizeLeft} bold>
          {left}
          {TEXT_SPACE}
        </Katakana>
      </Katakana.Provider>
      {hasName && right !== left && (
        <Katakana.Provider
          size={sizeRight}
          lineHeight={sizeRight + 2}
          bold
          numberOfLines={1}
        >
          <Katakana type='sub' size={sizeRight} lineHeight={24 - sizeRight} bold>
            {right}
          </Katakana>
        </Katakana.Provider>
      )}
    </Flex>
  )
}

export default ob(Title)
