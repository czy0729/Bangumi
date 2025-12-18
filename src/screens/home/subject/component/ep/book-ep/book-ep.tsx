/*
 * @Author: czy0729
 * @Date: 2022-07-09 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-18 21:53:59
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Button, Flex, Heatmap, Input, Text } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { TITLE_EP } from '../../../ds'
import IconManga from '../../icon/manga'
import IconSearch from '../../icon/search'
import IconWenku from '../../icon/wenku'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const BookEp = memo(
  ({
    styles,
    chap = '0',
    vol = '0',
    book = {},
    comicLength = 0,
    status = {
      name: '未收藏'
    },
    focusOrigin = false,
    onChangeText = FROZEN_FN,
    onScrollIntoViewIfNeeded = FROZEN_FN,
    doUpdateBookEp = FROZEN_FN,
    doUpdateNext = FROZEN_FN
  }) => {
    const { totalChap } = book

    let textVol = book.totalVol
    if (textVol === '??' && comicLength) textVol = `?${comicLength}`

    const canSubmit = !!status.name && status.name !== '未收藏'

    const elRight = useMemo(
      () => (
        <>
          {!focusOrigin && <IconSearch />}
          <IconManga />
          <IconWenku />
        </>
      ),
      [focusOrigin]
    )

    /** 抽象一个渲染块，复用 Chap / Vol */
    const renderInputBlock = ({
      label,
      value,
      placeholder,
      total,
      totalNumber,
      type
    }: {
      label: string
      value: string | number
      placeholder: string | number
      total?: string | number
      totalNumber?: string | number
      type: 'chap' | 'vol'
    }) => (
      <>
        <Flex>
          <Text style={styles.label} align='right'>
            {label}
          </Text>
          <View style={styles.input}>
            <Input
              style={styles.inputRaw}
              keyboardType='numeric'
              value={String(value)}
              placeholder={String(placeholder) || '0'}
              editable={canSubmit}
              clearButtonMode='never'
              returnKeyType='done'
              returnKeyLabel='更新'
              onChangeText={
                canSubmit
                  ? text => {
                      const newText = text.replace(/[^\d]+/, '')
                      onChangeText(type, newText)
                    }
                  : undefined
              }
              onSubmitEditing={canSubmit ? doUpdateBookEp : undefined}
              onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            />
            {!!totalNumber && Number(totalNumber) !== 0 && (
              <Flex style={styles.progressWrap}>
                <Progress
                  style={styles.progress}
                  barStyle={styles.bar}
                  percent={
                    parseInt(String(value)) > 0
                      ? Math.max(4, (parseInt(String(value)) / parseInt(String(totalNumber))) * 100)
                      : 0
                  }
                />
              </Flex>
            )}
            {!!total && Number(total) !== 0 && (
              <Text style={styles.total} type='sub'>
                / {total}
              </Text>
            )}
          </View>
          {canSubmit && (
            <Button
              style={styles.btnPlus}
              styleText={styles.btnText}
              type='ghostPrimary'
              onPress={() => doUpdateNext(type)}
            >
              +
            </Button>
          )}
        </Flex>
      </>
    )

    return (
      <View style={styles.container}>
        <SectionTitle right={elRight} splitStyles>
          {TITLE_EP}
        </SectionTitle>

        <Flex style={_.mt.md} align='start'>
          <Flex.Item>
            {renderInputBlock({
              label: 'Chap.',
              value: chap,
              placeholder: book.chap || '0',
              total: totalChap,
              totalNumber: totalChap,
              type: 'chap'
            })}

            <Flex style={_.mt.sm}>
              {renderInputBlock({
                label: 'Vol.',
                value: vol,
                placeholder: book.vol || '0',
                total: textVol,
                totalNumber: book.totalVol,
                type: 'vol'
              })}
              <Heatmap id='条目.更新书籍下一个章节' />
            </Flex>
          </Flex.Item>

          {canSubmit ? (
            <View style={_.ml.md}>
              <Button style={styles.btn} type='ghostPrimary' onPress={doUpdateBookEp}>
                更新
              </Button>
              <Heatmap id='条目.更新书籍章节' />
            </View>
          ) : (
            <Text style={_.mt.sm} type='sub' size={13} bold>
              收藏后才能进行管理
            </Text>
          )}
        </Flex>
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default BookEp
