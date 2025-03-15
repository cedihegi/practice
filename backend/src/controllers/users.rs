use crate::models::api::authentication::UserInfo;
use crate::models::authentication::AuthenticationClaims;
use crate::repositories::UserRepository;
use crate::services::auth::UserService;
use crate::{errors::AppError, models::api::authentication::RegisterUser};
use actix_web::{cookie::Cookie, web, HttpResponse, Responder};
use actix_web::{get, post};
use sqlx::PgPool;

pub async fn register_user(
    user: web::Json<RegisterUser>,
    pool: web::Data<PgPool>,
) -> Result<impl Responder, AppError> {
    let user = UserService::register_user(user.into_inner(), &pool).await?;
    Ok(HttpResponse::Ok().json(user))
}

pub async fn login_user(
    credentials: web::Json<(String, String)>,
    pool: web::Data<PgPool>,
) -> Result<impl Responder, AppError> {
    let (email, password) = credentials.into_inner();
    let token = UserService::login_user(&email, &password, &pool).await?;
    let cookie = Cookie::build("auth_token", token.token)
        .http_only(true)
        .same_site(actix_web::cookie::SameSite::Lax)
        .path("/")
        .finish();
    Ok(HttpResponse::Ok().cookie(cookie).finish())
}

#[post("/logout")]
pub async fn logout_user() -> Result<impl Responder, AppError> {
    let cookie_reset = Cookie::build("auth_token", "")
        .http_only(true)
        .same_site(actix_web::cookie::SameSite::Lax)
        .path("/")
        .finish();
    Ok(HttpResponse::Ok().cookie(cookie_reset).finish())
}

#[get("/current-user")]
pub async fn current_user(
    user: AuthenticationClaims,
    pool: web::Data<PgPool>,
) -> Result<impl Responder, AppError> {
    let user_res = UserRepository::find_user_by_username(&user.sub, &pool).await;
    match user_res {
        Ok(user) => {
            let user_info = UserInfo::from(&user);
            Ok(HttpResponse::Ok().json(user_info))
        }
        Err(_) => Err(AppError::Unauthorized("not logged in".to_string())),
    }
}
