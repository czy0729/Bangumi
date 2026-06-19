#!/bin/bash
#
# 字体子集化脚本
# 使用 pyftsubset (fonttools) 将 Resource Han Rounded CN 字体裁剪为仅包含常用字形的精简版。
#
# 用法:
#   cd web/fontmin
#   bash subset.sh
#
# 前置依赖:
#   brew install fonttools
#
# 产出:
#   src/assets/fonts/ResourceHanRoundedCN-Bold.min.ttf
#   src/assets/fonts/ResourceHanRoundedCN-Medium.min.ttf

set -euo pipefail
cd "$(dirname "$0")"

PROJECT_ROOT="$(cd ../.. && pwd)"
FONT_DIR="$PROJECT_ROOT/src/assets/fonts"
OUT_DIR="$FONT_DIR"

# ── Step 1: 生成常用字表 ──────────────────────────────────────────────
echo "=== Step 1: 生成常用字表 ==="

if [ ! -f common-chars.txt ]; then
    echo "生成 common-chars.txt ..."
    python3 gen-common-chars.py
fi

echo "扫描源码字符 ..."
python3 scan-chars.py

# 合并两份字表，去重
echo "合并字表 ..."
python3 -c "
import sys

chars = set()

# 读取常用字表
with open('common-chars.txt', 'r', encoding='utf-8') as f:
    for ch in f.read():
        chars.add(ch)

# 读取源码字符
with open('chars-from-source.txt', 'r', encoding='utf-8') as f:
    for ch in f.read():
        chars.add(ch)

sorted_chars = sorted(chars, key=lambda c: ord(c))
with open('all-chars.txt', 'w', encoding='utf-8') as f:
    f.write(''.join(sorted_chars))

cjk = sum(1 for c in sorted_chars if 0x4E00 <= ord(c) <= 0x9FFF)
print(f'合并后总字符: {len(sorted_chars)} (CJK: {cjk})')
"

# ── Step 2: 使用 pyftsubset 裁剪字体 ──────────────────────────────────
echo ""
echo "=== Step 2: 裁剪字体 ==="

for WEIGHT in Bold Medium; do
    SRC="$FONT_DIR/ResourceHanRoundedCN-${WEIGHT}.ttf"
    DST="$OUT_DIR/ResourceHanRoundedCN-${WEIGHT}.min.ttf"

    if [ ! -f "$SRC" ]; then
        echo "⚠ 源文件不存在: $SRC, 跳过"
        continue
    fi

    echo "裁剪 ${WEIGHT} ..."
    echo "  源文件: $SRC ($(du -h "$SRC" | cut -f1))"

    pyftsubset "$SRC" \
        --text-file=all-chars.txt \
        --output-file="$DST" \
        --layout-features='*' \
        --name-IDs='*' \
        --notdef-outline \
        --recommended-glyphs \
        --passthrough-tables

    echo "  输出: $DST ($(du -h "$DST" | cut -f1))"
    echo ""
done

# ── Step 3: 汇总 ─────────────────────────────────────────────────────
echo "=== 完成 ==="
echo ""
echo "文件大小对比:"
for WEIGHT in Bold Medium; do
    SRC="$FONT_DIR/ResourceHanRoundedCN-${WEIGHT}.ttf"
    DST="$OUT_DIR/ResourceHanRoundedCN-${WEIGHT}.min.ttf"
    if [ -f "$SRC" ] && [ -f "$DST" ]; then
        SRC_SIZE=$(stat -f%z "$SRC")
        DST_SIZE=$(stat -f%z "$DST")
        RATIO=$(python3 -c "print(f'{100 - $DST_SIZE / $SRC_SIZE * 100:.1f}%')")
        echo "  ${WEIGHT}: $(numfmt --to=iec $SRC_SIZE) -> $(numfmt --to=iec $DST_SIZE) (缩减 ${RATIO})"
    fi
done
echo ""
echo "精简字体位于: $OUT_DIR/"
echo "如需替换原文件，运行:"
echo "  mv $OUT_DIR/ResourceHanRoundedCN-Bold.min.ttf $OUT_DIR/ResourceHanRoundedCN-Bold.ttf"
echo "  mv $OUT_DIR/ResourceHanRoundedCN-Medium.min.ttf $OUT_DIR/ResourceHanRoundedCN-Medium.ttf"
