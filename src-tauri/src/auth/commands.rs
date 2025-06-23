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

#[tauri::command]
pub fn verify_token(database: State<Database>, token: String) -> Result<i64, String> {
    let claims = AuthService::new(&database)
        .validate_jwt(&token)
        .map_err(|e| e.to_string())?;

    Ok(claims.sub)
}
