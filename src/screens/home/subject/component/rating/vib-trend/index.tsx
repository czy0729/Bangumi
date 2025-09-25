/*
 * @Author: czy0729
 * @Date: 2025-02-14 04:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 16:07:55
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { desc, stl } from '@utils'
import { t } from '@utils/fetch'
import { useBoolean, useObserver } from '@utils/hooks'
import typeScore from '@assets/json/type_score_distribution.json'
import { Ctx } from '../../../types'
import { useVIBTrend } from './hooks'
import { getPercentile } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function VibTrend() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const { rating, vib, subjectId, subjectType } = $
    if (!rating?.score) return null

    const styles = memoStyles()
    const data = useVIBTrend(subjectId)

    const typeScoreData = Object.entries(typeScore[subjectType])
      .filter(([key]) => key !== '0.0' && key !== '10.0')
      .sort((a, b) => desc(a, b))
    const max = Math.max(...typeScoreData.map(item => item[1]))

    const vibValue = Number(vib.avg)
    const vibLabel = Number.isFinite(vibValue) ? vibValue.toFixed(1) : 'N/A'

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const renderBar = ([score, count]: [string, number]) => {
      const height = clamp(Math.floor((count / max) * 100), 2, 100)
      const isActive = Number(rating.score) === Number(score)
      const isActiveVIB = vibLabel !== 'N/A' && Number(vibLabel) === Number(score)

      return (
        <Flex.Item key={score}>
          {isActiveVIB && (
            <Text
              style={[styles.typeScoreText, { marginBottom: 16 }]}
              type='warning'
              size={8}
              bold
              align='center'
            >
              VIB {vibLabel} ({getPercentile(typeScoreData, Number(vibLabel))})
            </Text>
          )}
          {isActive && (
            <Text style={styles.typeScoreText} type='primary' size={8} bold align='center'>
              {score} ({getPercentile(typeScoreData, Number(score))})
            </Text>
          )}
          <View
            style={stl(
              styles.typeScoreBar,
              (isActive || isActiveVIB) && styles.typeScoreActive,
              isActiveVIB && { backgroundColor: _.colorWarning },
              { height: `${height}%` }
            )}
          />
        </Flex.Item>
      )
    }

    return (
      <>
        <IconTouchable
          style={styles.trend}
          name='md-trending-up'
          size={18}
          onPress={() => {
            setTrue()
            t('条目.趋势', { subjectId })
          }}
        />
        <ActionSheet height={data.length ? 560 : 360} show={state} onClose={setFalse}>
          <Text type='sub' size={12} bold align='center'>
            评分分布
          </Text>

          <Flex style={styles.typeScore} align='end'>
            {typeScoreData.map(renderBar)}
          </Flex>

          {!!data.length && (
            <View style={_.mt.lg}>
              <Flex justify='center'>
                <Text type='sub' size={12} bold align='center'>
                  评分趋势
                </Text>
                <IconTouchable
                  style={styles.info}
                  name='md-info-outline'
                  size={16}
                  onPress={() => {
                    navigation.push('Information', {
                      title: '评分趋势',
                      message: [
                        '数据来源自「评分月刊」，反映该条目数据快照「变动幅度大」的关键节点。'
                      ]
                    })
                  }}
                />
              </Flex>
              <View style={_.mt.md}>
                {data.map(item => {
                  const up = item.value.includes('+')
                  return (
                    <Flex key={`${item.month}|${item.title}`} style={_.mt.xs} justify='center'>
                      <Text style={styles.label} size={12} lineHeight={24} noWrap>
                        {item.month} · {item.title}{' '}
                      </Text>
                      <Flex style={styles.value}>
                        <View style={up && styles.reverse}>
                          <Text type={up ? 'bid' : 'ask'} size={24}>
                            ▾
                          </Text>
                        </View>
                        <Text size={12} lineHeight={24} bold noWrap>
                          {'  '}
                          {item.value.slice(0, 5)}
                        </Text>
                      </Flex>
                    </Flex>
                  )
                })}
              </View>
            </View>
          )}
        </ActionSheet>
      </>
    )
  })
}

export default VibTrend
