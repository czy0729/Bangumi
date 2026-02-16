/*
 * @Author: czy0729
 * @Date: 2019-12-28 13:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:52:55
 */
import React from 'react'
import { Button, Heatmap } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY, SEARCH_LEGACY } from '@constants'
import { SearchCatCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT, EXCLUDE_DS } from './ds'
import { memoStyles } from './styles'

function Legacy() {
  const { $ } = useStore<Ctx>()
  if (EXCLUDE_DS.includes(MODEL_SEARCH_CAT.getLabel<SearchCatCn>($.state.cat))) return null

  const styles = memoStyles()
  return (
    <Popover
      style={styles.touch}
      data={SEARCH_LEGACY.map(item => item.label)}
      onSelect={$.onLegacySelect}
    >
      <Button style={styles.btn} styleText={styles.text} type='ghostPlain' size='sm'>
        {MODEL_SEARCH_LEGACY.getLabel<SearchCatCn>($.state.legacy)}
      </Button>
      <Heatmap id='搜索.切换细分类型' />
    </Popover>
  )
}

export default ob(Legacy, COMPONENT)
