# Define color variables
Red="\033[0;31m"
Green="\033[0;32m"
Blue="\033[0;34m"
NC="\033[0m" # No Color

# validate unused code before commit.
echo "\n${Blue}=================================${NC}\n"

echo "${Green}Start - Knipping of the code.${NC}"

pnpm knip:prod:check-files

echo "${Green}End - Knipping of the code.${NC}"

echo "\n${Blue}=================================${NC}\n"
