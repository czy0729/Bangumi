/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 16:32:49
 */
import React from 'react'
import { Flex, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { EVENT } from '@constants'
import Icon from '../icon'
import Auction from './auction'
import Control from './control'
import Detail from './detail'
import Title from './title'
import { getOnPress } from './utils'
import { memoStyles } from './styles'
import { Ctx } from './types'

function Item(props) {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { style, id, monoId, event = EVENT, type, end, withoutFeedback = false } = props
    const handlePress = () => {
      if (!!end) {
        // ICO 不受复写 go 参数影响跳转
        t(event.id, {
          to: 'TinygrailICODeal',
          monoId: monoId || id,
          ...event.data
        })

        navigation.push('TinygrailICODeal', {
          monoId: `character/${monoId || id}`
        })
        return
      }

      const go = props.go || $.state.go
      const idValue = type === 'auction' || type === 'valhall' ? monoId || id : id
      if (go) {
        getOnPress(idValue, go, navigation, event.id, event.data, props)()
        return
      }

      t(event.id, {
        to: 'TinygrailDeal',
        monoId: idValue,
        ...event.data
      })

      navigation.push('TinygrailDeal', {
        monoId: `character/${idValue}`
      })
    }

    return (
      <Flex style={stl(styles.container, style)} align='start'>
        <Icon key={props.id} {...props} style={_.mt.md} />
        <Flex.Item>
          <Flex align='start'>
            <Flex.Item style={_.mr.sm}>
              <Touchable
                style={styles.item}
                withoutFeedback={withoutFeedback}
                onPress={handlePress}
              >
                <Flex align='start'>
                  <Flex.Item>
                    <Title {...props} />
                    <Detail {...props} />
                  </Flex.Item>
                  {type === 'auction' && <Auction {...props} />}
                </Flex>
              </Touchable>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Control {...props} />
      </Flex>
    )
  })
}

export default Item
