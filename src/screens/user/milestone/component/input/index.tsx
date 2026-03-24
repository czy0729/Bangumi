/*
 * @Author: czy0729
 * @Date: 2024-10-15 04:24:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 20:53:56
 */
import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { Flex, Input as InputComp } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { info } from '@utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Input() {
  const { navigation } = useStore<Ctx>(COMPONENT)
  const [username, setUsername] = useState('')

  const handleChange = useCallback(
    (text: string) => {
      setUsername(text.trim())
    },
    [setUsername]
  )
  const handleNavigate = useCallback(() => {
    if (!username) {
      info('用户 ID 不能为空')
      return
    }

    navigation.replace('Milestone', {
      userId: username
    })
  }, [navigation, username])

  return (
    <Flex style={[_.container.wind, _.mt.sm]}>
      <Flex.Item>
        <InputComp
          style={{
            height: 40,
            paddingVertical: 0
          }}
          value={username}
          placeholder='可输入用户 ID 直达'
          onChangeText={handleChange}
          onSubmitEditing={handleNavigate}
        />
      </Flex.Item>
      <IconTouchable style={_.ml.md} name='md-arrow-forward' onPress={handleNavigate} />
    </Flex>
  )
}

export default observer(Input)
