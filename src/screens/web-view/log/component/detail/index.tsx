/*
 * @Author: czy0729
 * @Date: 2025-02-20 16:37:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-14 07:52:07
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Highlight, ScrollView, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { desc } from '@utils'
import { r } from '@utils/dev'
import { useMount, useObserver } from '@utils/hooks'
import { get } from '@utils/kv'
import { WEB } from '@constants'
import events from '@constants/events'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const flipped = Object.fromEntries(Object.entries(events).map(([key, value]) => [value, key]))

function Detail({ id }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const [value, setValue] = useState({})
  const [source, setSource] = useState(false)
  const [filter, setFilter] = useState(true)
  const [highlight, setHighlight] = useState('')

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
    let sum = 0
    Object.entries<number>(value).forEach(([key, value]) => {
      const [path] = key.split('.')
      tags[path] = tags[path] ? tags[path] + value : value
      sum += value
    })

    const elContent = (
      <>
        {source ? (
          <Text size={12}>{JSON.stringify(value, null, 2)}</Text>
        ) : (
          <>
            <Flex wrap='wrap'>
              <Text style={styles.tag} size={10}>
                总（{sum}）
              </Text>
              {Object.entries<number>(tags)
                .filter(([, value]) => (filter ? value >= 10 : true))
                .sort((a, b) => desc(a[1], b[1]))
                .map(([key, value]) => {
                  const label = flipped[key] || key
                  return (
                    <Text
                      key={key}
                      style={styles.tag}
                      type={highlight === label ? 'warning' : undefined}
                      size={10}
                      onPress={() => {
                        setHighlight(label)
                      }}
                    >
                      {label}（{value}）
                    </Text>
                  )
                })}
            </Flex>
            <View style={_.mt.sm}>
              {Object.entries<number>(value)
                .filter(([, value]) => (filter ? value >= 10 : true))
                .sort((a, b) => desc(a[1], b[1]))
                .map(([key, value]) => (
                  <Flex key={key} style={styles.tag}>
                    <Highlight style={styles.label} size={10} value={highlight}>
                      {`${flipped[key].replace('.', '（')}）`}
                    </Highlight>
                    <Text size={10}>{value}</Text>
                  </Flex>
                ))}
            </View>
          </>
        )}
      </>
    )

    return (
      <View style={_.mt.sm}>
        {WEB ? (
          <ScrollView style={styles.detail} contentContainerStyle={styles.contentContainerStyle}>
            {elContent}
          </ScrollView>
        ) : (
          <View style={styles.contentContainerStyle}>{elContent}</View>
        )}
        <Flex style={styles.layer} direction='column'>
          <IconTouchable
            name='md-filter-list'
            size={17}
            color={!filter ? _.colorMain : undefined}
            onPress={() => {
              setFilter(!filter)
            }}
          />
          <IconTouchable
            style={_.mt.xs}
            name='icon-layer'
            size={14}
            color={source ? _.colorMain : undefined}
            onPress={() => {
              setSource(!source)
            }}
          />
          <IconTouchable
            name='md-keyboard-arrow-up'
            size={26}
            onPress={() => {
              $.onToggleDetail('')
            }}
          />
        </Flex>
      </View>
    )
  })
}

export default Detail
