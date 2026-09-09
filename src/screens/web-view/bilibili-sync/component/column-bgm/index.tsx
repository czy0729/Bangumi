/*
 * @Author: czy0729
 * @Date: 2022-04-26 17:06:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 16:41:59
 */
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

function ColumnBgm({ select, text, next }) {
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
