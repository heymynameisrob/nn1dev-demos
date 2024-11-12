#!/bin/bash

# Exit on error
set -e

if [ -z "$POSTGRES_URL" ]; then
    echo "Error: POSTGRES_URL environment variable is not set"
    exit 1
fi

echo "Warning: This will delete all data in the public schema"
echo "Press Ctrl+C to cancel or ENTER to continue"
read

# Extract the database name from POSTGRES_URL
# This handles both formats:
# postgresql://user:pass@host:port/dbname
# postgres://user:pass@host:port/dbname
DB_NAME=$(echo $POSTGRES_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')

echo "Dropping and recreating schema for database: $DB_NAME"

# Run the SQL commands
psql $POSTGRES_URL << EOF
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO public;
EOF

echo "Schema has been reset successfully"
