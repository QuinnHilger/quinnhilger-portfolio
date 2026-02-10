FROM node:22-bookworm

# Avoid prompts during install
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies, including the GitHub CLI (gh)
RUN apt-get update && apt-get install -y --no-install-recommends \
    tar coreutils wget procps ca-certificates git curl \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update && apt-get install gh -y \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /workspaces/quinnhilger-portfolio