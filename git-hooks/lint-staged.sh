# Define color variables
Red="\033[0;31m"
Green="\033[0;32m"
Blue="\033[0;34m"
NC="\033[0m" # No Color

# validate staged code before commit.
echo "\n${Blue}=================================${NC}\n"

echo "${Green}Start - lint-staged of the code.${NC}"

pnpm lint-staged
# Adding changes made by lint-staged
git add .

echo "${Green}End - lint-staged of the code.${NC}"

echo "\n${Blue}=================================${NC}\n"