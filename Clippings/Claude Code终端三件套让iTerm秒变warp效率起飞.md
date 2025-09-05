---
title: "Claude Code终端三件套，让iTerm秒变warp，效率起飞"
source: "https://mp.weixin.qq.com/s/5Ski9vzbWDD09XoBLNOjmg"
author:
  - "[[知识药丸]]"
published:
created: 2025-09-05
description: "三个命令让Claude Code变成智能终端，省下每月15刀的warp订阅钱"
tags:
  - "终端脚本"
  - "AI辅助"
  - "开发效率"
abstract: "介绍三个使用Claude Code SDK创建的实用脚本工具，帮助开发者在终端中更高效地工作。"
---
Original 知识药丸 *2025年07月30日 11:43*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/hM5HtkzgLYZwUibiahQSf2omoBbRH1dFewNmjbHGU1DLHA29ia1s14DmwPwHS6Hx8ib2WXpb1icjLJV2TSAk3acXYuw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

---

  

One of my favorite ways to use the Claude Code SDK is to create little helper scripts to use Claude in more places. Here are the three that I use most: claude-bash, claude-commit and claude-grep  
  

我使用 Claude Code SDK 最喜欢的方式之一是创建一些小辅助脚本来在更多地方使用 Claude。

以下是我最常用的三个脚本： claude-bash, claude-commit 和 claude-grep

  

claude-bash: helps me remember bash commands (e.g. I always forget how to reset a file in git) It turns any terminal into an AI powered one.

  

claude-bash：帮助我记住 bash 命令（例如，我总是忘记如何在 git 中重置文件） 它将任何终端变成一个由人工智能驱动的终端。

  

claude-bash.sh

```bash
#!/bin/bash# Check if a request was providedif [ $# -eq 0 ]; then    echo "Usage: $0 <request>"    echo "Example: $0 'can you help me stash the git ignore that I'm not using'"    exit 1fi# Combine all arguments into a single request stringREQUEST="$*"# Call Claude to get a bash command suggestionecho "🤔 Asking Claude for a command suggestion..."echo ""# Use Claude to get the command, asking specifically for just the commandCLAUDE_OUTPUT=$(claude -p "The user wants to: $REQUESTPlease provide ONLY the bash command that would accomplish this task. Do not include any explanation, markdown formatting, or additional text. Just output the raw command.")# Extract the command (remove any leading/trailing whitespace)SUGGESTED_CMD=$(echo "$CLAUDE_OUTPUT" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')# Check if we got a commandif [ -z "$SUGGESTED_CMD" ]; then    echo "❌ Claude didn't provide a command suggestion."    exit 1fi# Display the suggested commandecho "📋 Suggested command:"echo ""echo "  $SUGGESTED_CMD"echo ""# Ask user for confirmationread -p "Execute this command? (y/n): " -n 1 -recho ""if [[ $REPLY =~ ^[Yy]$ ]]; then    echo ""    echo "▶️  Executing command..."    echo "─────────────────────────────────────────"    eval "$SUGGESTED_CMD"    EXIT_CODE=$?    echo "─────────────────────────────────────────"    echo "✅ Command completed with exit code: $EXIT_CODE"else    echo ""    echo "❌ Command not executed."fi
```

claude-commit: writes up commit messages for me based on my unstaged changes, saves me from every commit being "fixed this"

  

claude-commit: 根据我的未暂存更改自动生成提交信息，让我不必每次提交都写上"修复这个"

  

claude-commit.sh

