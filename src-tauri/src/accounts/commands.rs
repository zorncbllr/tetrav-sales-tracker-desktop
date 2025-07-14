use tauri::State;

use crate::{
    accounts::{model::Account, service::AccountService},
    database::Database,
};

#[tauri::command]
pub fn get_accounts(database: State<Database>) -> Vec<Account> {
    AccountService::new(&database).get_accounts().unwrap()
}
