#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" != docs/* ]] ; then
  echo "✅ - Build can proceed"
  exit 1;
else
  echo "🛑 - Build cancelled"
  exit 0;
fi
