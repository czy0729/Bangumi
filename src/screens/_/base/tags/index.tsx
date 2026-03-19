/*
 * @Author: czy0729
 * @Date: 2022-09-23 11:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:31:18
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, ScrollView } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Tag } from '../tag'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 标签组 */
export const Tags = observer(({ value = [], active = [], ...other }) => {
  r(COMPONENT)

  if (!value || !value.length) return null

  return (
    <Component id='base-tags'>
      <ScrollView style={styles.tags} {...other} horizontal>
        {value.map((item: string) => (
          <Tag
            key={item}
            style={_.mr.sm}
            value={item}
            type={active.includes(item) ? 'warning' : undefined}
          />
        ))}
      </ScrollView>
    </Component>
  )
})

export default Tags
