use std::sync::MutexGuard;

use rusqlite::{Connection, Result};

pub struct Migration {}

impl Migration {
    pub fn migrate(conn: MutexGuard<'_, Connection>) -> Result<()> {
        conn.execute_batch(
            "
            BEGIN;
            
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            );

            COMMIT;",
        )?;

        Ok(())
    }
}
