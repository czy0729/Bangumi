/*
 * @Author: czy0729
 * @Date: 2024-02-15 00:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-15 01:48:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { cnjp, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function VIB(_props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const data = ['VIB']
  if ($.vib.anidb) data.push('AniDB')
  if ($.vib.mal) data.push('MAL')
  if ($.type === '动画') data.push('netaba.re')

  return (
    <View style={styles.vib}>
      <Popover
        data={data}
        onSelect={label => {
          if (label === 'VIB') {
            t('条目.跳转', {
              to: 'Stats',
              from: '评分分布',
              subjectId: $.subjectId
            })

            navigation.push('WebBrowser', {
              title: `${cnjp($.cn, $.jp)}的透视`,
              url: `https://bgm.tv/subject/${$.subjectId}/stats`
            })
            return
          }

          if (label === 'netaba.re') {
            t('条目.跳转', {
              to: 'Netabare',
              from: '评分分布',
              subjectId: $.subjectId
            })

            navigation.push('WebBrowser', {
              title: `${cnjp($.cn, $.jp)}的趋势`,
              url: `https://netaba.re/subject/${$.subjectId}`
            })
            return
          }

          if (label === 'AniDB') {
            open(
              `https://anidb.net/anime/?adb.search=${($.jp || $.cn).replace(
                /～|、|・/g,
                ' '
              )}&do.search=1`
            )
            return
          }

          if (label === 'MAL') {
            open(`https://myanimelist.net/anime.php?q=${$.jp || $.cn}`)
            return
          }
        }}
      >
        <Flex style={styles.container} direction='column' align='end'>
          {$.vib.avg ? (
            <Text type='sub' size={10} lineHeight={11}>
              VIB: {Number($.vib.avg).toFixed(1)} ({$.vib.total})
            </Text>
          ) : (
            <Text type='sub' size={10} lineHeight={11}>
              VIB: N/A
            </Text>
          )}
          {!!$.vib.anidb && (
            <Text type='sub' size={10} lineHeight={11}>
              AniDB: {Number($.vib.anidb).toFixed(1)} ({$.vib.anidbTotal})
            </Text>
          )}
          {!!$.vib.mal && (
            <Text type='sub' size={10} lineHeight={11}>
              MAL: {Number($.vib.mal).toFixed(1)} ({$.vib.malTotal})
            </Text>
          )}
        </Flex>
      </Popover>
    </View>
  )
}

export default obc(VIB, COMPONENT)