```bash
#!/bin/bash# Function to show usageshow_usage() {    echo "Usage: commit-helper [OPTIONS]"    echo ""    echo "Intelligently stage changes and create commits with AI-generated messages"    echo ""    echo "Options:"    echo "  -a, --all          Stage all changes (including untracked files)"    echo "  -p, --push         Push to remote after committing"    echo "  -d, --dry-run      Show what would be committed without actually committing"    echo "  -h, --help         Show this help message"    echo ""    echo "Examples:"    echo "  commit-helper                  # Stage modified files and commit"    echo "  commit-helper --all            # Stage all changes including new files"    echo "  commit-helper --all --push     # Stage all, commit, and push"}# Default valuesSTAGE_ALL=falsePUSH_AFTER=falseDRY_RUN=false# Parse command line argumentswhile [[ $# -gt 0 ]]; do    case $1 in        -a|--all)            STAGE_ALL=true            shift            ;;        -p|--push)            PUSH_AFTER=true            shift            ;;        -d|--dry-run)            DRY_RUN=true            shift            ;;        -h|--help)            show_usage            exit 0            ;;        *)            echo "Unknown option: $1"            show_usage            exit 1            ;;    esacdone# Check if we're in a git repositoryif ! git rev-parse --git-dir > /dev/null 2>&1; then    echo "❌ Error: Not in a git repository"    exit 1fi# Get current statusecho "📊 Checking git status..."STATUS=$(git status --porcelain)if [ -z "$STATUS" ]; then    echo "✨ Working directory is clean - nothing to commit"    exit 0fi# Show current changesecho ""echo "📝 Current changes:"echo "─────────────────────────────────────────"git status --shortecho "─────────────────────────────────────────"echo ""# Stage files based on optionsif [ "$STAGE_ALL" = true ]; then    echo "📦 Staging all changes..."    git add -Aelse    # Stage only modified and deleted files (not untracked)    echo "📦 Staging modified and deleted files..."    git add -ufi# Get the diff of staged changesSTAGED_DIFF=$(git diff --cached)if [ -z "$STAGED_DIFF" ]; then    echo "⚠️  No changes staged for commit"    echo ""    echo "Unstaged files:"    git ls-files --others --exclude-standard    echo ""    echo "💡 Tip: Use --all flag to include untracked files"    exit 1fi# Show what will be committedecho "📋 Changes to be committed:"echo "─────────────────────────────────────────"git diff --cached --statecho "─────────────────────────────────────────"echo ""# Generate commit message using Claudeecho "🤖 Generating commit message with Claude..."echo ""COMMIT_MSG=$(claude -p "Based on these git changes, write a concise commit message following conventional commit format (feat:, fix:, docs:, style:, refactor:, test:, chore:).The message should:- Start with the appropriate type prefix- Be clear and descriptive- Be under 72 characters- Focus on WHAT changed and WHY, not HOWOutput ONLY the commit message, no explanations or formatting.Git diff:$STAGED_DIFF")# Check if we got a commit messageif [ -z "$COMMIT_MSG" ]; then    echo "❌ Failed to generate commit message"    exit 1fi# Display the generated messageecho "💬 Generated commit message:"echo ""echo "  $COMMIT_MSG"echo ""# If dry run, stop hereif [ "$DRY_RUN" = true ]; then    echo "🔍 Dry run complete - no changes made"    exit 0fi# Ask for confirmationread -p "Create commit with this message? (y/n/e to edit): " -n 1 -r REPLYecho ""if [[ $REPLY =~ ^[Ee]$ ]]; then    # Edit the message    echo ""    echo "✏️  Enter your commit message (press Enter when done):"    read -r EDITED_MSG    if [ -n "$EDITED_MSG" ]; then        COMMIT_MSG="$EDITED_MSG"    fi    echo ""    # Ask again after editing    read -p "Create commit with message: '$COMMIT_MSG'? (y/n): " -n 1 -r REPLY    echo ""fiif [[ $REPLY =~ ^[Yy]$ ]]; then    echo ""    echo "📝 Creating commit..."    git commit -m "$COMMIT_MSG"
    if [ $? -eq 0 ]; then        echo "✅ Commit created successfully!"
        # Push if requested        if [ "$PUSH_AFTER" = true ]; then            echo ""            echo "🚀 Pushing to remote..."            git push            if [ $? -eq 0 ]; then                echo "✅ Pushed successfully!"            else                echo "❌ Push failed"                exit 1            fi        fi    else        echo "❌ Commit failed"        exit 1    fielse    echo ""    echo "❌ Commit cancelled"    # Unstage the files we staged    git reset HEAD > /dev/null 2>&1    echo "🔄 Changes have been unstaged"fi
```

