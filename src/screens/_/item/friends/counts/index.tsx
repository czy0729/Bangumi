/*
 * @Author: czy0729
 * @Date: 2022-08-07 07:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 04:54:28
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'
import { Props } from './types'

function Counts({ wish, doing, collect, onHold, dropped }: Props) {
  return useObserver(() => {
    const items = [
      { value: wish, icon: 'md-favorite', size: 12 },
      { value: doing, icon: 'md-visibility', size: 14 },
      { value: collect, icon: 'md-check', size: 14 },
      { value: onHold, icon: 'md-visibility-off', size: 13 },
      { value: dropped, icon: 'md-delete-outline', size: 14 }
    ] as const

    return (
      <Flex style={styles.counts}>
        {items.map(
          ({ value, icon, size }, index) =>
            !!value && (
              <Flex key={icon}>
                <Iconfont style={_.mr.xs} name={icon} size={size} color={_.colorSub} />
                <Text style={index !== items.length - 1 ? _.mr.sm : undefined} size={11} type='sub'>
                  {value}
                </Text>
              </Flex>
            )
        )}
      </Flex>
    )
  })
}

export default Counts
