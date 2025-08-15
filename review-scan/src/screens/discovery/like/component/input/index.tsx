/*
 * @Author: czy0729
 * @Date: 2024-11-13 07:49:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 07:51:13
 */
import React, { useCallback, useState } from 'react'
import { Flex, Input as InputComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { info } from '@utils'
import { useObserver } from '@utils/hooks'
import { Navigation } from '@types'

function Input({ navigation }: { navigation: Navigation }) {
  const [username, setUsername] = useState('')
  const handleChange = useCallback(
    text => {
      setUsername(text.trim())
    },
    [setUsername]
  )
  const handleNavigate = useCallback(() => {
    if (!username) {
      info('用户 ID 不能为空')
      return
    }

    navigation.replace('Like', {
      userId: username
    })
  }, [navigation, username])

  return useObserver(() => (
    <Flex style={[_.container.wind, _.mt.sm]}>
      <Flex.Item>
        <InputComp
          value={username}
          placeholder='可输入用户 ID 直达'
          onChangeText={handleChange}
          onSubmitEditing={handleNavigate}
        />
      </Flex.Item>
      <IconTouchable style={_.ml.md} name='md-arrow-forward' onPress={handleNavigate} />
    </Flex>
  ))
}

export default Input
