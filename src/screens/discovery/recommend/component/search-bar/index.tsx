/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:30:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:52:18
 */
import { observer } from 'mobx-react'
import { Flex, Input } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function SearchBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  return (
    <Flex style={styles.searchBar}>
      <Input
        style={styles.searchIpt}
        value={$.state.value}
        returnKeyType='search'
        returnKeyLabel='查询'
        placeholder='输入用户 ID'
        onChange={$.onChange}
        onSubmitEditing={$.doSearchV2}
      />
    </Flex>
  )
}

export default observer(SearchBar)
