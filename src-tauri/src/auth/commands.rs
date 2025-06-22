use tauri::State;

use crate::{auth::service::AuthService, database::Database};

#[tauri::command]
pub fn attempt_login(
    database: State<Database>,
    username: String,
    password: String,
) -> Result<String, String> {
    let auth_service = AuthService::new(&database);

    let msg = auth_service.attempt_login(username, password)?;

    Ok(msg)
}
