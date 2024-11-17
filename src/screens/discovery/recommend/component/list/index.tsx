/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:33:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:52:01
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, ScrollView, Text } from '@components'
import { ItemSearch } from '@_'
import { _, useStore } from '@stores'
import { desc } from '@utils'
import { ob } from '@utils/decorators'
import { IOS, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT, EVENT, SORT } from './ds'
import { styles } from './styles'

function List() {
  const { $, navigation } = useStore<Ctx>()
  if ($.state.searching) return <Loading style={_.container.flex} />

  const { cat } = $.state
  if (cat === 'v1') {
    const { data } = $.state
    return (
      <ScrollView
        contentContainerStyle={_.container.bottom}
        keyboardDismissMode='on-drag'
        onScroll={$.onScroll}
      >
        {SORT.slice()
          .sort((a, b) => desc(!!data[a.key]?.length, !!data[b.key]?.length))
          .map(item => (
            <View key={item.key} style={_.mv.md}>
              <Text style={_.ml.md} size={20} bold>
                {item.title}
              </Text>
              <View style={styles.list}>
                {data[item.key].map((item, index) => {
                  const subject = $.subject(item)
                  const oss = $.subjectOSS(item)
                  if (!(subject.jp || oss.name || subject.cn || oss.name_cn)) {
                    return (
                      <Flex key={String(item)} style={styles.loading} justify='center'>
                        <Loading.Raw />
                      </Flex>
                    )
                  }

                  return (
                    <ItemSearch
                      key={String(item)}
                      style={_.container.item}
                      navigation={navigation}
                      index={index}
                      id={`/subject/${item}`}
                      typeCn='动画'
                      name={subject.jp || oss.name}
                      nameCn={subject.cn || oss.name_cn}
                      cover={subject.image || oss.image}
                      rank={subject.rank || oss.rank}
                      score={subject.rating.score || oss.rating?.score}
                      total={`(${subject.rating.total || oss.rating?.total || 0})`}
                      tip={[
                        subject.eps || oss.totalEps ? `${subject.eps || oss.totalEps}话` : '',
                        subject.date || oss.date,
                        oss.origin,
                        oss.director
                      ]
                        .filter(item => !!item)
                        .join(' / ')}
                      event={EVENT}
                    />
                  )
                })}
              </View>
            </View>
          ))}
      </ScrollView>
    )
  }

  const data = $.state.dataV2[cat] || []
  return (
    <ScrollView
      contentContainerStyle={_.container.bottom}
      keyboardDismissMode='on-drag'
      onScroll={$.onScroll}
    >
      <View style={styles.list}>
        {data.map((item, index) => {
          const { sid, type, score } = item
          const subject = $.subject(sid)
          const oss = $.subjectOSS(sid)
          if (!(subject.jp || oss.name || subject.cn || oss.name_cn)) {
            return null
          }

          return (
            <View key={String(sid)} style={[_.container.item, styles.recItem]}>
              <ItemSearch
                navigation={navigation}
                index={index}
                id={`/subject/${sid}`}
                typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(
                  type || subject.type || oss.type
                )}
                name={subject.jp || oss.name}
                nameCn={subject.cn || oss.name_cn}
                cover={subject.image || oss.image}
                rank={subject.rank || oss.rank}
                score={subject.rating.score || oss.rating?.score}
                total={`(${subject.rating.total || oss.rating?.total || 0})`}
                tip={[
                  subject.eps || oss.totalEps ? `${subject.eps || oss.totalEps}话` : '',
                  subject.date || oss.date,
                  oss.origin,
                  oss.director
                ]
                  .filter(item => !!item)
                  .join(' / ')}
                showManage={false}
                event={EVENT}
              />
              <View style={styles.recBadge} pointerEvents='none'>
                <Text overrideStyle={styles.recText}>
                  {score}
                  {IOS ? '' : ' '}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default ob(List, COMPONENT)
