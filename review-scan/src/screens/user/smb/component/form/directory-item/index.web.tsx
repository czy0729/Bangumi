/*
 * @Author: czy0729
 * @Date: 2023-11-15 22:18:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:21:03
 */
import React, { useRef, useState } from 'react'
import { Button, Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { transformData } from '../../../utils/directory'
import { loadJAData } from '../../../utils/load-data'
import { styles } from './styles'

const DirectoryItem = () => {
  const { $ } = useStore<Ctx>()
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [num, setNum] = useState(0)

  const handleButtonClick = () => {
    inputRef.current.click()
    setUploading(true)
  }

  const handleFileChange = async () => {
    const files = inputRef.current.files
    if (files.length > 0) {
      await loadJAData()
      readFiles(files)
    }
    setUploading(false)
  }

  const folders = []
  const readFiles = (files: any[]) => {
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i]
      folders.push({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath
      })
    }

    const { autoJA } = $.state
    $.memoDirectory = transformData(folders, autoJA, $.extendsJA)
    setNum(files.length)
  }

  return (
    <Flex style={_.mt.sm}>
      <Text style={styles.label} size={12} lineHeight={13}>
        选择
      </Text>
      <Flex.Item>
        <input
          ref={inputRef}
          style={styles.input}
          type='file'
          id='folderInput'
          // @ts-ignore
          webkitdirectory='true'
          directory='true'
          multiple
          onChange={handleFileChange}
        />
        <Flex>
          <Button
            style={styles.btn}
            styleText={_.fontSize12}
            type='ghostPlain'
            onPress={handleButtonClick}
          >
            选择文件夹
          </Button>
          <Flex.Item style={_.ml.sm}>
            {num || !uploading ? (
              <Text size={12} type='sub'>
                已读取 {num} 个文件
              </Text>
            ) : (
              <Text size={12} type='warning'>
                读取文件夹结构中，请等待
              </Text>
            )}
          </Flex.Item>
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

export default ob(DirectoryItem)
