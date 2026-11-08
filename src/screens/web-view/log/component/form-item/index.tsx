/*
 * @Author: czy0729
 * @Date: 2025-03-15 00:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Input, Text } from '@components'
import { useStore } from '@stores'
import { stl } from '@utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function FormItem({ style, name }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleChangeText = useCallback(
    (value: string) => {
      $.onChange(name, value)
    },
    [$, name]
  )

  const styles = memoStyles()

  return (
    <>
      <Text style={stl(styles.label, style)} type='sub' size={12} numberOfLines={1}>
        {name}
      </Text>
      <Input
        style={styles.input}
        defaultValue={String($.state[name])}
        placeholder={name}
        onChangeText={handleChangeText}
      />
    </>
  )
}

export default observer(FormItem)
