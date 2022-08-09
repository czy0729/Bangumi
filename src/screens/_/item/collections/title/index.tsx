/*
 * @Author: czy0729
 * @Date: 2022-08-08 16:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 10:43:10
 */
import React from 'react'
import { Katakana, Text, Highlight } from '@components'
import { cnjp, HTMLDecode, getPinYinFilterValue } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Title({ name, nameCn, filter, collection, isCollect }) {
  const hasName = !!name
  const left = HTMLDecode(cnjp(nameCn, name))
  const right = HTMLDecode(cnjp(name, nameCn))
  const label = collection || (isCollect ? '已收藏' : '')
  const indent = label ? (collection ? '　　 ' : '　　　') : ''

  let filterValue = ''
  if (filter) filterValue = getPinYinFilterValue(left, filter)
  if (filterValue) {
    return (
      <Text size={15} numberOfLines={2}>
        <Text size={15} bold>
          {indent}
        </Text>
        <Highlight size={15} bold value={filterValue}>
          {left}
        </Highlight>
        {hasName && right !== left && (
          <Text type='sub' size={11} lineHeight={15} bold>
            {'  '}
            {right}
          </Text>
        )}
      </Text>
    )
  }

  return (
    <Katakana.Provider itemStyle={styles.katakanas} size={15} numberOfLines={2}>
      <Katakana size={15} bold>
        {indent}
        {left}
      </Katakana>
      {hasName && right !== left && (
        <Katakana type='sub' size={11} lineHeight={15} bold>
          {'  '}
          {right}
        </Katakana>
      )}
    </Katakana.Provider>
  )
}

export default ob(Title)
