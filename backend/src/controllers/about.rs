use crate::models::authentication::AuthenticationClaims;
use actix_web::{get, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct QueryParams {
    pub id: u32,
}
#[get("/about")]
pub async fn get_about(
    params: web::Query<QueryParams>,
    _user: AuthenticationClaims,
) -> impl Responder {
    HttpResponse::Ok().json(params.into_inner())
}
