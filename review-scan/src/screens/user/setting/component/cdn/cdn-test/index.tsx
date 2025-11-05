/*
 * @Author: czy0729
 * @Date: 2024-04-21 16:57:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-09 23:08:47
 */
import React, { useEffect, useState } from 'react'
import { Flex, Highlight, Text } from '@components'
import { Cover, ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { ping } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { CDN_OSS_MAGMA_POSTER } from '@constants'
import commonStyles from '../../../styles'
import { IMG_HEIGHT, IMG_WIDTH, TEXTS, URL_LAIN } from '../ds'
import { Pings } from '../types'
import { memoStyles } from './styles'

function CDNTest({ filter }) {
  const [test, setTest] = useState(false)
  const [pings, setPings] = useState<Pings>({})

  useEffect(() => {
    if (test && !Object.keys(pings).length) {
      const data: Pings = {}
      async function cb() {
        data.lain = await ping(URL_LAIN)
        data.magma = await ping(CDN_OSS_MAGMA_POSTER(URL_LAIN))
        setPings(data)
      }
      cb()
    }
  }, [pings, test])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS.test}>
        {test ? (
          <Flex style={styles.sub}>
            <Flex direction='column' justify='center'>
              <Cover size={IMG_WIDTH} height={IMG_HEIGHT} src={URL_LAIN} cdn={false} radius />
              <Highlight style={_.mt.sm} type='sub' size={10} align='center' value={filter}>
                不使用: {pings.lain || 0} ms
              </Highlight>
            </Flex>
            <Flex style={_.ml.md} direction='column' justify='center'>
              <Cover
                size={IMG_WIDTH}
                height={IMG_HEIGHT}
                src={CDN_OSS_MAGMA_POSTER(URL_LAIN)}
                radius
              />
              <Text style={_.mt.sm} type='sub' size={10} align='center'>
                Magma: {pings.magma || 0} ms
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Text style={commonStyles.test} size={12} type='sub' onPress={() => setTest(true)}>
            各资源域的图片质量和访问速度，
            <Text size={12} type='warning'>
              点击测试
            </Text>
          </Text>
        )}
      </ItemSettingBlock>
    )
  })
}

export default CDNTest
