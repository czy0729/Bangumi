/*
 * @Author: czy0729
 * @Date: 2026-03-09 22:04:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { useCallback, useRef } from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Image, ScrollView, Squircle } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useMount } from '@utils/hooks'
import { applyProxy } from '@utils/proxy'
import { SETTING_LIVE2D_MODEL } from '@constants'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import commonStyles from '../../../styles'
import { IconLayers } from '../../icons'
import { ITEM_WIDTH } from './ds'
import { styles } from './styles'

import type { ScrollTo } from '@components'
import type { WithFilterProps } from '../../../types'

/** 看板娘 Live2D Model */
function Live2DModel({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('live2DModel')
  const scrollToRef = useRef<ScrollTo>(null)
  const handleForwardRef = useCallback((scrollTo: ScrollTo) => {
    scrollToRef.current = scrollTo
  }, [])

  useMount(() => {
    setTimeout(() => {
      if (value && typeof scrollToRef.current === 'function') {
        scrollToRef.current({
          x: SETTING_LIVE2D_MODEL.findIndex(item => item.value === value) * ITEM_WIDTH,
          y: 0,
          animated: false
        })
      }
    }, 0)
  })

  return (
    <ItemSettingBlock
      style={styles.block}
      icon={<IconLayers />}
      filter={filter}
      sub
      subStyle={commonStyles.sub}
      {...TEXTS.live2DModel.setting}
    >
      <ScrollView
        forwardRef={handleForwardRef}
        contentContainerStyle={styles.scroll}
        horizontal
        maskColors={_.select(_.colorPlainRaw, _._colorDarkModeLevel1Raw)}
      >
        {SETTING_LIVE2D_MODEL.map((item, index) => {
          const { title, information, src } = TEXTS.live2DModel[item.value]

          // 主站静态图需走代理, isHtml=true 让 worker 的 x-upstream 指向 bgm.tv
          const { url, headers } = applyProxy(src, {}, true)

          return (
            <ItemSettingBlock.Item
              key={item.value}
              style={index ? _.ml.md : undefined}
              itemStyle={styles.item}
              title={title}
              titleSize={12}
              information={information}
              active={item.value === value}
              filter={filter}
              onPress={() => {
                if (item.value === value) return

                handleSet(item.value)

                t('设置.切换', {
                  title: 'Live2D Model',
                  label: item.label
                })
              }}
              {...TEXTS.live2DModel[item.value]}
            >
              <Flex style={_.mt.sm}>
                <Squircle width={44} height={44} radius={_.radiusSm}>
                  <Image size={44} src={url} headers={headers} radius={0} />
                </Squircle>
              </Flex>
            </ItemSettingBlock.Item>
          )
        })}
      </ScrollView>

      <Heatmap id='设置.切换' title='Live2D Model' />
    </ItemSettingBlock>
  )
}

export default observer(Live2DModel)
