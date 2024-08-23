/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 12:58:32
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Chat({ forwardRef }: any, { $ }: Ctx) {
  const styles = memoStyles()
  const { list } = $.say
  return (
    <PaginationList2
      key={list.length}
      forwardRef={forwardRef}
      keyExtractor={keyExtractor}
      style={_.container.screen}
      contentContainerStyle={styles.container}
      data={list}
      inverted
      renderItem={renderItem}
      showFooter={false}
      ListFooterComponent={null}
    />
  )
}

export default obc(Chat, COMPONENT)
