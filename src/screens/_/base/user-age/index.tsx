/*
 * @Author: czy0729
 * @Date: 2025-01-25 11:02:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 00:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Text } from '@components'
import { stl } from '@utils'
import { getAge } from '@utils/app/ages'
import { r } from '@utils/dev'
import { getUserAgeText } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as UserAgeProps } from './types'
export type { UserAgeProps }

/** 用户站龄 */
export const UserAge = observer(({ style, value, avatar }: UserAgeProps) => {
  r(COMPONENT)

  const age = getAge(value, avatar)
  if (age === null) return null

  const styles = memoStyles()
  const text = getUserAgeText(age)

  return (
    <Component id='base-user-age'>
      <Flex style={stl(styles.userAge, style)} wrap='nowrap'>
        <Text style={styles.text} size={9} noWrap>
          {text}
        </Text>
      </Flex>
    </Component>
  )
})

export default UserAge
