/*
 * @Author: czy0729
 * @Date: 2022-12-08 10:47:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * bgm 列当前值与同步值
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
    <Text style={_.mt.md} type={!text ? 'sub' : select ? 'sub' : 'desc'} size={11} bold>
      {text || '__'}
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
