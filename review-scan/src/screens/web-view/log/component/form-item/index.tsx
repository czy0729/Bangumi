/*
 * @Author: czy0729
 * @Date: 2025-03-15 00:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-16 06:41:31
 */
import React, { useCallback } from 'react'
import { Input, Text } from '@components'
import { useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { memoStyles } from './styles'
import { Props } from './types'

function FormItem({ style, name }: Props) {
  const { $ } = useStore<Ctx>()

  const handleChangeText = useCallback(
    value => {
      $.onChange(name, value)
    },
    [$, name]
  )

  return useObserver(() => {
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
  })
}

export default FormItem
