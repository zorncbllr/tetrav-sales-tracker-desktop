use rusqlite::{Connection, Result};
use std::{env, fs, sync::Mutex};

use crate::users::service::UserService;

pub struct Database {
    pub connection: Mutex<Connection>,
}

impl Database {
    pub fn new() -> Result<Database> {
        let path = env::var("DATABASE_PATH").unwrap();
        let conn = Connection::open(path)?;

        Ok(Database {
            connection: Mutex::new(conn),
        })
    }

    pub fn initialize(&self) -> Result<()> {
        {
            let conn = self.connection.lock().unwrap();

            let migration_string = fs::read_to_string("src/database/migrations/up.sql").unwrap();

            conn.execute_batch(format!("BEGIN; \n{}\n COMMIT;", migration_string).as_str())?;
        }

        let user_service = UserService::new(&self);

        user_service
            .create_user("root", "root@gmail.com", "root", "root")
            .unwrap_or(());

        Ok(())
    }
}
