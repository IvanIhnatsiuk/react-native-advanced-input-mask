#!/bin/bash

find ./ios -iname *.h -o -iname *.cpp -o -iname *.m -o -iname *.mm | grep -v -e Pods -e build | xargs clang-format -i -n --Werror