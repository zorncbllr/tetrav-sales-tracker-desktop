use rusqlite::{params, Result};

use crate::{accounts::model::Account, database::Database};

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
                    account_type: row.get(2)?,
                })
            })?
            .collect::<Result<Vec<Account>>>()?;

        Ok(accounts)
    }

    pub fn add_account(&self, account_name: &str, account_type: &str) -> Result<()> {
        let conn = self.database.connection.lock().unwrap();

        conn.execute(
            "INSERT INTO accounts (account_name, account_type) VALUES (?, ?)",
            params![account_name, account_type],
        )?;

        Ok(())
    }
}
