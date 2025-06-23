use tauri::State;

use crate::{
    auth::{models::AuthResponse, service::AuthService},
    database::Database,
};

#[tauri::command]
pub fn attempt_login(
    database: State<Database>,
    username: String,
    password: String,
) -> Result<AuthResponse, String> {
    let auth_response = AuthService::new(&database).attempt_login(username, password)?;

    Ok(auth_response)
}

#[tauri::command]
pub fn verify_token(database: State<Database>, token: String) -> Result<i64, String> {
    let claims = AuthService::new(&database).validate_jwt(&token);

    match claims {
        Ok(claims) => Ok(claims.sub),
        Err(error) => Err(error.to_string()),
    }
}
