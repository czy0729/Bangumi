/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 02:54:36
 */
import React, { useCallback } from 'react'
import { Input } from '@components'
import { useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { MODEL_SEARCH_CAT } from '@constants'
import { NO_LEGACY_DS } from '../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { SearchCatCn } from '@types'
import type { Ctx } from '../../types'

function SearchBar({ iptRef }) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleSubmitEditing = useCallback(() => {
    $.onSubmit(navigation)
  }, [$, navigation])

  return useObserver(() => {
    const styles = memoStyles()
    const label = MODEL_SEARCH_CAT.getLabel<SearchCatCn>($.state.cat)

    return (
      <Input
        ref={iptRef}
        style={stl(styles.searchIpt, NO_LEGACY_DS.includes(label) && styles.radius)}
        value={$.state._value}
        returnKeyType='search'
        returnKeyLabel='搜索'
        placeholder={$.isUser ? '输入完整的用户 ID' : '输入关键字'}
        autoFocus={$.params._autoFocus !== false}
        onChangeText={$.onChangeText}
        onFocus={$.onFocus}
        onBlur={$.onBlur}
        onSubmitEditing={handleSubmitEditing}
        accessibilityRole='search'
      />
    )
  })
}

export default SearchBar
