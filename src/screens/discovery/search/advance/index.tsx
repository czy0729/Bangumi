/*
 * @Author: czy0729
 * @Date: 2022-07-30 16:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 18:06:33
 */
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Flex, Highlight, Touchable, Iconfont } from '@components'
import { asc, t2s } from '@utils'
import { useObserver } from '@utils/hooks'
import substrings from '@assets/json/substrings.json'
import { memoStyles } from './styles'

const history = {}
let cns: string[]

function Advance({ navigation, value, onSubmit }) {
  const [result, setResult] = useState([])

  useEffect(() => {
    const _value = t2s(value.toLocaleUpperCase()).trim()
    if (!_value) {
      setResult([])
      return
    }

    if (value && !cns) {
      cns = Object.keys(substrings).sort((a, b) => asc(a.length, b.length))
    }

    if (history[_value]) {
      setResult(history[_value])
      return
    }

    const _result = []
    cns.forEach(item => {
      if (_result.length >= 6) return
      if (item.toLocaleUpperCase().includes(_value)) _result.push(item)
    })
    setResult(_result)
    history[_value] = _result
  }, [value])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View>
        {result.map(item => (
          <View key={item} style={styles.item}>
            <Flex style={styles.content}>
              <Flex.Item>
                <Touchable onPress={() => onSubmit(item)}>
                  <Highlight size={15} bold value={value} numberOfLines={1}>
                    {item}
                  </Highlight>
                </Touchable>
              </Flex.Item>
              <Touchable style={styles.search} onPress={() => onSubmit(item)}>
                <Iconfont name='md-search' />
              </Touchable>
              <Touchable
                style={styles.open}
                onPress={() =>
                  navigation.push('Subject', {
                    subjectId: substrings[item]
                  })
                }
              >
                <Iconfont name='md-open-in-new' size={19} />
              </Touchable>
            </Flex>
          </View>
        ))}
      </View>
    )
  })
}

export default Advance
