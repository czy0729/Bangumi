/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 05:05:43
 */
import React from 'react'
import { View } from 'react-native'
import { toJS } from 'mobx'
import { ScrollView, Flex, Text, Image, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { desc, cnjp, HTMLDecode, showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { memoStyles } from './styles'
import { Ctx } from '../types'

const IMAGE_WIDTH = _.r(128)
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.56

function List(props, { $, navigation }: Ctx) {
  const styles = memoStyles()

  // sp排在正常章节后面, 已播放优先
  const eps = $.eps
    .slice()
    .sort((a, b) => desc(a, b, item => (item.status === 'NA' ? 0 : item.type || 10)))
  const epsThumbs = toJS($.params.epsThumbs || [])
  const { filterEps = 0, epsThumbsHeader = {} } = $.params

  return (
    <ScrollView
      style={_.container.plain}
      contentContainerStyle={_.container.bottom}
      scrollToTop
    >
      {eps.map((item, index) => (
        <Touchable
          key={item.id}
          animate
          onPress={() => {
            t('章节.跳转', {
              to: 'Topic',
              topicId: `ep/${item.id}`
            })

            navigation.push('Topic', {
              topicId: `ep/${item.id}`,
              _title: `ep${item.sort}.${item.name}`,
              _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${item.desc}`
            })
          }}
        >
          <Flex style={styles.item}>
            <Flex.Item>
              <Flex align='start'>
                <View
                  style={[
                    styles.status,
                    item.status === 'Air' && styles.statusPrimary,
                    item.status === 'Today' && styles.statusSuccess
                  ]}
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
            {!!epsThumbs[index + filterEps] && (
              <View style={_.ml.sm}>
                <Image
                  src={epsThumbs[index]}
                  size={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  radius
                  headers={epsThumbsHeader}
                  onPress={() =>
                    showImageViewer(
                      epsThumbs.map(item => ({
                        url: item.split('@')[0],
                        headers: epsThumbsHeader
                      })),
                      index
                    )
                  }
                />
              </View>
            )}
          </Flex>
          {!index && <Heatmap id='章节.跳转' />}
        </Touchable>
      ))}
    </ScrollView>
  )
}

export default obc(List)
