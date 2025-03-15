use actix_web::{HttpResponse, ResponseError};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Database error: {0}")]
    DatabaseError(#[from] sqlx::Error),
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
    #[error("Internal server error")]
    InternalServerError(String),
}

impl ResponseError for AppError {
    fn error_response(&self) -> HttpResponse {
        match self {
            AppError::DatabaseError(_) => {
                HttpResponse::InternalServerError().json("Database error")
            }
            AppError::Unauthorized(msg) => HttpResponse::Unauthorized().json(msg),
            AppError::InternalServerError(msg) => HttpResponse::InternalServerError().json(msg),
        }
    }
}
