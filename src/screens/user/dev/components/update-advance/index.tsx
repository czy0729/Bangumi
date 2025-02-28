/*
 * @Author: czy0729
 * @Date: 2022-03-01 10:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-28 16:02:28
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Input, SegmentedControl, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { info } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { get, update } from '@utils/kv'
import { Fn, Navigation } from '@types'
import { PAYTYPE_DS } from './ds'
import { memoStyles } from './styles'

function UpdateAdvance({ navigation, onScrollTo }: { navigation: Navigation; onScrollTo?: Fn }) {
  const [show, setShow] = useState(true)
  const [uid, setUid] = useState('')
  const [val, setVal] = useState('10')
  const [payType, setPayType] = useState('w')
  const [data, setData] = useState({})

  const fetchData = useCallback(async () => {
    const data = await get('advance')
    setData(data)
  }, [])

  const handleUidChange = useCallback(
    (text: string) => {
      setUid(text)
    },
    [setUid]
  )
  const handleValChange = useCallback(
    (text: string) => {
      setVal(text)
    },
    [setVal]
  )
  const handlePayTypeChange = useCallback((label: string) => {
    setPayType(label === PAYTYPE_DS[0] ? 'w' : 'a')
  }, [])
  const handleSubmit = useCallback(async () => {
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
                <Input
                  style={styles.input}
                  value={uid}
                  placeholder='uid'
                  onChangeText={handleUidChange}
                  onScrollIntoViewIfNeeded={onScrollTo}
                />
              </Flex.Item>
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={PAYTYPE_DS}
                selectedIndex={payType === 'w' ? 0 : 1}
                onValueChange={handlePayTypeChange}
              />
              <Flex.Item style={_.ml.md}>
                <Input
                  style={styles.input}
                  value={val}
                  keyboardType='decimal-pad'
                  placeholder='val'
                  onChangeText={handleValChange}
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
                <Touchable style={_.ml.lg} onPress={handleSubmit}>
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
