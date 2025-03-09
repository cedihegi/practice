// src/services/users.rs
use crate::errors::AppError;
use crate::models::api::authentication::RegisterUser;
use crate::models::authentication::{AuthenticationClaims, TokenResponse};
use crate::models::database::User;
use crate::repositories::UserRepository;
use sqlx::PgPool;

use super::password_service::PasswordService;
use super::ClaimsService;

pub struct UserService;

const TOKEN_EXPIRATION_MINUTES: i64 = 60;

impl UserService {
    pub async fn register_user(user: RegisterUser, pool: &PgPool) -> Result<User, AppError> {
        let user = UserRepository::create_user(user, pool).await?;
        Ok(user)
    }

    /// Perform user login, by accessing the db and checking
    /// if the provided password is correct
    pub async fn login_user(
        username: &str,
        password: &str,
        pool: &PgPool,
    ) -> Result<TokenResponse, AppError> {
        let user = UserRepository::find_user_by_username(username, pool).await?;
        if PasswordService::verify_password(password, &user.password_hash) {
            let claims = AuthenticationClaims::new(&user.username, TOKEN_EXPIRATION_MINUTES);
            match ClaimsService::sign(claims) {
                Ok(token) => Ok(token),
                Err(_) => Err(AppError::InternalServerError),
            }
        } else {
            Err(AppError::Unauthorized("Invalid password".into()))
        }
    }
}
