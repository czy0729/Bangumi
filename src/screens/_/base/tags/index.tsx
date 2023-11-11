/*
 * @Author: czy0729
 * @Date: 2022-09-23 11:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 01:14:14
 */
import React from 'react'
import { Component, ScrollView } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Tag } from '../tag'
import { styles } from './styles'

/** 标签组 */
export const Tags = ob(({ value = [], ...other }) => {
  if (!value || !value.length) return null

  return (
    <Component id='base-tags'>
      <ScrollView style={styles.tags} {...other} horizontal>
        {value.map((item: string) => (
          <Tag key={item} style={_.mr.sm} value={item} />
        ))}
      </ScrollView>
    </Component>
  )
})
