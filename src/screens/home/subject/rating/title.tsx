/*
 * @Author: czy0729
 * @Date: 2021-08-12 15:30:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-13 08:00:42
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { SectionTitle, Rank } from '@_'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'

function Title({ showScore }, { $, navigation }: Ctx) {
  global.rerender('Subject.Rating.Title')

  const { showRating } = systemStore.setting
  const { rank = '-' } = $.subject
  const showNetabare = $.type === '动画'
  return (
    <SectionTitle
      left={showRating && <Rank style={styles.rank} value={rank} size={13} />}
      right={
        showRating && (
          <Flex>
            {showNetabare && (
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
      评分{' '}
      {showScore && (
        <Text type='warning' size={18} lineHeight={18} bold>
          {$.rating.score}
        </Text>
      )}
    </SectionTitle>
  )
}

export default obc(Title)

const styles = _.create({
  netabare: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  rate: {
    paddingLeft: _.sm,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  rank: {
    minWidth: _.r(44),
    marginLeft: _.xs
  }
})
