use bcrypt::{hash, DEFAULT_COST};
use rusqlite::{types::Value, Result};

use crate::{
    database::Database,
    users::{model::User, repository::UserRepository},
};

#[allow(dead_code)]
pub struct UserService<'a> {
    database: &'a Database,
    user_repository: UserRepository<'a>,
}

impl<'a> UserService<'a> {
    pub fn new(database: &'a Database) -> UserService<'a> {
        UserService {
            database: database,
            user_repository: UserRepository::new(database),
        }
    }

    pub fn get_user_where(&self, field: &str, value: Value) -> Result<User> {
        self.user_repository.get_user_where(field, value)
    }

    pub fn create_user(
        &self,
        name: &str,
        email: &str,
        username: &str,
        password: &str,
    ) -> Result<()> {
        let hashed_password = hash(password, DEFAULT_COST)
            .map_err(|e| rusqlite::Error::InvalidParameterName(e.to_string()))?;

        self.user_repository
            .create_user(name, email, username, &hashed_password)?;

        Ok(())
    }
}
