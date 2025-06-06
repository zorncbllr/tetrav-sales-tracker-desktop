use rusqlite::Result;
use tauri::{command, State};

use crate::database::Database;

#[command]
pub fn attempt_sign_in(email: String, password: String, db: State<Database>) -> Result<(), String> {
    let conn = db.connection.lock().map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT * FROM users WHERE email = ?1")
        .map_err(|e| e.to_string())?;

    stmt.execute([email]).map_err(|e| e.to_string())?;

    Ok(())
}
