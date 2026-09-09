/*
 * @Author: czy0729
 * @Date: 2025-02-02 17:26:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 04:53:14
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Accordion, Flex, Mask, Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useBackHandler } from '@utils/hooks'
import AvatarPanel from './avatar-panel'
import { useMesumeChat } from './hooks'
import ToolBar from './tool-bar'
import { splitParagraphs } from './utils'
import { COMPONENT, MUSUME_CONFIG } from './ds'
import { memoStyles } from './styles'

import type { Props as MesumeChatProps } from './types'
export type { MesumeChatProps }

/** Bangumi 娘锐评框 */
export const MesumeChat = observer(
  ({
    show,
    value,
    time,
    placeholder = '思考中...',
    loading,
    onBefore,
    onNext,
    onRefresh,
    onClose
  }: MesumeChatProps) => {
    r(COMPONENT)

    const { musumePrompt, text, size, handleRefresh, handleSelect, handleCopy } = useMesumeChat({
      value,
      placeholder,
      onRefresh
    })

    const styles = memoStyles()

    /** 安卓退后: 展开时先收起, 收起后放行默认退后行为 */
    const handleBackAndroid = useCallback(() => {
      if (show) {
        onClose()
        return true
      }

      return false
    }, [onClose, show])
    useBackHandler(handleBackAndroid)

    return (
      <>
        <Mask show={show} style={styles.mask} linear onPress={onClose} />
        <View style={styles.container} pointerEvents='box-none'>
          <Accordion expand={show}>
            <AvatarPanel current={musumePrompt} onSelect={handleSelect}>
              <Flex.Item
                style={stl(styles.content, {
                  backgroundColor: MUSUME_CONFIG[musumePrompt].color
                })}
              >
                {splitParagraphs(text).map((item, index) => (
                  <Text
                    key={index}
                    style={!!index && (text.length >= 200 ? _.mt.sm : _.mt.md)}
                    type='__plain__'
                    size={size}
                    lineHeight={size + 1}
                    bold
                    shadow
                    onLongPress={handleCopy}
                  >
                    {item}
                  </Text>
                ))}
                <ToolBar
                  time={time}
                  loading={loading}
                  onBefore={onBefore}
                  onNext={onNext}
                  onRefresh={handleRefresh}
                />
              </Flex.Item>
            </AvatarPanel>
          </Accordion>
        </View>
      </>
    )
  }
)

export default MesumeChat
