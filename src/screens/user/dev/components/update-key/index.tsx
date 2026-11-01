/*
 * @Author: czy0729
 * @Date: 2022-10-13 04:46:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * KV 数据维护工具
 */
import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { devLog, Flex, Iconfont, Input, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { info } from '@utils'
import { r } from '@utils/dev'
import { update } from '@utils/kv'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function UpdateKey() {
  r(COMPONENT)

  const [show, setShow] = useState(false)
  const [key, setKey] = useState('')
  const [val, setVal] = useState('')

  const handleSubmit = useCallback(async () => {
    // parse 与写库分开提示, 便于定位失败环节
    let data: object
    try {
      data = JSON.parse(val)
    } catch (error) {
      info('json parse fail')
      return
    }

    try {
      const result = await update(key, data, false)
      devLog(result)
    } catch (error) {
      info('update fail')
    }
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
                onChangeText={setKey}
              />
            </Flex.Item>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.input}
                value={val}
                placeholder='val'
                onChangeText={setVal}
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
