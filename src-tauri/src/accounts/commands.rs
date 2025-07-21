use tauri::State;

use crate::{
    accounts::{model::BaseAccount, repository::AccountRepository},
    database::Database,
};

#[tauri::command]
pub fn get_accounts(database: State<Database>) -> Vec<BaseAccount> {
    AccountRepository::new(&database).get_accounts().unwrap()
}
