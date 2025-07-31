use dotenvy::dotenv;
use tauri::Manager;

use crate::database::Database;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod auth;
mod database;
mod users;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    dotenv().ok();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let db = Database::new().expect("Failed to open database.");

            db.initialize().expect("Failed to initialize database.");

            app.manage(db);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            auth::commands::attempt_login,
            auth::commands::verify_token,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
