/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:08:37
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Button, Text, Touchable, Iconfont, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { date, getType, getRating } from '@utils'
import { memo } from '@utils/decorators'
import i18n from '@constants/i18n'
import IconFolder from '../icon/folder'
import IconClose from '../icon/close'
import { RATE, DEFAULT_PROPS } from './ds'

export default memo(
  ({
    styles,
    navigation,
    collection,
    collectionStatus: userCollectionStatus,
    isLogin,
    status,
    showCount,
    showManageModel,
    toRating
  }) => {
    global.rerender('Subject.Box.Main')

    // 自己的收藏状态
    const {
      status: collectionStatus = { name: '未收藏', type: null },
      rating = 0,
      private: privacy,
      lasttouch,
      _loaded
    } = collection
    const leftStyle = []
    const rightStyle = []
    if (rating) {
      leftStyle.push(styles.left)
      rightStyle.push(styles.right)
    }

    let btnText = `${i18n.login()}管理`
    if (isLogin) {
      if (!_loaded) {
        btnText = userCollectionStatus || collectionStatus.name
      } else {
        btnText = collectionStatus.name
      }
    }

    const onPress = isLogin ? showManageModel : () => navigation.push('LoginV2')
    const statusSize = status[status.length - 1]?.text.length >= 6 ? 11 : 12

    let last = ''
    if (
      lasttouch &&
      ['collect', 'on_hold', 'dropped'].includes(collectionStatus?.type)
    ) {
      last = date('Y.m.d', lasttouch)
    }

    return (
      <View style={styles.container}>
        <SectionTitle
          style={styles.sectionTitle}
          right={
            <>
              <IconFolder />
              <IconClose />
            </>
          }
        >
          收藏
        </SectionTitle>
        <Touchable style={styles.btn} onPress={onPress}>
          <Flex justify='center'>
            <Flex.Item>
              <Button
                style={leftStyle}
                type={getType(btnText)}
                extra={
                  privacy == 1 && (
                    <Iconfont
                      style={_.ml.xs}
                      color={_.__colorPlain__}
                      size={17}
                      name='md-visibility-off'
                    />
                  )
                }
              >
                {btnText}
                {!!last && ` ${last}`}
              </Button>
            </Flex.Item>
            {!!rating && (
              <Flex.Item>
                <Button style={rightStyle} type={getType(btnText)}>
                  {getRating(rating)}{' '}
                  {RATE.map(item => {
                    let type
                    if (rating / 2 >= item) {
                      type = 'ios-star'
                    } else if (rating / 2 >= item - 0.5) {
                      type = 'ios-star-half'
                    } else {
                      type = 'ios-star-outline'
                    }

                    return (
                      <Iconfont
                        key={item}
                        name={type}
                        size={16}
                        color={_.__colorPlain__}
                      />
                    )
                  })}
                </Button>
              </Flex.Item>
            )}
          </Flex>
          <Heatmap id='条目.管理收藏' />
          <Heatmap right={56} transparent id='条目.显示收藏管理' />
        </Touchable>
        {showCount && (
          <View style={_.mt.md}>
            <Text size={statusSize} type='sub'>
              {status.map((item, index) => (
                <Text
                  key={item.status}
                  size={statusSize}
                  type='sub'
                  onPress={() => toRating(navigation, '收藏', item.status)}
                >
                  {!!index && ' / '}
                  {item.text}
                </Text>
              ))}
            </Text>
            <Heatmap id='条目.跳转' from='收藏' />
          </View>
        )}
      </View>
    )
  },
  DEFAULT_PROPS
)
