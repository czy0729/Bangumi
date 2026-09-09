/*
 * @Author: czy0729
 * @Date: 2022-10-13 04:46:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:57:39
 */
import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { devLog, Flex, Iconfont, Input, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { update } from '@utils/kv'
import { memoStyles } from './styles'

function UpdateKey() {
  const [show, setShow] = useState(false)
  const [key, setKey] = useState('')
  const [val, setVal] = useState('')

  const handleKeyChange = useCallback(
    evt => {
      const { nativeEvent } = evt
      const { text } = nativeEvent
      setKey(text)
    },
    [setKey]
  )

  const handleValChange = useCallback(
    evt => {
      const { nativeEvent } = evt
      const { text } = nativeEvent
      setVal(text)
    },
    [setVal]
  )

  const handleSubmit = useCallback(async () => {
    const result = await update(key, JSON.parse(val), false)
    devLog(result)
  }, [key, val])

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
                onChange={handleKeyChange}
              />
            </Flex.Item>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.input}
                value={val}
                placeholder='val'
                onChange={handleValChange}
              />
            </Flex.Item>
            <Touchable style={_.ml.lg} onPress={handleSubmit}>
              <Iconfont name='md-check' />
            </Touchable>
          </Flex>
        </View>
      )}
    </>
  )
}

export default observer(UpdateKey)
