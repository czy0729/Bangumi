/*
 * @Author: czy0729
 * @Date: 2022-01-08 07:39:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 15:14:20
 */
import React from 'react'
import { Flex } from '@components'
import { ob } from '@utils/decorators'
import Type from '../../type'
import IconLayout from '../icon-layout'
import { COMPONENT } from './ds'

function Extra({ type, isList, loaded, onChange, onPress }) {
  return (
    <Flex>
      {!!loaded && <Type type={type} onChange={onChange} />}
      <IconLayout isList={isList} onPress={onPress} />
    </Flex>
  )
}

export default ob(Extra, COMPONENT)
