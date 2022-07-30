/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 13:39:38
 */
import React from 'react'
import { Button, Heatmap } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { MODEL_SEARCH_CAT, SEARCH_CAT } from '@constants'
import { SearchCatCn } from '@types'
import { Ctx } from '../types'
import { styles } from './styles'

function Category(props, { $ }: Ctx) {
  const { cat } = $.state
  return (
    <Popover
      style={styles.touch}
      data={SEARCH_CAT.map(item => item.label)}
      onSelect={$.onSelect}
    >
      <Button style={styles.btn} styleText={styles.text} size='sm' type='ghostMain'>
        {MODEL_SEARCH_CAT.getLabel<SearchCatCn>(cat)}
      </Button>
      <Heatmap id='搜索.切换类型' />
    </Popover>
  )
}

export default obc(Category)
