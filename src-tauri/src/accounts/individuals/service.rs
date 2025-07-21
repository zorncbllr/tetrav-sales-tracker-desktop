use rusqlite::Result;

use crate::{
    accounts::{individuals::repository::IndividualRespository, repository::AccountRepository},
    database::Database,
};

pub struct IndividualService<'a> {
    database: &'a Database,
    individual_repository: &'a IndividualRespository<'a>,
    account_repository: &'a AccountRepository<'a>,
}

impl<'a> IndividualService<'a> {
    pub fn new(
        database: &'a Database,
        individual_repository: &'a IndividualRespository,
        account_repository: &'a AccountRepository,
    ) -> IndividualService<'a> {
        IndividualService {
            database,
            individual_repository,
            account_repository,
        }
    }

    pub fn add_account(&self, account_name: String, account_type: String) -> Result<()> {
        let account = self
            .account_repository
            .add_account(&account_name, &account_type)?;

        self.individual_repository
            .add_individual(account.account_id)?;

        Ok(())
    }
}
