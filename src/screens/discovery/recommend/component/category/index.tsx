/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:51:44
 */
import { observer } from 'mobx-react'
import { Button } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Category() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <Popover style={styles.touch} data={DATA} onSelect={$.onSelect}>
      <Button style={styles.btn} styleText={styles.text} size='sm' type='ghostMain'>
        {$.state.cat || '默认'}
      </Button>
    </Popover>
  )
}

export default observer(Category)
