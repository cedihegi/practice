use actix_cors::Cors;
use actix_web::{
    http::header,
    middleware::Logger,
    web::{self, Data},
    App, HttpServer,
};
use backend::controllers::{default::default_handler, routes::user_routes};
use dotenv::dotenv;
use env_logger::Env;
use log::info;
use sqlx::PgPool;
use std::{env, io};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(Env::default().default_filter_or("debug"));
    start_actix().await
}

async fn start_actix() -> std::io::Result<()> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to the database");
    info!("running sql migrations");
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;

    info!("starting actix server");
    HttpServer::new(move || {
        App::new()
            // ideally make this conditional on this being a dev environment
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:4200")
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_headers(vec![header::CONTENT_TYPE, header::AUTHORIZATION])
                    .supports_credentials()
                    .max_age(3600),
            )
            .wrap(Logger::default())
            .app_data(Data::new(pool.clone()))
            .configure(user_routes)
            .default_service(web::route().to(default_handler))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
