/*
 * @Author: czy0729
 * @Date: 2022-07-23 13:59:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-12 05:10:19
 */
import React from 'react'
import { Highlight, Katakana, Text } from '@components'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Title({ name, nameCn, comments, highlight }) {
  const top = cnjp(nameCn, name)
  const bottom = cnjp(name, nameCn)

  const showBottom = !!bottom && bottom !== top
  const title = top || bottom
  const numberOfLines = showBottom ? 2 : 3

  const { length: lt } = top || bottom
  const size = lt >= 28 ? 12 : lt >= 20 ? 13 : lt >= 12 ? 14 : 15

  const { length: lb } = bottom
  const sizeBottom = lb >= 32 ? 9 : lb >= 24 ? 10 : lb >= 16 ? 11 : 12

  return (
    <>
      {!!title &&
        (highlight ? (
          <Highlight size={size} numberOfLines={numberOfLines} bold value={highlight}>
            {title}
          </Highlight>
        ) : (
          <Katakana.Provider size={size} numberOfLines={numberOfLines} bold>
            <Katakana size={size} bold>
              {title}
            </Katakana>
            {!!comments && (
              <Text type='main' lineHeight={size}>
                {' '}
                {comments}
              </Text>
            )}
          </Katakana.Provider>
        ))}
      {showBottom && (
        <Katakana.Provider
          itemStyle={styles.itemStyle}
          type='sub'
          size={sizeBottom}
          lineHeight={13}
          bold
          numberOfLines={1}
        >
          <Katakana type='sub' size={sizeBottom} lineHeight={13} bold numberOfLines={1}>
            {bottom}
          </Katakana>
        </Katakana.Provider>
      )}
    </>
  )
}

export default ob(Title)
