# Define color variables
Red="\033[0;31m"
Green="\033[0;32m"
Blue="\033[0;34m"
NC="\033[0m" # No Color

# validate code before commit.
echo "\n${Blue}=================================${NC}\n"

echo "${Green}Start - Linting of the code.${NC}"

pnpm lint:fix
# Adding changes made by lint-fix
git add .

echo "${Green}End - Linting of the code.${NC}"

echo "\n${Blue}=================================${NC}\n"