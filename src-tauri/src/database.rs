use crate::error::AppError;
use rusqlite::Connection;
use tauri::AppHandle;

pub struct Database(Connection);

impl Database {
    pub fn new(app_handle: &AppHandle) -> Result<Self, AppError> {
        let app_dir = app_handle
            .path_resolver()
            .app_local_data_dir()
            .ok_or_else(|| AppError::Config("App directory not found".into()))?;

        std::fs::create_dir_all(&app_dir)?;

        let db_path = app_dir.join("app.db");
        let conn = Connection::open(db_path)?;

        conn.execute("PRAGMA journal_mode=WAL;", [])?;
        conn.execute("PRAGMA synchronous=NORMAL;", [])?;
        conn.execute("PRAGMA foreign_keys=ON;", [])?;

        Ok(Self(conn))
    }

    pub fn init_schema(&self) -> Result<(), AppError> {
        self.0.execute_batch(
            "CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                token TEXT NOT NULL UNIQUE,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );",
        )?;
        Ok(())
    }

    pub fn conn(&self) -> &Connection {
        &self.0
    }
}
