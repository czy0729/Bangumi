/*
 * @Author: czy0729
 * @Date: 2025-06-25 22:06:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-16 10:00:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { Popover } from '@_'
import { useStatus } from './hooks'
import { memoStyles } from './styles'

import type { Props } from './types'
function Status({ style, id, showMenu }: Props) {
  const { biding, asksing, auctioning, data, handleSelect } = useStatus(id)
  if (!biding && !asksing && !auctioning) return null

  const styles = memoStyles()

  const elContent = (
    <>
      {biding && <View style={[styles.badge, styles.bid]} />}
      {asksing && <View style={[styles.badge, styles.asks]} />}
      {auctioning && <View style={[styles.badge, styles.auction]} />}
    </>
  )

  if (!showMenu) return <Flex style={style}>{elContent}</Flex>

  return (
    <View style={style}>
      <Popover data={data} onSelect={handleSelect}>
        <Flex style={styles.popover}>{elContent}</Flex>
      </Popover>
    </View>
  )
}

export default observer(Status)
