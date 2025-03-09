use actix_web::{HttpRequest, HttpResponse, Responder};

pub async fn default_handler(req: HttpRequest) -> impl Responder {
    let path = req.path();
    HttpResponse::NotFound().body(format!(
        "Ooops! The requested resource at {path} was not found.."
    ))
}
