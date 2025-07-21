use tauri::State;

use crate::{
    accounts::{individuals::repository::IndividualRespository, model::BaseAccount},
    database::Database,
};

#[tauri::command]
pub fn get_individuals(database: State<Database>) -> Vec<BaseAccount> {
    IndividualRespository::new(&database)
        .get_individuals()
        .unwrap()
}

pub fn add_individual(database: State<Database>) {}
