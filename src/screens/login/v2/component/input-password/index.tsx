/*
 * @Author: czy0729
 * @Date: 2025-03-22 19:42:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 密码输入框: 明暗文切换
 */
import { useState } from 'react'
import { observer } from 'mobx-react'
import { Flex, Input } from '@components'
import { IconTouchable } from '@_'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function InputPassword({
  forwardRef,
  style,
  value,
  onFocus,
  onBlur,
  onChange,
  onSubmitEditing
}: Props) {
  r(COMPONENT)

  const [visible, setVisible] = useState(false)

  return (
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
            setVisible(prev => !prev)
            feedback(true)
          }}
        />
      </Flex>
    </>
  )
}

export default observer(InputPassword)
