/*
 * @Author: czy0729
 * @Date: 2025-02-20 16:37:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 17:21:48
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, ScrollView, Text } from '@components'
import { _, useStore } from '@stores'
import { desc } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { get } from '@utils/kv'
import events from '@constants/events'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

const flipped = Object.fromEntries(Object.entries(events).map(([key, value]) => [value, key]))

function Detail({ id }) {
  const { $ } = useStore<Ctx>()
  const [value, setValue] = useState({})
  useMount(() => {
    async function update() {
      const data = await get(`${$.state.infosPrefixed}_${id}`)
      setValue(data.e)
    }
    update()
  })

  return useObserver(() => {
    if (!value) return null

    const styles = memoStyles()
    const tags = {}
    Object.entries(value).forEach(([key, value]) => {
      const [path] = key.split('.')
      tags[path] = tags[path] ? tags[path] + value : value
    })

    return (
      <ScrollView style={styles.detail} contentContainerStyle={styles.contentContainerStyle}>
        <Flex wrap='wrap'>
          {Object.entries(tags)
            .filter(([, value]) => (value as number) >= 10)
            .sort((a, b) => desc(a[1], b[1]))
            .map(([key, value]) => (
              <Text key={key} style={styles.tag} size={10}>
                {key} {value}
              </Text>
            ))}
        </Flex>
        <View style={_.mt.sm}>
          {Object.entries(value)
            .filter(([, value]) => (value as number) >= 10)
            .sort((a, b) => desc(a[1], b[1]))
            .map(([key, value]) => (
              <Flex key={key} style={styles.tag}>
                <Text style={styles.label} size={10}>
                  {flipped[key]}
                </Text>
                <Text size={10}>{value}</Text>
              </Flex>
            ))}
        </View>
      </ScrollView>
    )
  })
}

export default Detail
