/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 23:58:59
 */
import React from 'react'
import { ListView } from '@components'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../types'
import Bg from '../bg'
import ListHeader from '../list-header'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List(_props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <>
      {WEB && <Bg />}
      <ListView
        key={$.key}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        data={$.collections}
        numColumns={5}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={null}
        onHeaderRefresh={() => $.fetchUserCollections(true)}
        onFooterRefresh={() => $.fetchUserCollections(false)}
      />
    </>
  )
}

export default obc(List, COMPONENT)
