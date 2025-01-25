/*
 * @Author: czy0729
 * @Date: 2025-01-25 11:02:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 14:38:38
 */
import React from 'react'
import { Component, Flex, Text } from '@components'
import { stl } from '@utils'
import { getAge } from '@utils/app/ages'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as UserAgeProps } from './types'

export { UserAgeProps }

/** 用户站龄 */
export const UserAge = ({ style, value, avatar }: UserAgeProps) => {
  const age = getAge(value, avatar)
  if (!age || age == 0) return null

  const styles = memoStyles()
  return (
    <Component id='base-user-age'>
      <Flex style={stl(styles.userAge, style)} wrap='nowrap'>
        <Text style={styles.text} size={9} noWrap>
          {age}年
        </Text>
      </Flex>
    </Component>
  )
}

export default ob(UserAge, COMPONENT)
