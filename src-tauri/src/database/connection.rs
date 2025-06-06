use rusqlite::{Connection, Result};
use std::sync::Mutex;

use crate::database::migrations::Migration;

pub struct Database {
    pub connection: Mutex<Connection>,
}

impl Database {
    pub fn new() -> Result<Self> {
        let conn = Connection::open("")?;

        Ok(Database {
            connection: Mutex::new(conn),
        })
    }

    pub fn initialize(&self) -> Result<()> {
        let conn = self.connection.lock().unwrap();

        let _ = Migration::migrate(conn);

        Ok(())
    }
}
