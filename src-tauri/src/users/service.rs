use bcrypt::{hash, DEFAULT_COST};
use rusqlite::{params, types::Value, Result};
use uuid::Uuid;

use crate::{database::Database, users::model::User};

pub struct UserService<'a> {
    database: &'a Database,
}

impl<'a> UserService<'a> {
    pub fn new(database: &'a Database) -> Self {
        Self { database }
    }

    pub fn create_user(
        &self,
        name: &str,
        email: &str,
        username: &str,
        password: &str,
    ) -> Result<User> {
        let id = Uuid::new_v4().to_string();

        {
            let conn = self.database.connection.lock().unwrap();

            let hashed_password = hash(password, DEFAULT_COST)
                .map_err(|e| rusqlite::Error::InvalidParameterName(e.to_string()))?;

            conn.execute(
                "INSERT INTO users (id, name, email, username, password) VALUES (?, ?, ?, ?, ?)",
                params![id, name, email, username, hashed_password],
            )?;
        }

        Ok(self.get_user_where("id", Value::Text(id))?)
    }

    pub fn get_user_where(&self, field: &str, value: Value) -> Result<User> {
        let conn = self.database.connection.lock().unwrap();

        conn.query_row(
            &format!("SELECT * FROM users WHERE {} = ?", field),
            params![value],
            |row| {
                Ok(User {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    username: row.get(2)?,
                    email: row.get(3)?,
                    password: row.get(4)?,
                    created_at: row.get(5)?,
                })
            },
        )
    }
}
