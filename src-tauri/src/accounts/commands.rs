use tauri::State;

use crate::{
    accounts::{model::Account, service::AccountService},
    database::Database,
};

#[tauri::command]
pub fn get_accounts(database: State<Database>) -> Vec<Account> {
    AccountService::new(&database).get_accounts().unwrap()
}

#[tauri::command]
pub fn add_account(
    database: State<Database>,
    account_name: String,
    account_type: String,
) -> Result<(), String> {
    let res = AccountService::new(&database).add_account(account_name, account_type);

    match res {
        Ok(()) => Ok(()),
        Err(err) => Err(err.to_string()),
    }
}
