/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { observer } from 'mobx-react'
import { Input } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function SearchBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  return (
    <Input
      style={styles.searchIpt}
      value={$.state.value}
      returnKeyType='search'
      returnKeyLabel='搜索'
      placeholder='多关键字用空格隔开'
      autoFocus
      onChange={$.onChange}
      onSubmitEditing={() => $.doSearch()}
    />
  )
}

export default observer(SearchBar)
