#!/usr/bin/env bash

if [ "$1" == "start" ]; then
	echo "They sent start, so let's go"
fi

echo "It works"
(>&2 echo "We've got an error here")