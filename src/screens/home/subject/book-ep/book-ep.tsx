/*
 * @Author: czy0729
 * @Date: 2022-07-09 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 14:42:43
 */
import React from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Flex, Text, Input, Button, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import IconSearch from '../icon/search'
import IconManga from '../icon/manga'
import IconWenku from '../icon/wenku'
import IconHD from '../icon/hd'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    styles,
    chap,
    vol,
    book,
    comicLength,
    status,
    onChangeText,
    onScrollIntoViewIfNeeded,
    doUpdateBookEp,
    doUpdateNext
  }) => {
    global.rerender('Subject.BookEp.Main')

    let textVol = book.totalVol
    if (textVol === '??' && comicLength) textVol = `?${comicLength}`

    const canSubmit = !!status.name && status.name !== '未收藏'
    return (
      <View style={styles.container}>
        <SectionTitle
          right={
            <>
              <IconSearch />
              <IconManga />
              <IconWenku />
              <IconHD />
            </>
          }
        >
          章节
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
                  value={chap}
                  placeholder={String(book.chap) || '0'}
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
                {!!book.totalChap && (
                  <Text style={styles.total} type='sub'>
                    / {book.totalChap}
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
            {!!book.totalChap && (
              <Flex style={styles.progressWrap}>
                <Progress
                  style={styles.progress}
                  barStyle={styles.bar}
                  percent={(parseInt(chap) / parseInt(book.totalChap)) * 100}
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
                  value={vol}
                  placeholder={String(book.vol) || '0'}
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
                {!!textVol && (
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
                  percent={(parseInt(vol) / parseInt(book.totalVol)) * 100}
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
  DEFAULT_PROPS
)
