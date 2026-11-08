/*
 * @Author: czy0729
 * @Date: 2025-02-20 16:37:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 *
 * 客户端错误详情: 事件统计与原始数据
 */
import { useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Highlight, ScrollView, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { desc } from '@utils'
import { useMount } from '@utils/hooks'
import { get } from '@utils/kv'
import { WEB } from '@constants'
import { COMPONENT, FLIPPED } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Detail({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [value, setValue] = useState<Record<string, number>>({})
  const [source, setSource] = useState(false)
  const [filter, setFilter] = useState(true)
  const [highlight, setHighlight] = useState('')

  useMount(() => {
    async function update() {
      const data = await get<{ e?: Record<string, number> }>(`${$.state.infosPrefixed}_${id}`)
      setValue(data?.e || {})
    }
    update()
  })

  const styles = memoStyles()
  const tags: Record<string, number> = {}
  let sum = 0
  Object.entries(value).forEach(([key, count]) => {
    const [path] = key.split('.')
    tags[path] = tags[path] ? tags[path] + count : count
    sum += count
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
            {Object.entries(tags)
              .filter(([, count]) => (filter ? count >= 10 : true))
              .sort((a, b) => desc(a[1], b[1]))
              .map(([key, count]) => {
                const label = FLIPPED[key] || key
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
                    {label}（{count}）
                  </Text>
                )
              })}
          </Flex>
          <View style={_.mt.sm}>
            {Object.entries(value)
              .filter(([, count]) => (filter ? count >= 10 : true))
              .sort((a, b) => desc(a[1], b[1]))
              .map(([key, count]) => (
                <Flex key={key} style={styles.tag}>
                  <Highlight style={styles.label} size={10} value={highlight}>
                    {`${(FLIPPED[key] || key).replace('.', '（')}）`}
                  </Highlight>
                  <Text size={10}>{count}</Text>
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
}

export default observer(Detail)
