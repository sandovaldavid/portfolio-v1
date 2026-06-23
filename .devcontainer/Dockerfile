FROM mcr.microsoft.com/playwright:v1.61.0-noble

# OCI Labels for GitHub Packages integration
LABEL org.opencontainers.image.source="https://github.com/sandovaldavid/portfolio-v1"
LABEL org.opencontainers.image.description="Development container for Portfolio V1 with Playwright, Bun, Antigravity CLI, and Claude Code"
LABEL org.opencontainers.image.licenses="MIT"

# Prevent interactive prompts during package installations
ENV DEBIAN_FRONTEND=noninteractive

# Install sudo and basic utilities
USER root
RUN apt-get update && apt-get install -y \
    sudo \
    curl \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Allow the default non-root user (pwuser) to run sudo without password
RUN echo "pwuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Switch to the non-root user to install user-space tools
USER pwuser
WORKDIR /home/pwuser

# Add local bin directories to PATH
ENV PATH="/home/pwuser/.local/bin:/home/pwuser/.bun/bin:${PATH}"

# Install Bun (Project's primary package manager and runtime)
RUN curl -fsSL https://bun.sh/install | bash

# Install Antigravity CLI (agy)
RUN curl -fsSL https://antigravity.google/cli/install.sh | bash

# Install Claude Code CLI (claude)
RUN curl -fsSL https://claude.ai/install.sh | bash
