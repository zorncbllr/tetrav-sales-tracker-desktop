use super::model::{LoginRequest, Session};
use crate::database::Database;
use crate::error::AppError;
use rusqlite::{params, Row};

pub struct AuthRepository<'a> {
    db: &'a Database,
}

impl<'a> AuthRepository<'a> {
    pub fn new(db: &'a Database) -> Self {
        Self { db }
    }

    pub fn authenticate(&self, request: &LoginRequest) -> Result<Session, AppError> {
        let conn = self.db.conn();

        // Check credentials
        let user_id: i64 = conn.query_row(
            "SELECT id FROM users WHERE email = ?1 AND password_hash = ?2",
            params![request.email, hash_password(&request.password)],
            |row| row.get(0),
        )?;

        // Create session
        let session = Session {
            user_id,
            token: generate_token(),
            expires_at: chrono::Utc::now() + chrono::Duration::days(7),
        };

        // Save session
        conn.execute(
            "INSERT INTO sessions (user_id, token, expires_at) VALUES (?1, ?2, ?3)",
            params![
                session.user_id,
                session.token,
                session.expires_at.to_rfc3339()
            ],
        )?;

        Ok(session)
    }

    // Helper functions
    fn hash_password(password: &str) -> String {
        // Implement secure password hashing
        format!("hashed_{}", password)
    }

    fn generate_token() -> String {
        // Implement secure token generation
        uuid::Uuid::new_v4().to_string()
    }
}
