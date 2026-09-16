/*
 * @Author: czy0729
 * @Date: 2026-09-16 23:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 00:11:15
 */
import { fixAnitabiImageUrl } from '../utils'

/** 线上真实形态 (anitabi 接口返回的点位截图, query 分隔符被写成 &, 服务端直接 520) */
const RAW =
  'https://image.anitabi.cn/user/2195/bangumi/325767/points/ic8pcb6-1786932700805.webp&plan=h160'

describe('fixAnitabiImageUrl', () => {
  it('纠正缺失 query 分隔符的点位图片地址', () => {
    expect(fixAnitabiImageUrl(RAW)).toBe(
      'https://image.anitabi.cn/user/2195/bangumi/325767/points/ic8pcb6-1786932700805.webp?plan=h160'
    )

    // 查看大图用的 h360 形态同样被纠正
    expect(fixAnitabiImageUrl('https://h/x.webp&plan=h360')).toBe('https://h/x.webp?plan=h360')
  })

  it('多参数只改首个 &', () => {
    expect(fixAnitabiImageUrl('https://h/x.webp&plan=h160&v=2')).toBe(
      'https://h/x.webp?plan=h160&v=2'
    )
  })

  it('已含 ? 的合法地址不变', () => {
    expect(fixAnitabiImageUrl('https://image.anitabi.cn/points/1/a.jpg?plan=h160')).toBe(
      'https://image.anitabi.cn/points/1/a.jpg?plan=h160'
    )
    expect(fixAnitabiImageUrl('https://h/x.webp?a=1&b=2')).toBe('https://h/x.webp?a=1&b=2')
  })

  it('无 & 的地址不变', () => {
    expect(fixAnitabiImageUrl('https://lain.bgm.tv/pic/cover/l/x.jpg')).toBe(
      'https://lain.bgm.tv/pic/cover/l/x.jpg'
    )
    expect(fixAnitabiImageUrl('https://h/x.jpg')).toBe('https://h/x.jpg')
  })

  it('路径自带 & 的地址不误伤', () => {
    expect(fixAnitabiImageUrl('https://h/a&b/c.jpg')).toBe('https://h/a&b/c.jpg')

    // 只认紧跟在扩展名之后的 & : 扩展名后面还有路径段的不改
    expect(fixAnitabiImageUrl('https://h/x.jpg/thumb&plan=h160')).toBe(
      'https://h/x.jpg/thumb&plan=h160'
    )
  })

  it('扩展名不是已知图片类型时不动 (判据收紧)', () => {
    expect(fixAnitabiImageUrl('https://h/image&plan=h160')).toBe('https://h/image&plan=h160')
    expect(fixAnitabiImageUrl('https://h/x.svg&plan=h160')).toBe('https://h/x.svg&plan=h160')
  })

  it('路径自带 & 且扩展名后紧跟 & 时, 只改扩展名后的那个', () => {
    expect(fixAnitabiImageUrl('https://h/a&b/c.webp&plan=h160')).toBe(
      'https://h/a&b/c.webp?plan=h160'
    )
  })

  it('扩展名大小写不敏感', () => {
    expect(fixAnitabiImageUrl('https://h/x.JPG&plan=h160')).toBe('https://h/x.JPG?plan=h160')
  })

  it('幂等: 重复调用结果不变', () => {
    const once = fixAnitabiImageUrl(RAW)

    expect(fixAnitabiImageUrl(once)).toBe(once)
    expect(fixAnitabiImageUrl(fixAnitabiImageUrl(once))).toBe(once)
  })

  it('非字符串 / 空值原样返回', () => {
    expect(fixAnitabiImageUrl('')).toBe('')
    expect(fixAnitabiImageUrl(undefined)).toBeUndefined()
    expect(fixAnitabiImageUrl(null as unknown as string)).toBeNull()
    expect(fixAnitabiImageUrl(0 as unknown as string)).toBe(0)
  })
})
