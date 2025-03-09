use std::env;

use jsonwebtoken::{
    decode, encode, errors::ErrorKind, DecodingKey, EncodingKey, Header, Validation,
};
use log::info;

use crate::{
    errors::AppError,
    models::authentication::{AuthenticationClaims, TokenResponse},
};

pub struct ClaimsService;

impl ClaimsService {
    pub fn sign(
        claims: AuthenticationClaims,
    ) -> Result<TokenResponse, jsonwebtoken::errors::Error> {
        let secret =
            env::var("JWT_SECRET").map_err(|_| ErrorKind::InvalidRsaKey("no key".to_string()))?;
        let token = encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(secret.as_ref()),
        )?;
        Ok(TokenResponse { token })
    }

    /// Verify a token. If it's valid, return the claims, otherwise
    /// return an error
    pub fn verify_token(token: String) -> Result<AuthenticationClaims, AppError> {
        let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        info!("verifying token {token}");
        let token_data = decode::<AuthenticationClaims>(
            &token,
            &DecodingKey::from_secret(secret.as_ref()),
            &Validation::default(),
        )
        .map_err(|_| AppError::Unauthorized("Invalid or expired token".into()))?;
        Ok(token_data.claims)
    }
}
