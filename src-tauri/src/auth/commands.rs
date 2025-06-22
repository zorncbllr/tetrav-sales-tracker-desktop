use tauri::State;

use crate::{
    auth::{
        models::{AuthResponse, LoginRequest},
        service::AuthService,
    },
    database::Database,
};

#[tauri::command]
pub fn attempt_login(
    database: State<Database>,
    credentials: LoginRequest,
) -> Result<AuthResponse, String> {
    let auth_response =
        AuthService::new(&database).attempt_login(credentials.username, credentials.password)?;

    Ok(auth_response)
}
