/*
 * @Author: czy0729
 * @Date: 2025-01-25 11:02:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-28 17:18:43
 */
import React from 'react'
import { Component, Flex, Text } from '@components'
import { stl } from '@utils'
import { getAge } from '@utils/app/ages'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as UserAgeProps } from './types'

export { UserAgeProps }

/** 用户站龄 */
export const UserAge = ({ style, value, avatar }: UserAgeProps) => {
  r(COMPONENT)

  const age = getAge(value, avatar)
  return useObserver(() => {
    const styles = memoStyles()
    const text = !age || age == 0 ? '最近' : `${age}年`
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
}

export default UserAge
