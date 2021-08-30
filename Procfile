web: printf $DEFAULT_YML >> .config/default.yml && cat .config/default.yml && dd if=/dev/zero of=/swap bs=1G count=4 && mkswap /swap && swapon /swap && npm migrate && NODE_ENV=production npm start
