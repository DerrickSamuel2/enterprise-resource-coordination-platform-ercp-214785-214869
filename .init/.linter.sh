#!/bin/bash
cd /home/kavia/workspace/code-generation/enterprise-resource-coordination-platform-ercp-214785-214869/ERCPMonolithicApplication
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

