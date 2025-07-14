use rusqlite::Result;

use crate::{
    accounts::{model::Account, repository::AccountRepository},
    database::Database,
};

#[allow(dead_code)]
pub struct AccountService<'a> {
    database: &'a Database,
    user_repository: AccountRepository<'a>,
}

impl<'a> AccountService<'a> {
    pub fn new(database: &'a Database) -> AccountService<'a> {
        AccountService {
            database: database,
            user_repository: AccountRepository::new(database),
        }
    }

    pub fn get_accounts(&self) -> Result<Vec<Account>> {
        self.user_repository.get_accounts()
    }
}
