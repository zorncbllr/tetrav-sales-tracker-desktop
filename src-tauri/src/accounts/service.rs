use rusqlite::Result;

use crate::{
    accounts::{model::Account, repository::AccountRepository},
    database::Database,
};

#[allow(dead_code)]
pub struct AccountService<'a> {
    database: &'a Database,
    account_repository: AccountRepository<'a>,
}

impl<'a> AccountService<'a> {
    pub fn new(database: &'a Database) -> AccountService<'a> {
        AccountService {
            database: database,
            account_repository: AccountRepository::new(database),
        }
    }

    pub fn get_accounts(&self) -> Result<Vec<Account>> {
        self.account_repository.get_accounts()
    }

    pub fn add_account(&self, account_name: String, account_type: String) -> Result<()> {
        self.account_repository
            .add_account(account_name.as_str(), account_type.as_str())?;

        Ok(())
    }
}
