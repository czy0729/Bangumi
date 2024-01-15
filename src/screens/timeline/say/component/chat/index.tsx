/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 22:18:00
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Chat({ forwardRef }: any, { $ }: Ctx) {
  const styles = memoStyles()
  const { list } = $.say
  return (
    <PaginationList2
      key={list.length}
      forwardRef={forwardRef}
      style={_.container.screen}
      contentContainerStyle={styles.container}
      keyExtractor={keyExtractor}
      data={list}
      inverted
      renderItem={renderItem}
      ListFooterComponent={null}
    />
  )
}

export default obc(Chat, COMPONENT)
