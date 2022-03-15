/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 01:52:14
 */
import React from 'react'
import { View } from 'react-native'
import { toJS } from 'mobx'
import { ScrollView, Flex, Text, Image, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { desc, cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { showImageViewer } from '@utils/ui'

const imageWidth = 104 * _.ratio
const imageHeight = imageWidth * 0.56

function List(props, { $, navigation }) {
  const styles = memoStyles()

  // sp排在正常章节后面, 已播放优先
  const eps = $.eps.sort((a, b) =>
    desc(a, b, item => (item.status === 'NA' ? 0 : item.type || 10))
  )
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
                  size={imageWidth}
                  height={imageHeight}
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

const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.sm + 2,
    paddingHorizontal: _.wind
  },
  status: {
    width: 6,
    height: 6,
    marginTop: 6 * _.ratio,
    marginRight: _.sm,
    backgroundColor: _.colorSub,
    borderRadius: 3
  },
  statusSuccess: {
    backgroundColor: _.colorSuccess
  },
  statusPrimary: {
    backgroundColor: _.colorPrimary
  }
}))
