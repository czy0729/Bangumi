/*
 * @Author: czy0729
 * @Date: 2022-10-13 04:46:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-13 04:55:57
 */
import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Input, Iconfont, devLog } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { update } from '@utils/kv'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

function UpdateKey() {
  const [show, setShow] = useState(false)
  const [key, setKey] = useState('')
  const [val, setVal] = useState('')

  const onKeyChange = useCallback(
    evt => {
      const { nativeEvent } = evt
      const { text } = nativeEvent
      setKey(text)
    },
    [setKey]
  )

  const onValChange = useCallback(
    evt => {
      const { nativeEvent } = evt
      const { text } = nativeEvent
      setVal(text)
    },
    [setVal]
  )

  const onSubmit = useCallback(async () => {
    const result = await update(key, JSON.parse(val), false)
    devLog(result)
  }, [key, val])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <ItemSetting
          hd='Update Key'
          ft={
            <Touchable onPress={() => setShow(!show)}>
              <Text>使用</Text>
            </Touchable>
          }
          withoutFeedback
        />
        {show && (
          <View style={styles.container}>
            <Flex>
              <Flex.Item>
                <Input
                  style={styles.input}
                  value={key}
                  placeholder='key'
                  onChange={onKeyChange}
                />
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <Input
                  style={styles.input}
                  value={val}
                  placeholder='val'
                  onChange={onValChange}
                />
              </Flex.Item>
              <Touchable style={_.ml.lg} onPress={onSubmit}>
                <Iconfont name='md-check' />
              </Touchable>
            </Flex>
          </View>
        )}
      </>
    )
  })
}

export default UpdateKey
