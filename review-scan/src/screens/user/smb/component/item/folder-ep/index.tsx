/*
 * @Author: czy0729
 * @Date: 2023-11-19 11:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:24:20
 */
import React, { useState } from 'react'
import { Linking } from 'react-native'
import { Button, Flex, Text, Touchable } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { copy, desc } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { Ctx, SMBListItem } from '../../../types'
import { SORT_ORDER } from '../ds'
import { fixedUrl } from '../../../utils'
import LastModified from '../last-modified'
import { getEp } from './utils'
import {
  ACTION_COPY_LINK,
  ACTION_COPY_PATH,
  ACTION_DDPLAY,
  ACTION_LINKING,
  ACTION_MPV,
  ACTION_OPEN_DIRECTORY,
  ACTION_POTPLAYER,
  ACTION_VLC,
  EPS_TYPE_COUNT,
  URL_TEMPLATES
} from './ds'
import { styles } from './styles'

function FolderEp({ folder }: { folder: SMBListItem }) {
  const { $ } = useStore<Ctx>()
  const [filter, setFilter] = useState('')

  return useObserver(() => {
    const { name, lastModified, list: folderList } = folder
    const list = folderList
      .filter(item => item.type === 'video')
      .sort((a, b) => {
        const typeA = SORT_ORDER[a.type] || 0
        const typeB = SORT_ORDER[b.type] || 0
        if (typeA === typeB) return desc(a.name, b.name)
        return desc(SORT_ORDER[a.type] || 0, SORT_ORDER[b.type] || 0)
      })

    const { configs } = $.state
    const actions = [ACTION_COPY_PATH]
    if (configs.showDDPlay) actions.push(ACTION_DDPLAY)
    if (configs.showPotPlayer) actions.push(ACTION_POTPLAYER)
    if (configs.showVLC) actions.push(ACTION_VLC)
    if (configs.showMPV) actions.push(ACTION_MPV)

    const { sharedFolder, url } = $.current.smb
    if (url) actions.unshift(ACTION_LINKING, ACTION_COPY_LINK)

    const epsRepeat = {}
    const epsType = {
      ...EPS_TYPE_COUNT
    }

    return (
      <>
        <Flex style={styles.btns} wrap='wrap'>
          {list.length ? (
            list.map((item, index) => {
              const [ep, type] = getEp(item.name)
              let epText = ep === null ? `[${index}]` : ep
              if (type) epText = ep === null ? type : `${type}\n${epText}`
              if (type) {
                epsType[type in epsType ? type : 'other'] += 1
              } else {
                epsType.ep += 1
              }

              const btnType = epsRepeat[epText] ? 'disabled' : 'ghostPlain'
              epsRepeat[epText] = true
              if (
                !filter ||
                filter === type ||
                (filter === 'ep' && !type) ||
                (filter === 'other' && type && !(type in epsType))
              ) {
                return (
                  <Popover
                    key={item.name}
                    // @ts-expect-error
                    title={[item.size ? `${item.name} (${item.size})` : item.name]}
                    data={actions}
                    onSelect={title => {
                      t('SMB.章节菜单', {
                        title
                      })

                      if (title === ACTION_LINKING) {
                        Linking.openURL($.url(sharedFolder, folder.path, name, item.name))
                        return
                      }

                      if (title === ACTION_COPY_LINK) {
                        copy($.url(sharedFolder, folder.path, name, item.name), '已复制路径')
                        return
                      }

                      // browser not allowed
                      if (title === ACTION_OPEN_DIRECTORY) {
                        window.open(
                          fixedUrl([sharedFolder, folder.path, name].filter(item => item).join('/'))
                        )
                        return
                      }

                      if (title === ACTION_COPY_PATH) {
                        copy(
                          fixedUrl(
                            [sharedFolder, folder.path, name, item.name]
                              .filter(item => item)
                              .join('/')
                          ),
                          '已复制路径'
                        )
                        return
                      }

                      if (Object.keys(URL_TEMPLATES).includes(title)) {
                        Linking.openURL(
                          $.url(sharedFolder, folder.path, name, item.name, URL_TEMPLATES[title])
                        )
                        return
                      }
                    }}
                  >
                    <Button
                      style={styles.btn}
                      styleText={styles.btnText}
                      type={btnType}
                      size='sm'
                      noWrap={false}
                    >
                      {epText}
                    </Button>
                  </Popover>
                )
              }

              return null
            })
          ) : (
            <Text size={11} lineHeight={12}>
              (空)
            </Text>
          )}
        </Flex>
        <Flex style={_.mt.sm}>
          <Flex.Item>
            <Flex>
              {Object.entries(epsType)
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <Touchable
                    key={key}
                    style={_.mr.xs}
                    onPress={() => {
                      setFilter(filter === key ? '' : key)
                    }}
                  >
                    <Text size={12} type={filter && filter === key ? 'desc' : 'icon'}>
                      [{key}*{value}]
                    </Text>
                  </Touchable>
                ))}
            </Flex>
          </Flex.Item>
          <Touchable
            style={_.mr.xs}
            onPress={() => {
              $.onFile(name)
            }}
          >
            <Text size={12} type='icon'>
              [视频]
            </Text>
          </Touchable>
          <LastModified value={lastModified} />
        </Flex>
      </>
    )
  })
}

export default FolderEp
