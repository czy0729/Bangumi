/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:33:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 12:00:00
 */
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, ListView, Loading, ScrollView, Text } from '@components'
import { ItemSearch } from '@_'
import { _, useStore } from '@stores'
import { desc } from '@utils'
import { IOS, MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT, EVENT, SORT } from './ds'
import { memoStyles } from './styles'

import type { ListRenderItemInfo } from 'react-native'
import type { SubjectId, SubjectTypeCn } from '@types'
import type { Ctx } from '../../types'

/** v2 推荐结果项 */
type RecommendItem = {
  sid: SubjectId
  type: number
  score: string
}

function List() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { cat } = $.state

  // v2 推荐结果由 ScrollView 全量渲染改为 ListView 虚拟化, 屏幕外条目不再挂载 (及其封面)
  const v2List = ($.state.dataV2[cat] || []) as RecommendItem[]
  const v2Data = useMemo(() => ({ list: v2List }), [v2List])

  const v2KeyExtractor = useCallback((item: RecommendItem) => String(item.sid), [])

  const renderV2Item = useCallback(
    ({ item, index }: ListRenderItemInfo<RecommendItem>) => {
      const { sid, type, score } = item
      const subject = $.subject(sid)
      const oss = $.subjectOSS(sid)
      if (!(subject.jp || oss.name || subject.cn || oss.name_cn)) return null

      return (
        <View style={[_.container.item, styles.recItem]}>
          <ItemSearch
            navigation={navigation}
            index={index}
            id={`/subject/${sid}`}
            typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type || subject.type || oss.type)}
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
    },
    [$, navigation, styles]
  )

  if ($.state.searching) return <Loading style={_.container.flex} />

  // v1 数据已不可达 (可选分类里已注释), 保留原有全量渲染实现
  if (cat === 'v1') {
    const { data } = $.state
    return (
      <ScrollView
        contentContainerStyle={_.container.bottom}
        keyboardDismissMode='on-drag'
        onScroll={$.onScroll}
      >
        {SORT.slice()
          .sort((a, b) => desc(data[a.key]?.length ? 1 : 0, data[b.key]?.length ? 1 : 0))
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

  return (
    <ListView
      keyExtractor={v2KeyExtractor}
      contentContainerStyle={[_.container.bottom, styles.list]}
      keyboardDismissMode='on-drag'
      data={v2Data}
      renderItem={renderV2Item}
      showFooter={false}
      onScroll={$.onScroll}
    />
  )
}

export default observer(List)
