#!/bin/bash

yarn

echo
echo 'init process done. Ready for start up.'
echo

exec "$@"
