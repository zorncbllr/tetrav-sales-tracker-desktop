use rusqlite::{params, Result};

use crate::database::Database;

pub struct UserRepository<'a> {
    database: &'a Database,
}

impl<'a> UserRepository<'a> {
    pub fn new(database: &'a Database) -> UserRepository<'a> {
        UserRepository { database }
    }

    pub fn create_user(
        &self,
        name: &str,
        email: &str,
        username: &str,
        password: &str,
    ) -> Result<()> {
        let conn = self.database.connection.lock().unwrap();

        conn.execute(
            "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)",
            [name, email, username, password],
        )?;

        Ok(())
    }
}
