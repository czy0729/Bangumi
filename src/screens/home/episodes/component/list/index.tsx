/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 10:03:37
 */
import { View } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Image, ScrollView, Squircle, Text, Touchable } from '@components'
import { InView } from '@_'
import { _, useStore } from '@stores'
import { cnjp, HTMLDecode, showImageViewer, stl } from '@utils'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { COMPONENT, IMAGE_HEIGHT, IMAGE_WIDTH } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const eps = $.list
  const epsThumbs = toJS($.params.epsThumbs || [])
  const { epsThumbsHeader = {} } = $.params

  return (
    <ScrollView contentContainerStyle={_.container.bottom} onScroll={$.onScroll}>
      {eps.map((item, index) => (
        <Touchable
          key={item.id}
          onPress={() => {
            navigation.push('Topic', {
              topicId: `ep/${item.id}`,
              _title: `ep${item.sort}.${item.name}`,
              _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${item.desc}`
            })

            t('章节.跳转', {
              to: 'Topic',
              topicId: `ep/${item.id}`
            })
          }}
        >
          <Flex style={styles.item}>
            <Flex.Item>
              <Flex align='start'>
                <View
                  style={stl(
                    styles.status,
                    item.status === 'Air' && styles.statusPrimary,
                    item.status === 'Today' && styles.statusSuccess
                  )}
                />
                <Flex.Item>
                  <Text bold>
                    {item.sort}. {HTMLDecode(cnjp(item.name_cn, item.name))}
                    {!!item.comment && (
                      <Text type='main' size={11} lineHeight={14}>
                        {' '}
                        +{item.comment}
                      </Text>
                    )}
                  </Text>
                  <Text style={_.mt.sm} size={11} type='sub'>
                    首播: {item.airdate || '-'} / 时长: {item.duration || '-'}
                  </Text>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            {/* 缩略图有多少显示多少, 从上到下按行平铺 */}
            {!WEB && !!epsThumbs?.[index] && (
              <InView style={styles.inView} y={InView.y(index, IMAGE_HEIGHT)}>
                <Squircle width={IMAGE_WIDTH} height={IMAGE_HEIGHT} radius={_.radiusSm}>
                  <Image
                    src={epsThumbs[index]}
                    size={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    radius={0}
                    headers={epsThumbsHeader}
                    onPress={() => {
                      showImageViewer(
                        epsThumbs.map(item => ({
                          url: item.split('@')?.[0] || '',
                          headers: epsThumbsHeader
                        })),
                        index
                      )
                    }}
                  />
                </Squircle>
              </InView>
            )}
          </Flex>
          {!index && <Heatmap id='章节.跳转' />}
        </Touchable>
      ))}
    </ScrollView>
  )
}

export default observer(List)