claude-grep: grep but it uses Claude to filter and find things for me, you can use it to search or with a pipe.

  

claude-grep: 类似 grep，但使用 Claude 来过滤和查找内容，可以用于搜索或通过管道使用。

  

**claude-grep.sh**

```bash
#!/bin/bash# Default valuesCONTEXT_LINES=0OUTPUT_FORMAT="matches"# Function to show usageshow_usage() {    echo "Usage: claude-grep [OPTIONS] <query>"    echo "       <command> | claude-grep [OPTIONS] <query>"    echo ""    echo "Semantic search using Claude AI"    echo ""    echo "Options:"    echo "  -c, --context N    Show N lines of context around matches"    echo "  -f, --format FMT   Output format: matches (default), summary, explain"    echo "  -h, --help         Show this help message"    echo ""    echo "Examples:"    echo "  claude-grep 'functions that handle authentication'"    echo "  git diff | claude-grep 'potential bugs'"    echo "  cat error.log | claude-grep 'what caused this error?'"    echo "  grep -r 'TODO' . | claude-grep 'which ones are critical?'"}# Parse command line argumentswhile [[ $# -gt 0 ]]; do    case $1 in        -c|--context)            CONTEXT_LINES="$2"            shift 2            ;;        -f|--format)            OUTPUT_FORMAT="$2"            shift 2            ;;        -h|--help)            show_usage            exit 0            ;;        -*)            echo "Unknown option: $1"            show_usage            exit 1            ;;        *)            QUERY="$*"            break            ;;    esacdone# Check if query was providedif [ -z "$QUERY" ]; then    echo "Error: No search query provided"    show_usage    exit 1fi# Read input (either from pipe or files)if [ -t 0 ]; then    # No pipe input - search current directory    echo "🔍 Searching current directory for: $QUERY"    INPUT=$(find . -type f -name "*.txt" -o -name "*.md" -o -name "*.js" -o -name "*.py" -o -name "*.sh" -o -name "*.go" -o -name "*.java" -o -name "*.cpp" -o -name "*.c" -o -name "*.h" -o -name "*.rs" -o -name "*.rb" -o -name "*.php" -o -name "*.ts" -o -name "*.tsx" -o -name "*.jsx" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" | head -50 | xargs grep -n . 2>/dev/null | head -1000)else    # Read from pipe    INPUT=$(cat)fi# Check if we have any inputif [ -z "$INPUT" ]; then    echo "No input to search"    exit 1fi# Prepare the prompt based on formatcase $OUTPUT_FORMAT in    summary)        PROMPT="Analyze this content and answer the query: '$QUERY'Provide a concise summary of your findings.Content to analyze:$INPUT"        ;;    explain)        PROMPT="Analyze this content and answer the query: '$QUERY'Provide a detailed explanation of what you found and why it's relevant.Content to analyze:$INPUT"        ;;    *)  # matches (default)        PROMPT="Search through this content for: '$QUERY'Instructions:- Find lines/sections that match the semantic meaning of the query- Output ONLY the relevant matches, one per line- Include line numbers if present in the input- If context was requested (${CONTEXT_LINES} lines), include surrounding context- Be selective - only show truly relevant matches- Preserve the original formatting of matched linesContent to search:$INPUT"        ;;esac# Call Claudeecho "🤖 Analyzing with Claude..."echo ""CLAUDE_OUTPUT=$(claude -p "$PROMPT")# Display resultsif [ -z "$CLAUDE_OUTPUT" ]; then    echo "❌ No matches found"    exit 1else    echo "$CLAUDE_OUTPUT"fi
```

Remember to add these to your PATH to make them quickly accessible!  
  

记得将这些添加到你的 PATH 中，以便快速访问！

  

---

  

坚持创作不易，求个一键三连，谢谢你～ ❤️

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

写的不错，加个鸡腿🍗

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

知识药丸

向上滑动看下一个