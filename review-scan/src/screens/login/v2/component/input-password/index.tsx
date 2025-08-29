/*
 * @Author: czy0729
 * @Date: 2025-03-22 19:42:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-22 20:12:10
 */
import React, { useState } from 'react'
import { Flex, Input } from '@components'
import { IconTouchable } from '@_'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

function InputPassword({ forwardRef, style, value, onFocus, onBlur, onChange, onSubmitEditing }) {
  r(COMPONENT)

  const [visible, setVisible] = useState(false)

  return useObserver(() => (
    <>
      <Input
        ref={forwardRef}
        style={style}
        value={value}
        placeholder='密码'
        autoComplete='password'
        textContentType='password'
        secureTextEntry={!visible}
        returnKeyType='next'
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onSubmitEditing={onSubmitEditing}
      />
      <Flex style={styles.visible} justify='center'>
        <IconTouchable
          name={visible ? 'md-visibility' : 'md-visibility-off'}
          size={18}
          onPress={() => {
            setVisible(!visible)
            feedback(true)
          }}
        />
      </Flex>
    </>
  ))
}

export default InputPassword
