use rusqlite::{params, types::Value, Result};

use crate::{database::Database, users::model::User};

pub struct UserRepository<'a> {
    database: &'a Database,
}

impl<'a> UserRepository<'a> {
    pub fn new(database: &'a Database) -> UserRepository<'a> {
        UserRepository { database }
    }

    pub fn get_user_where(&self, field: &str, value: Value) -> Result<User> {
        let conn = self.database.connection.lock().unwrap();

        conn.query_row(
            &format!("SELECT * FROM users WHERE {} = ?", field),
            params![value],
            |row| {
                Ok(User {
                    user_id: row.get(0)?,
                    name: row.get(1)?,
                    username: row.get(2)?,
                    email: row.get(3)?,
                    password: row.get(4)?,
                    created_at: row.get(5)?,
                })
            },
        )
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
            params![name, email, username, password],
        )?;

        Ok(())
    }
}
