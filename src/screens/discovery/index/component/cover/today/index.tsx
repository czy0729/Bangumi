/*
 * @Author: czy0729
 * @Date: 2021-07-16 00:14:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:55:30
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Katakana, Squircle, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, CoverBlur, TouchableScale } from '@_'
import { _, systemStore } from '@stores'
import { cnjp, getCoverMedium, HTMLDecode, x18 } from '@utils'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, SCRIM_HEIGHT_RATIO, WEEKDAY_CN } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function CoverToday({ data }: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  const { width, height } = styles.cover
  const subjectId = data.id
  const isUseCDN = !x18(subjectId)
  const coverSrc = getCoverMedium(data?.images?.common)

  return (
    <TouchableScale
      style={styles.item}
      onPress={withT(
        () => {
          navigation.push('Subject', {
            subjectId,
            _jp: data.name,
            _cn: data.name_cn,
            _image: getCoverSrc(data?.images?.common, width)
          })
        },
        '发现.跳转',
        {
          to: 'Subject',
          subjectId,
          from: 'CoverToday'
        }
      )}
    >
      <Squircle width={width} height={height} radius={systemStore.coverRadius}>
        <Cover src={coverSrc} width={width} height={height} cdn={isUseCDN} />
        <CoverBlur
          src={data?.images?.common}
          cdn={isUseCDN}
          width={width}
          height={height}
          scrimHeight={Math.round(height * SCRIM_HEIGHT_RATIO)}
        />
        <View style={styles.info} pointerEvents='none'>
          <Text
            type='__plain__'
            size={_.device(10, 13)}
            numberOfLines={1}
            bold
            pointerEvents='none'
          >
            {data.timeCN.slice(0, 2)}:{data.timeCN.slice(2)} · 周{WEEKDAY_CN[data.weekday]}
          </Text>
          <View style={_.mt.xs} pointerEvents='none'>
            <Katakana.Provider
              firstLineStyle={_.mt.sm}
              type='__plain__'
              size={_.device(10, 12)}
              numberOfLines={2}
              bold
            >
              <Katakana type='__plain__' size={_.device(10, 12)} numberOfLines={2} bold>
                {HTMLDecode(cnjp(data.name_cn, data.name))}
              </Katakana>
            </Katakana.Provider>
          </View>
        </View>
      </Squircle>
    </TouchableScale>
  )
}

export default observer(CoverToday)
