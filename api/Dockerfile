# Copied from: https://github.com/rezbee-dev/quizapp/blob/main/backend/Dockerfile
####
# src: https://github.com/astral-sh/uv-docker-example/blob/main/Dockerfile
# Use a Python image with uv pre-installed
FROM python:3.12-slim-bookworm AS base

# Install curl for health-check in compose.yml
RUN apt-get update && apt-get install -y curl

EXPOSE 8000

# Install the project into `/app`
WORKDIR /app/api

# Disables .pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# Ensures stdout streams are sent straight to terminal/container logs w/o being buffered, so you can see it in real time (https://stackoverflow.com/a/59812588)
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /app/api/requirements.txt

# --no-cache-dir helps reduce docker image size
RUN pip install --no-cache-dir --upgrade -r /app/api/requirements.txt

COPY ./src /app/api/src
#################################################################################################

FROM base AS test
CMD ["pytest"]

#################################################################################################

FROM base AS dev

# Run the FastAPI application by default
# Uses `fastapi dev` to enable hot-reloading when the `watch` sync occurs
# Uses `--host 0.0.0.0` to allow access from outside the container
CMD ["fastapi", "dev", "--host", "0.0.0.0", "src/main.py"]