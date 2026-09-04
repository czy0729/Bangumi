/*
 * @Author: czy0729
 * @Date: 2026-09-01 21:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 22:25:41
 */
import { parseCsv, toCsv } from '../index'

import type { CsvRecord } from '../index'

describe('parseCsv', () => {
  it('空字符串抛出异常', () => {
    expect(() => parseCsv('')).toThrow()
  })

  it('纯空白抛出异常', () => {
    expect(() => parseCsv(' \n ')).toThrow()
  })

  it('首行为表头, 数据行解析为对象数组', () => {
    expect(parseCsv('ID,封面\n1,a.jpg\n2,b.jpg')).toEqual([
      { ID: '1', 封面: 'a.jpg' },
      { ID: '2', 封面: 'b.jpg' }
    ])
  })

  it('剥离 BOM', () => {
    expect(parseCsv('\uFEFFID,中文\n1,a')).toEqual([{ ID: '1', 中文: 'a' }])
  })

  it('引号字段内的分隔符不切分', () => {
    expect(parseCsv('ID,我的简评\n1,"神作, 必玩"')).toEqual([{ ID: '1', 我的简评: '神作, 必玩' }])
  })

  it('引号字段内的换行不切分行', () => {
    expect(parseCsv('ID,我的简评\n1,"第一行\n第二行"')).toEqual([
      { ID: '1', 我的简评: '第一行\n第二行' }
    ])
  })

  it('引号内 "" 转义为单个引号', () => {
    expect(parseCsv('ID,我的简评\n1,"他说""好"""')).toEqual([{ ID: '1', 我的简评: '他说"好"' }])
  })

  it('兼容 CRLF 与 CR 行尾', () => {
    expect(parseCsv('ID,中文\r\n1,a\r\n2,b')).toHaveLength(2)
    expect(parseCsv('ID,中文\r1,a\r2,b')).toHaveLength(2)
  })

  it('自动检测分号分隔符', () => {
    expect(parseCsv('ID;封面\n1;a.jpg')).toEqual([{ ID: '1', 封面: 'a.jpg' }])
  })

  it('自动检测 tab 分隔符', () => {
    expect(parseCsv('ID\t封面\n1\ta.jpg')).toEqual([{ ID: '1', 封面: 'a.jpg' }])
  })

  it('缺列补空字符串', () => {
    expect(parseCsv('ID,中文\n1')).toEqual([{ ID: '1', 中文: '' }])
  })

  it('多余列忽略', () => {
    expect(parseCsv('ID\n1,x,y')).toEqual([{ ID: '1' }])
  })

  it('全空行跳过', () => {
    expect(parseCsv('ID,中文\n\n,,\n1,a\n')).toEqual([{ ID: '1', 中文: 'a' }])
  })

  it('单元格 trim', () => {
    expect(parseCsv('ID,中文\n 1 , a ')).toEqual([{ ID: '1', 中文: 'a' }])
  })

  it('首行全空抛出异常', () => {
    expect(() => parseCsv('\n1,a')).toThrow()
  })
})

describe('toCsv', () => {
  it('表头恒加引号', () => {
    expect(toCsv(['ID', '封面'], [])).toBe('"ID","封面"')
  })

  it('字符串值恒加引号且 " 转义为 ""', () => {
    expect(toCsv(['a'], [{ a: '他说"好"' }])).toBe('"a"\n"他说""好"""')
  })

  it('数字值不加引号', () => {
    expect(toCsv(['a'], [{ a: 8.5 }])).toBe('"a"\n8.5')
  })

  it('缺失键与 null 输出空', () => {
    expect(toCsv(['a', 'b'], [{ a: 'x' }])).toBe('"a","b"\n"x",')
    expect(toCsv(['a'], [{ a: null } as unknown as CsvRecord])).toBe('"a"\n')
  })

  it('行间 \\n 连接且无尾部换行', () => {
    expect(toCsv(['a'], [{ a: '1' }, { a: '2' }])).toBe('"a"\n"1"\n"2"')
  })
})

describe('parseCsv + toCsv round-trip', () => {
  it('导出后再导入还原数据 (数值转为字符串属预期)', () => {
    const heads = ['ID', '中文', '我的简评', '我的评价']
    const rows: CsvRecord[] = [
      { ID: '1', 中文: '命运石之门', 我的简评: '神作, 必玩', 我的评价: 10 },
      { ID: '2', 中文: '引号"测试"', 我的简评: '多行\n简评', 我的评价: 0 }
    ]

    expect(parseCsv(toCsv(heads, rows))).toEqual([
      { ID: '1', 中文: '命运石之门', 我的简评: '神作, 必玩', 我的评价: '10' },
      { ID: '2', 中文: '引号"测试"', 我的简评: '多行\n简评', 我的评价: '0' }
    ])
  })
})
