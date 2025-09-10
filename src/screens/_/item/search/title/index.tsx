/*
 * @Author: czy0729
 * @Date: 2022-07-23 13:59:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-10 12:18:05
 */
import React from 'react'
import { Flex, Highlight, Katakana, Text } from '@components'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

function Title({ name, nameCn, comments, highlight }) {
  return useObserver(() => {
    const top = cnjp(nameCn, name)
    const bottom = cnjp(name, nameCn)

    const title = top || bottom
    const showBottom = !!bottom && bottom !== top
    const numberOfLines = showBottom ? 2 : 3

    const getSize = (len: number, steps: [number, number][]) =>
      steps.find(([limit]) => len >= limit)?.[1] ?? steps[steps.length - 1][1]
    const size = getSize((top || bottom).length, [
      [28, 12],
      [20, 13],
      [12, 14],
      [0, 15]
    ])
    const sizeBottom = getSize(bottom.length, [
      [32, 9],
      [24, 10],
      [16, 11],
      [0, 12]
    ])

    return (
      <>
        {title &&
          (highlight ? (
            <Flex>
              <Flex.Item>
                <Highlight size={size} numberOfLines={numberOfLines} bold value={highlight}>
                  {title}
                </Highlight>
              </Flex.Item>
              {comments && (
                <Text type='main' size={11} bold>
                  {' '}
                  {comments}
                </Text>
              )}
            </Flex>
          ) : (
            <Katakana.Provider size={size} numberOfLines={numberOfLines} bold>
              <Katakana size={size} bold>
                {title}
              </Katakana>
              {comments && (
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
  })
}

export default Title
