use tauri::State;

use crate::{
    auth::{
        model::{AuthError, AuthResponse},
        service::AuthService,
    },
    database::Database,
};

#[tauri::command]
pub fn attempt_login(
    database: State<Database>,
    username: String,
    password: String,
) -> Result<AuthResponse, AuthError> {
    if username.is_empty() {
        return Err(AuthError {
            username: Some(String::from("Username is required.")),
            password: None,
        });
    }

    if password.is_empty() {
        return Err(AuthError {
            username: None,
            password: Some(String::from("Password is required.")),
        });
    }

    Ok(AuthService::new(&database).attempt_login(username, password)?)
}

#[tauri::command]
pub fn verify_token(database: State<Database>, token: String) -> Result<String, String> {
    let claims = AuthService::new(&database).validate_jwt(&token);

    match claims {
        Ok(claims) => Ok(claims.sub),
        Err(error) => Err(error.to_string()),
    }
}
