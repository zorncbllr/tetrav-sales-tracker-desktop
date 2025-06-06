use tauri::Manager;

use crate::database::Database;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
pub mod database;
pub mod error;
pub mod features;
pub mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let db = Database::new(app.handle())?;
            db.init_schema()?;

            app.manage(db);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
