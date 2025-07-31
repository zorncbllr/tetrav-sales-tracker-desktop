use std::{env, fs, sync::Mutex};

use rusqlite::{Connection, Result};

use crate::users::service::UserService;

pub struct Database {
    pub connection: Mutex<Connection>,
}

impl Database {
    pub fn new() -> Result<Self> {
        let path = env::var("DATABASE").unwrap();
        let conn = Connection::open(path)?;

        Ok(Self {
            connection: Mutex::new(conn),
        })
    }

    pub fn initialize(&self) -> Result<()> {
        {
            let conn = self.connection.lock().unwrap();

            let migration = fs::read_to_string("src/database/migrations/up.sql").unwrap();
            conn.execute_batch(&format!("BEGIN;\n {}\n COMMIT;\n", migration))?;
        }

        let _ = UserService::new(self).create_user("Admin", "admin@gmail.com", "admin", "admin");

        Ok(())
    }
}
