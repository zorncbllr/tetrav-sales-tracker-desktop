use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: i64,
    pub exp: usize,
    pub iat: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthResponse {
    pub token: String,
    pub user_id: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthError {
    pub username: Option<String>,
    pub password: Option<String>,
}
