/*
 * @Author: czy0729
 * @Date: 2023-02-21 01:34:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-21 20:52:36
 */
import React from 'react'
import { Flex, Katakana } from '@components'
import { cnjp, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'

function Title({ name, nameCn }) {
  const hasName = !!name
  const left = HTMLDecode(cnjp(nameCn, name))
  const right = HTMLDecode(cnjp(name, nameCn))

  const { length: lengthRight } = right
  const sizeRight = lengthRight >= 24 ? 9 : lengthRight >= 16 ? 10 : 11
  return (
    <Flex wrap='wrap' align='end'>
      <Katakana.Provider size={15} numberOfLines={1}>
        <Katakana size={15} bold>
          {left}{' '}
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
