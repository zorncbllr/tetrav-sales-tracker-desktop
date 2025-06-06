use super::{model::LoginRequest, repository::AuthRepository};
use crate::error::AppError;

pub struct AuthService<'a> {
    repo: AuthRepository<'a>,
}

impl<'a> AuthService<'a> {
    pub fn new(repo: AuthRepository<'a>) -> Self {
        Self { repo }
    }

    pub fn login(&self, request: LoginRequest) -> Result<String, AppError> {
        // Business logic: validate, authenticate, etc.
        let session = self.repo.authenticate(&request)?;

        // Additional business rules
        if session.expires_at < chrono::Utc::now() {
            return Err(AppError::Auth("Session expired immediately".into()));
        }

        Ok(session.token)
    }
}
