# Define color variables
Red="\033[0;31m"
Green="\033[0;32m"
Blue="\033[0;34m"
NC="\033[0m" # No Color

# # build-storybook code before commit 
# echo "\n${Blue}=================================${NC}\n"

# echo "${Green}Start - Check storybook:build (Staging).${NC}"

# pnpm storybook:build

# echo "${Green}End - Check storybook:build (Staging).${NC}"

# echo "\n${Blue}=================================${NC}\n"

# # build-storybook:beta code before commit 
# echo "\n${Blue}=================================${NC}\n"

# echo "${Green}Start - Check storybook:build (Beta).${NC}"

# pnpm storybook:build:beta

# echo "${Green}End - Check storybook:build (Beta).${NC}"

# echo "\n${Blue}=================================${NC}\n"

# build-storybook:prod code before commit 
echo "\n${Blue}=================================${NC}\n"

echo "${Green}Start - Check storybook:build (Production).${NC}"

pnpm storybook:build:prod

echo "${Green}End - Check storybook:build (Production).${NC}"

echo "\n${Blue}=================================${NC}\n"
