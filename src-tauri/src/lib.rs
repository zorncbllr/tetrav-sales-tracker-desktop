// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use dotenvy::dotenv;
use std::env;
use tauri::Manager;

use crate::database::Database;

mod accounts;
mod auth;
mod database;
mod users;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    dotenv().ok();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let database = Database::new().expect("Failed to connect to database");

            database
                .initialize()
                .expect("Failed to initialize database.");

            app.manage(database);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            auth::commands::attempt_login,
            auth::commands::verify_token,
            accounts::commands::get_accounts,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
