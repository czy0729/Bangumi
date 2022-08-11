/*
 * @Author: czy0729
 * @Date: 2022-03-01 10:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 06:37:53
 */
import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Input, Iconfont, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { useObserver, useMount } from '@utils/hooks'
import { info } from '@utils/ui'
import { NavigationProps } from '@types'
import { read, put } from './db'

function UpdateAdvance({ navigation }: NavigationProps) {
  const [show, setShow] = useState(false)
  const [uid, setUid] = useState('')
  const [val, setVal] = useState('')
  const [payType, setPayType] = useState('w')
  const [data, setData] = useState({})

  const fetchData = useCallback(async () => {
    const { content } = await read({
      path: 'advance.json'
    })
    setData(JSON.parse(content))
  }, [])

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
    // 确保每次保存前都获取到最新的数据
    const { content } = await read({
      path: 'advance.json'
    })
    const data = JSON.parse(content)
    data[uid] = `${payType}|${val}`

    await put({
      path: 'advance.json',
      content: JSON.stringify(data, null, 2)
    })
    info('update db success')

    fetchData()
  }, [fetchData, payType, uid, val])

  useMount(() => {
    fetchData()
  })

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
          <View style={styles.container}>
            <Flex>
              <Flex.Item>
                <Input
                  style={styles.input}
                  value={uid}
                  placeholder='uid'
                  onChange={onUidChange}
                />
              </Flex.Item>
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={['微信', '支付宝']}
                selectedIndex={0}
                onValueChange={label => {
                  setPayType(label === '微信' ? 'w' : 'a')
                }}
              />
              <Flex.Item style={_.ml.md}>
                <Input
                  style={styles.input}
                  value={val}
                  keyboardType='decimal-pad'
                  placeholder='val'
                  onChange={onValChange}
                />
              </Flex.Item>
            </Flex>
            <Flex style={_.mt.md}>
              <Flex.Item>
                <Text bold>{data[uid] || '-'}</Text>
              </Flex.Item>
              <Flex style={_.ml.lg}>
                <Touchable
                  onPress={() => {
                    if (!uid) return
                    navigation.push('Zone', {
                      userId: uid
                    })
                  }}
                >
                  <Iconfont name='md-arrow-forward' />
                </Touchable>
                <Touchable style={_.ml.lg} onPress={onSubmit}>
                  <Iconfont name='md-check' />
                </Touchable>
              </Flex>
            </Flex>
          </View>
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
    paddingVertical: 0,
    paddingHorizontal: _.device(_.sm, _.md),
    ..._.device(_.fontSize12, _.fontSize15),
    backgroundColor: _.colorBg
  },
  segmentedControl: {
    height: 40,
    width: 120,
    marginLeft: _.md
  }
}))
