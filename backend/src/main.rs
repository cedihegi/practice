use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

#[get("/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json("Hello from Rust backend!")
}
async fn not_found(path: web::Path<String>) -> impl Responder {
    println!("Attempted access to unknown route: /{}", path);
    HttpResponse::NotFound().json(format!("Route '/{}' not found", path))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .default_service(web::route().to(not_found))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
