use std::future::{ready, Ready};

use actix_web::FromRequest;
use chrono::{Duration, Utc};
use serde::{Deserialize, Serialize};

use crate::{errors::AppError, services::auth::ClaimsService};

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthenticationClaims {
    /// subject, containing username
    pub sub: String,
    /// expiration time
    pub exp: usize,
    // TODO: extend with roles or other access control features
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenResponse {
    pub token: String,
}

impl AuthenticationClaims {
    pub fn new(username: &str, expiration_minutes: i64) -> Self {
        let expiration = Utc::now()
            .checked_add_signed(Duration::minutes(expiration_minutes))
            .expect("Invalid Timestamp")
            .timestamp() as usize;
        Self {
            sub: username.into(),
            exp: expiration,
        }
    }
}

impl FromRequest for AuthenticationClaims {
    type Error = AppError;
    type Future = Ready<Result<Self, Self::Error>>;

    /// From method to allow the use of this type in route endpoints, so they will
    /// only be available to users providing a valid token
    fn from_request(
        req: &actix_web::HttpRequest,
        _payload: &mut actix_web::dev::Payload,
    ) -> Self::Future {
        match req
            .cookie("auth_token")
            .ok_or(AppError::Unauthorized("Missing cookie".into()))
            .map(|cookie| cookie.value().to_string())
        {
            Ok(token) => return ready(ClaimsService::verify_token(token)),
            Err(err) => ready(Err(err)),
        }
    }
}
