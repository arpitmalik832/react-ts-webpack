# Define color variables
Red="\033[0;31m"
Green="\033[0;32m"
Blue="\033[0;34m"
NC="\033[0m" # No Color

# test code before commit.
echo "\n${Blue}=================================${NC}\n"

echo "${Green}Start - Unit testing.${NC}"

pnpm test:coverage:silent:quick

echo "${Green}End - Unit testing.${NC}"

echo "\n${Blue}=================================${NC}\n"