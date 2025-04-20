include $(PATH_TO_ROOT)/.config.mk

MYSQL_ROOT_PASSWORD=rootpw
MYSQL_PASSWORD=userpw
MYSQ_DATABASE=tiny_issue_tracker

# DATABASE_URL is built in docker-compose.yml from the above variables

# These are load from .env file
# GOOGLE_CLIENT_ID=foo
# GOOGLE_CLIENT_SECRET=bar
