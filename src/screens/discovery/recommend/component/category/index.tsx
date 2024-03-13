/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 18:30:14
 */
import React from 'react'
import { Button } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

function Category(props, { $ }: Ctx) {
  return (
    <Popover style={styles.touch} data={DATA} onSelect={$.onSelect}>
      <Button style={styles.btn} styleText={styles.text} size='sm' type='ghostMain'>
        {$.state.cat || '默认'}
      </Button>
    </Popover>
  )
}

export default obc(Category, COMPONENT)
