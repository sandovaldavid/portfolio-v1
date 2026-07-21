ARG PLAYWRIGHT_VERSION=1.61.1
FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble

ARG BUN_VERSION=1.3.14

LABEL org.opencontainers.image.source="https://github.com/sandovaldavid/portfolio-v1"
LABEL org.opencontainers.image.description="Reproducible development container for Portfolio V1"
LABEL org.opencontainers.image.licenses="MIT"

ENV DEBIAN_FRONTEND=noninteractive
ENV BUN_INSTALL=/home/pwuser/.bun
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

USER root
RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		bash-completion \
		ca-certificates \
		curl \
		git \
		less \
		openssh-client \
		sudo \
		unzip \
	&& rm -rf /var/lib/apt/lists/* \
	&& echo "pwuser ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/pwuser \
	&& chmod 0440 /etc/sudoers.d/pwuser

USER pwuser
WORKDIR /home/pwuser

RUN curl -fsSL https://bun.com/install | bash -s "bun-v${BUN_VERSION}" \
	&& test "$(bun --version)" = "${BUN_VERSION}"

WORKDIR /workspaces/portfolio-v1
