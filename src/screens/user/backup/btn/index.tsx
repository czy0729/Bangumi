/*
 * @Author: czy0729
 * @Date: 2022-12-18 16:41:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-12-18 16:41:15
 */
import React from 'react'
import { Touchable, Flex, Text, Loading } from '@components'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Btn({
  style = undefined,
  btnStyle = undefined,
  text = '同步',
  type = undefined,
  size = 11,
  disabled = undefined,
  loading = undefined,
  onPress = undefined
}) {
  const styles = memoStyles()
  const isSuccess = type === 'success' && !disabled
  return (
    <Touchable
      style={[styles.touch, style]}
      onPress={disabled || loading ? undefined : onPress}
    >
      <Flex
        style={[styles.btn, isSuccess && styles.btnSuccess, btnStyle]}
        justify='center'
      >
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

export default ob(Btn)
