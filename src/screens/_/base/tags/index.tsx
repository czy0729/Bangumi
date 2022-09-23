/*
 * @Author: czy0729
 * @Date: 2022-09-23 11:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-23 11:32:28
 */
import React from 'react'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Tag } from '../tag'
import { styles } from './styles'

export const Tags = ob(({ value = [], ...other }) => {
  if (!value || !value.length) return null

  return (
    <ScrollView style={styles.tags} {...other} horizontal>
      {value.map((item: string) => (
        <Tag key={item} style={_.mr.sm} value={item} />
      ))}
    </ScrollView>
  )
})
