use serde::{Deserialize, Serialize};

use crate::models::database::User;

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterUser {
    pub username: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserInfo {
    pub username: String,
    pub id: i32,
}

impl From<&User> for UserInfo {
    fn from(value: &User) -> Self {
        Self {
            username: value.username.clone(),
            id: value.id,
        }
    }
}
