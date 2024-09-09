/*
 * @Author: czy0729
 * @Date: 2022-03-01 10:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 19:20:45
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Input, SegmentedControl, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { info } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { get, update } from '@utils/kv'
import { NavigationProps } from '@types'
import { memoStyles } from './styles'

function UpdateAdvance({ navigation }: NavigationProps) {
  const [show, setShow] = useState(true)
  const [uid, setUid] = useState('')
  const [val, setVal] = useState('')
  const [payType, setPayType] = useState('w')
  const [data, setData] = useState({})

  const fetchData = useCallback(async () => {
    const data = await get('advance')
    setData(data)
  }, [])

  const onUidChange = useCallback(
    evt => {
      setUid(evt.nativeEvent.text)
    },
    [setUid]
  )

  const onValChange = useCallback(
    evt => {
      setVal(evt.nativeEvent.text)
    },
    [setVal]
  )

  const onSubmit = useCallback(async () => {
    // 确保每次保存前都获取到最新的数据
    const data = await get('advance')
    data[uid] = `${payType}|${val}`

    await update('advance', data)
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
                <Input style={styles.input} value={uid} placeholder='uid' onChange={onUidChange} />
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
