use tauri::State;

use crate::{auth::model::User, database::Database};

#[tauri::command]
pub fn attemp_login(database: State<Database>, username: String, password: String) {}

#[tauri::command]
pub fn logout(database: State<Database>) {}

#[tauri::command]
pub fn change_password(database: State<Database>) {}

#[tauri::command]
pub fn register(database: State<Database>, user: User) {}
