#!/usr/bin/env bash

set -euo pipefail

source_dir="${1:-.resume-assets/public/resume}"
target_dir="${2:-public/resume}"

required_files=(
  david-sandoval-resume.pdf
  david-sandoval-resume-es.pdf
  manifest.json
)

for file in "${required_files[@]}"; do
  test -f "${source_dir}/${file}"
done

rm -rf "$target_dir"
mkdir -p "$target_dir"

for file in "${required_files[@]}"; do
  cp "${source_dir}/${file}" "${target_dir}/${file}"
done

test "$(head -c 5 "${target_dir}/david-sandoval-resume.pdf")" = "%PDF-"
test "$(head -c 5 "${target_dir}/david-sandoval-resume-es.pdf")" = "%PDF-"

node -e "JSON.parse(require('node:fs').readFileSync(process.argv[1], 'utf8'))" "${target_dir}/manifest.json"

echo "Installed and validated resume assets in ${target_dir}."
