/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:51:44
 */
import React from 'react'
import { Button } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

function Category() {
  const { $ } = useStore<Ctx>()
  return (
    <Popover style={styles.touch} data={DATA} onSelect={$.onSelect}>
      <Button style={styles.btn} styleText={styles.text} size='sm' type='ghostMain'>
        {$.state.cat || '默认'}
      </Button>
    </Popover>
  )
}

export default ob(Category, COMPONENT)
