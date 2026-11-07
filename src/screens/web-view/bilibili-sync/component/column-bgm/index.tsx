/*
 * @Author: czy0729
 * @Date: 2022-04-26 17:06:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * bangumi 侧状态与将写入的值
 */
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props } from './types'

function ColumnBgm({ select, text, next }: Props) {
  r(COMPONENT)

  return (
    <Text
      style={_.mt.md}
      type={!text ? _.select('sub', 'icon') : select ? _.select('sub', 'icon') : 'desc'}
      size={11}
      bold
    >
      {text || (select ? '(空)' : '')}
      {select && (
        <Text size={11} bold type='desc'>
          {' '}
          → {next}
        </Text>
      )}
    </Text>
  )
}

export default observer(ColumnBgm)
