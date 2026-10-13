/*
 * @Author: czy0729
 * @Date: 2026-10-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 好友最近关注卡片 (一行三个)
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Katakana, Squircle, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, CoverBlur, InView, TouchableScale } from '@_'
import { _, systemStore, useStore } from '@stores'
import { findSubjectCn, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { SCRIM_HEIGHT_SM } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Item({ item, index, y }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const title = findSubjectCn(item.name, item.id)
  const isMusic = $.typeCn === '音乐'
  const { width, height } = styles.cover
  const coverHeight = isMusic ? width : height
  const isUseCDN = !x18(item.id, title)

  return (
    <View style={stl(styles.item, index % 3 !== 2 && styles.itemMarginRight)}>
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
              from: 'friends',
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
              scrimHeight={SCRIM_HEIGHT_SM}
            />
            <View style={styles.desc}>
              <Text type='__plain__' size={9} numberOfLines={1}>
                <Text
                  type='__plain__'
                  size={9}
                  bold
                  onPress={() => {
                    navigation.push('Zone', {
                      userId: item.userId,
                      _name: item.userName
                    })

                    t('频道.跳转', {
                      to: 'Zone',
                      from: 'friends',
                      type: $.type,
                      userId: item.userId
                    })
                  }}
                >
                  {item.userName}
                </Text>{' '}
                {item.action}
              </Text>

              <View style={_.mt.xs}>
                <Katakana.Provider
                  firstLineStyle={_.mt.xs}
                  type='__plain__'
                  size={11}
                  bold
                  numberOfLines={2}
                >
                  <Katakana type='__plain__' size={11} bold numberOfLines={2}>
                    {title}
                  </Katakana>
                </Katakana.Provider>
              </View>
            </View>
          </Squircle>
        </TouchableScale>
      </InView>
    </View>
  )
}

export default observer(Item)
