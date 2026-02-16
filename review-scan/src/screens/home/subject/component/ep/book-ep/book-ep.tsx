/*
 * @Author: czy0729
 * @Date: 2022-07-09 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:42:14
 */
import React from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Button, Flex, Heatmap, Input, Text } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { TITLE_EP } from '../../../ds'
import IconHD from '../../icon/hd'
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
    return (
      <View style={styles.container}>
        <SectionTitle
          right={
            <>
              {!focusOrigin && <IconSearch />}
              <IconManga />
              <IconWenku />
              <IconHD />
            </>
          }
          splitStyles
        >
          {TITLE_EP}
        </SectionTitle>
        <Flex style={_.mt.md} align='start'>
          <Flex.Item>
            <Flex>
              <Text style={styles.label} align='right'>
                Chap.
              </Text>
              <View style={styles.input}>
                <Input
                  style={styles.inputRaw}
                  keyboardType='numeric'
                  value={String(chap)}
                  placeholder={String(book.chap) || '0'}
                  editable={canSubmit}
                  clearButtonMode='never'
                  returnKeyType='done'
                  returnKeyLabel='更新'
                  onChangeText={
                    canSubmit
                      ? text => {
                          const newText = text.replace(/[^\d]+/, '')
                          onChangeText('chap', newText)
                        }
                      : undefined
                  }
                  onSubmitEditing={canSubmit ? doUpdateBookEp : undefined}
                  onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
                />
                {!!totalChap && (
                  <Text style={styles.total} type='sub'>
                    / {totalChap}
                  </Text>
                )}
              </View>
              {canSubmit && (
                <Button
                  style={styles.btnPlus}
                  styleText={styles.btnText}
                  type='ghostPrimary'
                  onPress={() => doUpdateNext('chap')}
                >
                  +
                </Button>
              )}
            </Flex>
            {!!totalChap && Number(totalChap) !== 0 && (
              <Flex style={styles.progressWrap}>
                <Progress
                  style={styles.progress}
                  barStyle={styles.bar}
                  percent={(parseInt(String(chap)) / parseInt(totalChap)) * 100}
                />
              </Flex>
            )}
            <Flex style={_.mt.sm}>
              <Text style={styles.label} align='right'>
                Vol.
              </Text>
              <View style={styles.input}>
                <Input
                  style={styles.inputRaw}
                  keyboardType='numeric'
                  value={String(vol)}
                  placeholder={String(book.vol) || '0'}
                  editable={canSubmit}
                  clearButtonMode='never'
                  returnKeyType='done'
                  returnKeyLabel='更新'
                  onChangeText={
                    canSubmit
                      ? text => {
                          const newText = text.replace(/[^\d]+/, '')
                          onChangeText('vol', newText)
                        }
                      : undefined
                  }
                  onSubmitEditing={canSubmit ? doUpdateBookEp : undefined}
                  onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
                />
                {!!textVol && Number(textVol) !== 0 && (
                  <Text style={styles.total} type='sub'>
                    / {textVol}
                  </Text>
                )}
              </View>
              {canSubmit && (
                <Button
                  style={styles.btnPlus}
                  styleText={styles.btnText}
                  type='ghostPrimary'
                  onPress={() => doUpdateNext('vol')}
                >
                  +
                </Button>
              )}
              <Heatmap id='条目.更新书籍下一个章节' />
            </Flex>
            {!!book.totalVol && (
              <Flex style={styles.progressWrap}>
                <Progress
                  style={styles.progress}
                  barStyle={styles.bar}
                  percent={(parseInt(String(vol)) / parseInt(book.totalVol)) * 100}
                />
              </Flex>
            )}
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
