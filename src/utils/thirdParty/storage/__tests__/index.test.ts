/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 01:46:01
 *
 * 自研 StorageModule JS 封装契约
 *  - saveImage: Data URL 解析 (含带参数形态) 与 MIME 提取, 参数到原生层的映射
 *  - saveDownload: 参数透传
 *  - 原生模块缺失 / 原生错误: 抛可辨识的错误
 */
import { NativeModules } from 'react-native'
import { saveDownload, saveImage } from '../index'

const URI = 'content://media/external/images/1'

let saveImageNative: jest.Mock
let saveDownloadNative: jest.Mock

beforeEach(() => {
  saveImageNative = jest.fn(async () => URI)
  saveDownloadNative = jest.fn(async () => '123_1690000000000.json')
  ;(NativeModules as any).StorageModule = {
    saveImage: saveImageNative,
    saveDownload: saveDownloadNative
  }
})

describe('saveImage', () => {
  it('Data URL: 剥离前缀并提取 MIME', async () => {
    const res = await saveImage('data:image/png;base64,AAAA')
    expect(res).toBe(URI)
    expect(saveImageNative).toHaveBeenCalledWith('AAAA', 'image/png')
  })

  it('带参数的 Data URL (charset): 正常解析', async () => {
    await saveImage('data:image/png;charset=utf-8;base64,AAAA')
    expect(saveImageNative).toHaveBeenCalledWith('AAAA', 'image/png')
  })

  it('jpeg Data URL: MIME 原样传递', async () => {
    await saveImage('data:image/jpeg;base64,BBBB')
    expect(saveImageNative).toHaveBeenCalledWith('BBBB', 'image/jpeg')
  })

  it('纯 base64: 默认按 jpeg 处理', async () => {
    await saveImage('CCCC')
    expect(saveImageNative).toHaveBeenCalledWith('CCCC', 'image/jpeg')
  })

  it('形似 Data URL 但缺少 base64 标记: 显式抛错', async () => {
    await expect(saveImage('data:image/png;charset=utf-8,AAAA')).rejects.toThrow(
      '无法解析图片 Data URL'
    )
    expect(saveImageNative).not.toHaveBeenCalled()
  })

  it('原生模块未注册: 抛可辨识错误', async () => {
    ;(NativeModules as any).StorageModule = undefined
    await expect(saveImage('CCCC')).rejects.toThrow('StorageModule 未注册')
  })

  it('原生错误向上透传', async () => {
    saveImageNative.mockRejectedValueOnce(new Error('boom'))
    await expect(saveImage('AAAA')).rejects.toThrow('boom')
  })
})

describe('saveDownload', () => {
  it('文件名与内容原样透传, 返回实际落盘文件名', async () => {
    const res = await saveDownload('123_1690000000000.json', '{}')
    expect(res).toBe('123_1690000000000.json')
    expect(saveDownloadNative).toHaveBeenCalledWith('123_1690000000000.json', '{}')
  })

  it('原生模块未注册: 抛可辨识错误', async () => {
    ;(NativeModules as any).StorageModule = undefined
    await expect(saveDownload('1.json', '{}')).rejects.toThrow('StorageModule 未注册')
  })

  it('原生错误向上透传', async () => {
    saveDownloadNative.mockRejectedValueOnce(new Error('full'))
    await expect(saveDownload('1.json', '{}')).rejects.toThrow('full')
  })
})
