# first, build dependencies.
FROM rust:1.84 as build
WORKDIR /app
COPY Cargo.toml ./

# create a dummy file
RUN mkdir src && echo "fn main() {}" > dummy.rs

# point cargo toml to dummy file
RUN sed -i 's#src/main.rs#dummy.rs#' Cargo.toml
RUN cargo build --release
RUN rm src -rf

RUN sed -i 's#dummy.rs#src/main.rs#' Cargo.toml
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=build /app/target/release/backend /usr/local/bin/backend
EXPOSE 8080
CMD ["backend"]
