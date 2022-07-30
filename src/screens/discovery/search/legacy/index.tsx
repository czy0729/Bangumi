/*
 * @Author: czy0729
 * @Date: 2019-12-28 13:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 13:45:42
 */
import React from 'react'
import { Button, Heatmap } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY, SEARCH_LEGACY } from '@constants'
import { SearchCatCn } from '@types'
import { memoStyles } from './styles'
import { Ctx } from '../types'

function Legacy(props, { $ }: Ctx) {
  const { cat, legacy } = $.state
  if (['人物', '用户'].includes(MODEL_SEARCH_CAT.getLabel<SearchCatCn>(cat))) {
    return null
  }

  const styles = memoStyles()
  return (
    <Popover
      style={styles.touch}
      data={SEARCH_LEGACY.map(item => item.label)}
      onSelect={$.onLegacySelect}
    >
      <Button style={styles.btn} styleText={styles.text} type='ghostPlain' size='sm'>
        {MODEL_SEARCH_LEGACY.getLabel<SearchCatCn>(legacy)}
      </Button>
      <Heatmap id='搜索.切换细分类型' />
    </Popover>
  )
}

export default obc(Legacy)
