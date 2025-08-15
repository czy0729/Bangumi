/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:52:27
 */
import React from 'react'
import { Button, Heatmap } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SEARCH_CAT, SEARCH_CAT } from '@constants'
import { SearchCatCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Category() {
  const { $ } = useStore<Ctx>()
  return (
    <Popover style={styles.touch} data={SEARCH_CAT.map(item => item.label)} onSelect={$.onSelect}>
      <Button style={styles.btn} styleText={styles.text} size='sm' type='ghostMain'>
        {MODEL_SEARCH_CAT.getLabel<SearchCatCn>($.state.cat)}
      </Button>
      <Heatmap id='搜索.切换类型' />
    </Popover>
  )
}

export default ob(Category, COMPONENT)
