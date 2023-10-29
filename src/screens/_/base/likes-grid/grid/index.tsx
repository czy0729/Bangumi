/*
 * @Author: czy0729
 * @Date: 2023-04-05 15:18:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 01:05:35
 */
import React from 'react'
import { Flex, Bgm, BgmText, Touchable } from '@components'
import { rakuenStore, timelineStore, uiStore } from '@stores'
import { t } from '@utils/fetch'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { IOS, STORYBOOK } from '@constants'
import { HIT_SLOP } from './ds'
import { styles } from './styles'

function Grid({ data, value, topicId, floorId, formhash, likeType }) {
  const isTimeline = likeType == 40

  return (
    <Flex wrap='wrap'>
      {data.map(item => (
        <Touchable
          key={item[0]}
          style={styles.touch}
          useRN
          highlight
          hitSlop={HIT_SLOP}
          onPress={() => {
            uiStore.closeLikesGrid()
            uiStore.preFlipLikes(topicId, floorId)

            const value = String(item[1])
            if (isTimeline) {
              timelineStore.doLike(
                {
                  main_id: topicId,
                  type: likeType,
                  value
                },
                floorId,
                formhash,
                () => {
                  // t('时间胶囊.贴贴', {
                  //   mainId: topicId,
                  //   relatedId: floorId,
                  //   value,
                  //   from: 'grid'
                  // })

                  setTimeout(() => {
                    uiStore.afterFlip()
                  }, 800)
                }
              )
              return
            }

            rakuenStore.doLike(
              {
                main_id: Number(String(topicId).split('/')?.[1]) || 0,
                type: likeType || 8,
                value
              },
              floorId,
              formhash,
              topicId,
              () => {
                t('帖子.贴贴', {
                  id: floorId,
                  topicId,
                  value,
                  from: 'grid'
                })

                setTimeout(() => {
                  uiStore.afterFlip()
                }, 800)
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
            {STORYBOOK || item[0] > 100 ? (
              <Bgm
                style={styles.bgm}
                index={item[0]}
                size={IOS ? 21 : 18}
                textOnly={false}
              />
            ) : (
              <BgmText index={item[0]} size={18} />
            )}
          </Flex>
        </Touchable>
      ))}
    </Flex>
  )
}

export default ob(Grid)
