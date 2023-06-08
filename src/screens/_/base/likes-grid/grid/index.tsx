/*
 * @Author: czy0729
 * @Date: 2023-04-05 15:18:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-09 01:02:13
 */
import React from 'react'
import { Flex, Bgm, BgmText, Touchable } from '@components'
import { rakuenStore, uiStore } from '@stores'
import { t } from '@utils/fetch'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { IOS, STORYBOOK } from '@constants'
import { DATA, HIT_SLOP } from './ds'
import { styles } from './styles'

function Grid({ data = DATA, value, topicId, floorId, formhash, likeType }) {
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
