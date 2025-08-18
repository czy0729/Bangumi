/*
 * @Author: czy0729
 * @Date: 2020-07-30 18:10:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:20:35
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Button, Flex, Image, Modal, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { desc, formatNumber, stl, tinygrailOSS, toFixed } from '@utils'
import { r } from '@utils/dev'
import { useBackHandler, useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const BonusModal = () => {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    const { visible = false, bonus, isBonus2, loadingBonus } = $.state
    const handleBackAndroid = useCallback(() => {
      if (visible) {
        $.onCloseModal()
        return true
      }
      return false
    }, [visible])
    useBackHandler(handleBackAndroid)

    const imageWidth = Math.floor(
      bonus.length <= 4
        ? (Math.min(_.window.width - 2 * _.wind, 400) - 2 * _._wind - _.md) * 0.5
        : (Math.min(_.window.width - 2 * _.wind, 400) - 2 * (_._wind + _.md)) * 0.33333
    )
    const imageHeight = Math.floor(imageWidth * 1.28)

    const total = bonus.reduce((total, item) => total + item.Amount * item.CurrentPrice, 0)
    const realChange = (total - $.currentPrice) / $.currentPrice

    return (
      <Modal
        style={styles.modal}
        visible={visible}
        title='刮刮乐'
        type='tinygrailPlain'
        onClose={$.onCloseModal}
      >
        <View style={styles.wrap}>
          <Flex align='start' wrap='wrap'>
            {bonus
              .slice()
              .sort((a, b) => desc(a.CurrentPrice, b.CurrentPrice))
              .map((item, index) => (
                <View
                  key={String(item.Id)}
                  style={stl(
                    styles.item,
                    {
                      width: imageWidth
                    },
                    (index + 1) % (bonus.length <= 4 ? 2 : 3) && _.mr.md
                  )}
                >
                  <Image
                    src={tinygrailOSS(item.Cover, 480)}
                    size={imageWidth}
                    height={imageHeight}
                    imageViewer
                    imageViewerSrc={tinygrailOSS(item.Cover, 480)}
                    skeletonType='tinygrail'
                    radius={_.radiusSm}
                  />
                  <Touchable
                    style={_.mt.sm}
                    onPress={() => {
                      $.onCloseModal()

                      navigation.push('TinygrailDeal', {
                        monoId: `character/${item.Id}`,
                        type: 'ask'
                      })
                    }}
                  >
                    <Text type='tinygrailPlain' size={13} bold align='center'>
                      {item.Name}
                      <Text type='ask' size={12} lineHeight={13}>
                        {' '}
                        lv{item.Level}
                      </Text>
                    </Text>
                    <Text
                      style={_.mt.xs}
                      type={_.select('tinygrailPlain', 'tinygrailText')}
                      size={11}
                      bold
                      align='center'
                    >
                      ₵{toFixed(item.CurrentPrice)}{' '}
                      <Text type='warning' size={11}>
                        x{item.Amount}
                      </Text>
                    </Text>
                  </Touchable>
                </View>
              ))}
          </Flex>
          <Flex style={_.mt.sm} justify='center'>
            <Text type={_.select('tinygrailText', 'tinygrailPlain')} align='center' bold>
              总价值
              <Text type={_.select('tinygrailPlain', 'tinygrailText')} bold>
                {' '}
                ₵{formatNumber(total)}{' '}
              </Text>
            </Text>
            <Text
              style={[
                styles.fluctuation,
                {
                  backgroundColor: realChange >= 0 ? _.colorBid : _.colorAsk
                }
              ]}
              type='__plain__'
              size={11}
              lineHeight={14}
              align='center'
              bold
            >
              {realChange >= 0 ? '+' : '-'}
              {formatNumber(realChange * 100, 0)}%
            </Text>
          </Flex>
          <Flex style={_.mt.md} justify='center'>
            <Button
              style={styles.btn}
              styleText={styles.text}
              size='sm'
              loading={loadingBonus}
              onPress={() => {
                $.doLottery(isBonus2)
              }}
            >
              再刮一次 ({$.nextPrice})
            </Button>
          </Flex>
        </View>
      </Modal>
    )
  })
}

export default BonusModal
