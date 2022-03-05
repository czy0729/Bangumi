/*
 * @Author: czy0729
 * @Date: 2022-03-01 10:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-05 18:11:52
 */
import React, { useState, useCallback } from 'react'
import { Touchable, Flex, Text, Input, Iconfont } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { info } from '@utils/ui'
import { read, put } from './db'

function UpdateAdvance({ navigation }) {
  const [show, setShow] = useState(false)
  const [uid, setUid] = useState('')
  const [val, setVal] = useState('')
  const onUidChange = useCallback(
    evt => {
      const { nativeEvent } = evt
      const { text } = nativeEvent
      setUid(text)
    },
    [setUid]
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
    const { content } = await read({
      path: 'advance.json'
    })
    const data = JSON.parse(content)
    data[uid] = val

    await put({
      path: 'advance.json',
      content: JSON.stringify(data)
    })
    info('update db success')
  }, [uid, val])
  const onView = useCallback(async () => {
    const { content } = await read({
      path: 'advance.json'
    })
    console.info(JSON.stringify(JSON.parse(content), null, 2))
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <ItemSetting
          hd='Update Advance'
          ft={
            <Touchable onPress={() => setShow(!show)}>
              <Text>使用</Text>
            </Touchable>
          }
          withoutFeedback
        />
        {show && (
          <Flex style={styles.container}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={uid}
                placeholder='uid'
                onChange={onUidChange}
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
            <Touchable style={_.ml.md} onPress={onView}>
              <Iconfont name='md-text-format' />
            </Touchable>
            <Touchable
              style={_.ml.md}
              onPress={() => {
                if (!uid) return
                navigation.push('Zone', {
                  userId: uid
                })
              }}
            >
              <Iconfont name='md-arrow-forward' />
            </Touchable>
            <Touchable style={_.ml.md} onPress={onSubmit}>
              <Iconfont name='md-check' />
            </Touchable>
          </Flex>
        )}
      </>
    )
  })
}

export default UpdateAdvance

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.xs,
    paddingHorizontal: _.wind,
    paddingBottom: _.md
  },
  input: {
    height: 40,
    paddingHorizontal: _.device(_.sm, _.md),
    ..._.device(_.fontSize12, _.fontSize15),
    backgroundColor: _.colorBg
  }
}))
