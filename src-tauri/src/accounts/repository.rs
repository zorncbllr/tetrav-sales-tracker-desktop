use rusqlite::Result;

use crate::{
    accounts::model::{Account, AccountType},
    database::Database,
};

pub struct AccountRepository<'a> {
    database: &'a Database,
}

impl<'a> AccountRepository<'a> {
    pub fn new(database: &'a Database) -> AccountRepository<'a> {
        AccountRepository { database }
    }

    pub fn get_accounts(&self) -> Result<Vec<Account>> {
        let conn = self.database.connection.lock().unwrap();

        let mut stmt = conn.prepare("SELECT * FROM accounts")?;

        let accounts = stmt
            .query_map([], |row| {
                Ok(Account {
                    account_id: row.get(0)?,
                    account_name: row.get(1)?,
                    account_type: AccountType::Individual,
                })
            })?
            .collect::<Result<Vec<Account>>>()?;

        Ok(accounts)
    }
}
