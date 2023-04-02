/*
 * @Author: czy0729
 * @Date: 2023-03-31 12:57:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 11:51:32
 */
import React from 'react'
import { Popover } from 'react-native-popable'
import { Portal, Flex, BgmText, Touchable } from '@components'
import { _, rakuenStore, uiStore } from '@stores'
import { t } from '@utils/fetch'
import { BlurView } from '../blur-view'
import { getPosition } from './utils'
import { DATA, HIT_SLOP } from './ds'
import { memoStyles } from './styles'
import { stl } from '@utils'
import { ob } from '@utils/decorators'

export const LikesGrid = ob(
  ({ visible, portalKey, x, y, value, topicId, floorId, formhash, likeType }) => {
    if (!rakuenStore.setting.likes) return null

    const styles = memoStyles()
    const position = getPosition(x, y)
    return (
      <Portal key={String(portalKey)}>
        <Popover
          style={[styles.subject, position.style]}
          position={position.position}
          visible={visible}
          caret={false}
          backgroundColor='transparent'
        >
          {!!topicId && (
            <BlurView style={styles.container} intensity={_.select(64, 80)}>
              <Flex wrap='wrap'>
                {DATA.map(item => (
                  <Touchable
                    style={styles.touch}
                    useRN
                    highlight
                    hitSlop={HIT_SLOP}
                    onPress={() => {
                      uiStore.closeLikesGrid()
                      uiStore.preFlipLikes(topicId, floorId)

                      const main_id = Number(String(topicId).split('/')?.[1]) || 0
                      const value = String(item[1])
                      rakuenStore.doLike(
                        {
                          main_id,
                          type: likeType || 8,
                          value
                        },
                        floorId,
                        formhash,
                        topicId,
                        () => {
                          setTimeout(() => {
                            uiStore.afterFlip()
                          }, 800)

                          t('帖子.贴贴', {
                            id: floorId,
                            topicId,
                            value,
                            from: 'grid'
                          })
                        }
                      )
                    }}
                  >
                    <Flex
                      style={stl(
                        styles.item,
                        String(value) === String(item[1]) && styles.itemActive
                      )}
                      justify='center'
                    >
                      <BgmText key={item[0]} index={item[0]} size={18} />
                    </Flex>
                  </Touchable>
                ))}
              </Flex>
            </BlurView>
          )}
        </Popover>
      </Portal>
    )
  }
)
