use rusqlite::{params, Result};

use crate::{accounts::model::BaseAccount, database::Database};

pub struct AccountRepository<'a> {
    database: &'a Database,
}

impl<'a> AccountRepository<'a> {
    pub fn new(database: &'a Database) -> AccountRepository<'a> {
        AccountRepository { database }
    }

    pub fn get_accounts(&self) -> Result<Vec<BaseAccount>> {
        let conn = self.database.connection.lock().unwrap();

        let mut stmt = conn.prepare("SELECT * FROM accounts")?;

        let accounts = stmt
            .query_map([], |row| {
                Ok(BaseAccount {
                    account_id: row.get(0)?,
                    account_name: row.get(1)?,
                    account_type: row.get(2)?,
                })
            })?
            .collect::<Result<Vec<BaseAccount>>>()?;

        Ok(accounts)
    }

    pub fn add_account(&self, account_name: &str, account_type: &str) -> Result<BaseAccount> {
        let conn = self.database.connection.lock().unwrap();

        conn.execute(
            "INSERT INTO accounts (account_name, account_type) VALUES (?, ?)",
            params![account_name, account_type],
        )?;

        Ok(BaseAccount {
            account_id: conn.last_insert_rowid(),
            account_name: String::from(account_name),
            account_type: String::from(account_type),
        })
    }
}
