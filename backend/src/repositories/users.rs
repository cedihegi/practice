use crate::{
    errors::AppError,
    models::{api::authentication::RegisterUser, database::User},
    services::auth::PasswordService,
};
use sqlx::postgres::PgPool;

pub struct UserRepository;

impl UserRepository {
    /// Create a user
    /// # Arguments:
    /// * `user` - the new User
    /// * `pool` - the connection pool for the database
    pub async fn create_user(user: RegisterUser, pool: &PgPool) -> Result<User, AppError> {
        if let Ok(_user) = UserRepository::find_user_by_username(&user.username, pool).await {
            return Err(AppError::Unauthorized("User already exists!".to_string()));
        }
        let password_hash = PasswordService::hash_password(&user.password);
        let row = sqlx::query_as!(
            User,
            r#"
            INSERT INTO users (username, password_hash)
            VALUES ($1, $2)
            RETURNING id, username, password_hash
            "#,
            user.username,
            password_hash
        )
        .fetch_one(pool)
        .await?;
        Ok(row)
    }

    pub async fn find_user_by_username(username: &str, pool: &PgPool) -> Result<User, AppError> {
        let user = sqlx::query_as!(
            User,
            r#"
            SELECT id, username, password_hash
            FROM users
            WHERE username = $1
            "#,
            username
        )
        .fetch_one(pool)
        .await?;

        Ok(user)
    }
}
