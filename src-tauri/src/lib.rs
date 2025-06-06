// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod commands;
mod database;
mod models;

use crate::commands::attempt_sign_in;
use crate::database::Database;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let db = Database::new().expect("Failed to open database");

            db.initialize().expect("Failed to initialize database");

            app.manage(db);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![attempt_sign_in])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
