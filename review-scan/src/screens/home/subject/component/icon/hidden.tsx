/*
 * @Author: czy0729
 * @Date: 2021-08-20 14:44:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:53:01
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { confirm, info } from '@utils/ui'
import { Ctx } from '../../types'
import { styles } from './styles'

function IconHidden({ name, value }) {
  const { $ } = useStore<Ctx>()
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
      <Heatmap id='条目.删除收藏' />
    </IconTouchable>
  )
}

export default ob(IconHidden)
