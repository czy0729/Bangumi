/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:26:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 16:05:16
 */
import React from 'react'
import { Flex, Loading, Text, Touchable } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Btn({
  style,
  btnStyle,
  text = '同步',
  type,
  size = 11,
  disabled,
  loading,
  onPress
}: Props) {
  const styles = memoStyles()
  const isSuccess = type === 'success' && !disabled
  return (
    <Touchable style={stl(styles.touch, style)} onPress={disabled || loading ? undefined : onPress}>
      <Flex style={stl(styles.btn, isSuccess && styles.btnSuccess, btnStyle)} justify='center'>
        {loading ? (
          <Loading.Mini />
        ) : (
          <Text bold size={size} type={isSuccess ? '__plain__' : undefined}>
            {text}
          </Text>
        )}
      </Flex>
    </Touchable>
  )
}

export default ob(Btn, COMPONENT)
