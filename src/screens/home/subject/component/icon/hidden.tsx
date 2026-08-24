/*
 * @Author: czy0729
 * @Date: 2021-08-20 14:44:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:12:07
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { confirm, info } from '@utils'
import { COMPONENT_HIDDEN } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconHidden({ name, value }) {
  const { $ } = useStore<Ctx>(COMPONENT_HIDDEN)

  if (!name || !value) return null

  return (
    <IconTouchable
      style={styles.hidden}
      name='md-close'
      color={_.colorIcon}
      onPress={() => {
        confirm(`确定永久隐藏栏目[${name}]?\n隐藏后可到右上角菜单里重置`, () => {
          $.hiddenBlock(value)
          info('已隐藏')
        })
      }}
    >
      <Heatmap id='条目.展开收起功能块' />
    </IconTouchable>
  )
}

export default observer(IconHidden)
