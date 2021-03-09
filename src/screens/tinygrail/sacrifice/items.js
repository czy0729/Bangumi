/*
 * @Author: czy0729
 * @Date: 2021-03-08 21:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 21:48:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Image, Touchable } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'

const OSS = 'https://tinygrail.oss-cn-hangzhou.aliyuncs.com/image'

function Items({ style }, { $ }) {
  const styles = memoStyles()
  const { showAuction } = $.state
  return (
    <View style={[styles.container, style]} wrap='wrap'>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailPlain' size={13}>
            道具
          </Text>
        </Flex.Item>
        <IconTouchable
          style={[_.ml.sm, _.mr._sm]}
          name={showAuction ? 'down' : 'up'}
          color={_.colorTinygrailText}
          onPress={$.toggleAuction}
        />
      </Flex>
      <View style={_.mt.sm}>
        <Touchable>
          <Flex>
            <Image size={28} radius src={tinygrailOSS(`${OSS}/cube.png`)} />
            <Text style={_.ml.sm} type='tinygrailPlain' size={12} bold>
              混沌魔方
            </Text>
          </Flex>
        </Touchable>
        <Touchable style={_.mt.md}>
          <Flex>
            <Image size={28} radius src={tinygrailOSS(`${OSS}/sign.png`)} />
            <Text style={_.ml.sm} type='tinygrailPlain' size={12} bold>
              虚空道标
            </Text>
          </Flex>
        </Touchable>
        <Touchable style={_.mt.md}>
          <Flex>
            <Image size={28} radius src={tinygrailOSS(`${OSS}/star.png`)} />
            <Text style={_.ml.sm} type='tinygrailPlain' size={12} bold>
              星光碎片
            </Text>
          </Flex>
        </Touchable>
        <Touchable style={_.mt.md}>
          <Flex>
            <Image size={28} radius src={tinygrailOSS(`${OSS}/fire.png`)} />
            <Text style={_.ml.sm} type='tinygrailPlain' size={12} bold>
              闪光结晶
            </Text>
          </Flex>
        </Touchable>
      </View>
    </View>
  )
}

export default obc(Items)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.md,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailBg
  }
}))
