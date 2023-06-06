/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-03 12:28:59
 */
import React from 'react'
import { Button } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const DATA = [
  '默认',
  '动画',
  '书籍',
  '游戏',
  '音乐',
  '三次元'
  // 'v1'
] as const

function Category(props, { $ }: Ctx) {
  const { cat } = $.state
  return (
    <Popover style={styles.touch} data={DATA} onSelect={$.onSelect}>
      <Button style={styles.btn} styleText={styles.text} size='sm' type='ghostMain'>
        {cat || '默认'}
      </Button>
    </Popover>
  )
}

export default obc(Category)
