#!make
PROJECT ?= $(shell node -p "require('./package.json').name")
NVM = v0.38.0
NODE ?= $(shell cat $(PWD)/.nvmrc 2> /dev/null || echo v16.15.0)

.PHONY: help all build install nvm test lint lint-autofix typecheck release git-hooks

default: help

# show this help
help:
	@echo 'usage: make [target] ...'
	@echo ''
	@echo 'targets:'
	@grep -E '^[a-z.A-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run: ## NPM install
	. $(NVM_DIR)/nvm.sh && nvm use $(NODE) && $(CMD)

all: 
	make install
	make run CMD="npm install"

install: ## Install node version
	. $(NVM_DIR)/nvm.sh && nvm install $(NODE)
	make run CMD="npm i"

build: ## Compile typescript
	make run CMD="npm run build"

test: ## Run tests
	make run CMD="npm test"

lint: ## Run linter
	make run CMD="npm run lint"

lint-autofix: ## Run linter autofix
	make run CMD="npm run lint:fix"

typecheck: ## Run typecheck
	make run CMD="npm run typecheck"

release: ## Make a release (git tag)
	make run CMD="npm run release"

git-hooks: ## Install git hooks
	make run CMD="npx simple-git-hooks"

nvm: ## Install nvm: restart your terminal after nvm install
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM}/install.sh | bash
