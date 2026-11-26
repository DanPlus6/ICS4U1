set -euox pipefail

find . \
    -type d \( \
    -path './.git' -o \
    -path './node_modules' -o \
    -path './dist' -o \
    -path './build' \
    \) -prune \
    -o -type f \
    ! -name 'bun.lock' \
    ! -name 'package.json' \
    ! -name 'tsconfig.json' \
    ! -name 'tmp.sh' \
    -print0 |
xargs -0 -I {} sh -c '
    printf "\n==> %s <==\n" "$1"
    cat "$1"
    printf "\n"
' _ {} > /home/d/Downloads/files.txt
