/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:55:15
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Katakana, Squircle, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, CoverBlur, TouchableScale } from '@_'
import { _, subjectStore, systemStore } from '@stores'
import { cnjp, getCoverLarge, HTMLDecode, matchCoverUrl } from '@utils'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, SCRIM_HEIGHT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function CoverLg({ title, src, cn, data }: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()
  const { subjectId } = data
  const subjectJP = subjectStore.jp(subjectId) || data.title
  const subjectCN = subjectStore.cn(subjectId) || cn

  const isMusic = title === '音乐'
  const { width, height: h } = styles.cover
  const height = isMusic ? width : h

  const isUseCDN = systemStore.setting.cdnOrigin === 'magma'
  const coverSrc = isUseCDN ? matchCoverUrl(src, false) : getCoverLarge(src)

  return (
    <TouchableScale
      style={styles.item}
      onPress={withT(
        () => {
          navigation.push('Subject', {
            subjectId,
            _jp: subjectJP,
            _cn: subjectCN,
            _image: getCoverSrc(src, width),
            _type: title
          })
        },
        '发现.跳转',
        {
          to: 'Subject',
          subjectId,
          from: `CoverLg|${title}`
        }
      )}
    >
      <Squircle width={width} height={height} radius={systemStore.coverRadius}>
        <Cover src={coverSrc} size={width} height={height} cdn={isUseCDN} />
        <CoverBlur
          src={src}
          cdn={isUseCDN}
          width={width}
          height={height}
          scrimHeight={SCRIM_HEIGHT}
        />
        <View style={styles.desc} pointerEvents='none'>
          <Text type={_.select('plain', 'desc')} bold>
            {data.info}
          </Text>
          <View style={_.mt.sm}>
            <Katakana.Provider
              firstLineStyle={_.mt.sm}
              type='__plain__'
              size={22}
              bold
              numberOfLines={2}
            >
              <Katakana type='__plain__' size={22} bold numberOfLines={2}>
                {HTMLDecode(cnjp(subjectCN, subjectJP))}
              </Katakana>
            </Katakana.Provider>
          </View>
        </View>
      </Squircle>
    </TouchableScale>
  )
}

export default observer(CoverLg)
