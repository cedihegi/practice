# first, build dependencies.
FROM rust:1.84 as build
RUN cargo install sqlx-cli --no-default-features --features native-tls

WORKDIR /app
COPY Cargo.toml .
COPY Cargo.lock .

# create a dummy file
RUN mkdir src && echo "fn main() {}" > src/main.rs && \
    echo "pub fn dummy() {}" > src/lib.rs

RUN cargo build --release
RUN rm src -rf

COPY . .
RUN touch src/main.rs src/lib.rs
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y \
    libssl3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/target/release/backend /usr/local/bin/backend
EXPOSE 8080
WORKDIR /app
CMD ["backend"]
