/*
 * @Author: czy0729
 * @Date: 2021-08-12 15:30:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:19:06
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { Rank, SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TITLE_RATING } from '../../../ds'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Title({ showScore }, { $, navigation }: Ctx) {
  const { showRating } = systemStore.setting
  return (
    <SectionTitle
      left={
        showRating && (
          <Rank
            style={styles.rank}
            value={$.subject.rank || $.subjectFromOSS?.rating?.rank || '-'}
            size={13}
          />
        )
      }
      right={
        showRating && (
          <Flex>
            {$.type === '动画' && (
              <Touchable
                style={styles.netabare}
                onPress={() => {
                  t('条目.跳转', {
                    to: 'Netabare',
                    from: '评分分布',
                    subjectId: $.subjectId
                  })

                  navigation.push('WebBrowser', {
                    title: `${cnjp($.cn, $.jp)}的趋势`,
                    url: `https://netaba.re/subject/${$.subjectId}`
                  })
                }}
              >
                <Flex>
                  <Text style={_.ml.sm} type='sub'>
                    趋势
                  </Text>
                  <Iconfont style={_.ml.xs} name='md-open-in-new' size={17} />
                </Flex>
                <Heatmap id='条目.跳转' from='评分分布' to='Netabare' />
              </Touchable>
            )}
            <Touchable
              style={styles.rate}
              onPress={() => {
                t('条目.跳转', {
                  to: 'Stats',
                  from: '评分分布',
                  subjectId: $.subjectId
                })

                navigation.push('WebBrowser', {
                  title: `${cnjp($.cn, $.jp)}的透视`,
                  url: `https://bgm.tv/subject/${$.subjectId}/stats`
                })
              }}
            >
              <Flex>
                <Text style={_.ml.sm} type='sub'>
                  透视
                </Text>
                <Iconfont style={_.ml.xs} name='md-open-in-new' size={17} />
              </Flex>
              <Heatmap id='条目.跳转' from='评分分布' to='Stats' />
            </Touchable>
          </Flex>
        )
      }
      icon={!showRating && 'md-navigate-next'}
      onPress={() => $.onSwitchBlock('showRating')}
    >
      {TITLE_RATING}{' '}
      {showScore && (
        <Text type='warning' size={18} lineHeight={18} bold>
          {$.rating.score}
        </Text>
      )}
    </SectionTitle>
  )
}

export default obc(Title, COMPONENT)
