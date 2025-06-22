use tauri::State;

use crate::{auth::service::AuthService, database::Database};

#[tauri::command]
pub fn attempt_login(database: State<Database>, username: String, password: String) -> String {
    let auth_service = AuthService::new(&database);

    auth_service
        .attempt_login(username, password)
        .unwrap_or_else(|e| {
            return e;
        })
}
