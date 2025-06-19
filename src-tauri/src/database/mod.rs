use std::{env, sync::Mutex};

use rusqlite::{Connection, Result};

pub struct Database {
    connection: Mutex<Connection>,
}

impl Database {
    pub fn new() -> Result<Database> {
        let path = env::var("DATABASE_PATH").unwrap();
        let conn = Connection::open(path)?;

        Ok(Database {
            connection: Mutex::new(conn),
        })
    }
}
