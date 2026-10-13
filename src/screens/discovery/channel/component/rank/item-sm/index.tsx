/*
 * @Author: czy0729
 * @Date: 2024-08-20 16:32:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 注目榜半宽卡片 (第 2-3 名)
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Katakana, Squircle, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, CoverBlur, InView, Rate, TouchableScale } from '@_'
import { _, systemStore, useStore } from '@stores'
import { findSubjectCn, HTMLDecode, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { SCRIM_HEIGHT } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function ItemSm({ item, index, y }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const title = findSubjectCn(HTMLDecode(item.name), item.id)
  const isMusic = $.typeCn === '音乐'
  const { width, height } = styles.cover
  const coverHeight = isMusic ? width : height
  const isUseCDN = !x18(item.id, title)

  return (
    <View style={stl(styles.item, index % 2 === 0 && styles.itemMarginRight)}>
      <InView style={{ width, height: coverHeight }} y={y}>
        <TouchableScale
          onPress={() => {
            navigation.push('Subject', {
              subjectId: item.id,
              _jp: item.name,
              _image: getCoverSrc(item.cover, width),
              _type: $.typeCn
            })

            t('频道.跳转', {
              to: 'Subject',
              from: 'rank',
              type: $.type,
              subjectId: item.id
            })
          }}
        >
          <Squircle width={width} height={coverHeight} radius={systemStore.coverRadius}>
            <Cover src={item.cover} width={width} height={coverHeight} cdn={isUseCDN} />
            <CoverBlur
              src={item.cover}
              cdn={isUseCDN}
              width={width}
              height={coverHeight}
              scrimHeight={SCRIM_HEIGHT}
            />
            <View style={styles.desc}>
              <Text type={_.select('plain', 'desc')} size={10} numberOfLines={1} bold>
                {item.follow}
              </Text>
              <View style={_.mt.xs}>
                <Katakana.Provider
                  firstLineStyle={_.mt.sm}
                  type='__plain__'
                  size={14}
                  bold
                  numberOfLines={2}
                >
                  <Katakana type='__plain__' size={14} bold numberOfLines={2}>
                    {title}
                  </Katakana>
                </Katakana.Provider>
              </View>
            </View>
            <Rate style={styles.rec} textStyle={styles.recText} value={index + 2} />
          </Squircle>
        </TouchableScale>
      </InView>
    </View>
  )
}

export default observer(ItemSm)
