#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  export husky_skip_init=1
  . "$(cd -- "$(dirname -- "$0")" && pwd)/_/husky.sh"
fi
