use rusqlite::{params, Result};

use crate::{
    accounts::{individuals, model::BaseAccount},
    database::Database,
};

pub struct IndividualRespository<'a> {
    database: &'a Database,
}

impl<'a> IndividualRespository<'a> {
    pub fn new(database: &'a Database) -> IndividualRespository<'a> {
        IndividualRespository { database }
    }

    pub fn get_individuals(&self) -> Result<Vec<BaseAccount>> {
        let conn = self.database.connection.lock().unwrap();

        let mut stmt = conn.prepare("SELECT * FROM individuals")?;

        let individuals = stmt
            .query_map([], |row| {
                Ok(BaseAccount {
                    account_id: row.get(0)?,
                    account_name: row.get(1)?,
                    account_type: row.get(2)?,
                })
            })?
            .collect::<Result<Vec<BaseAccount>>>()?;

        Ok(individuals)
    }

    pub fn add_individual(&self, account_id: i64) -> Result<()> {
        let conn = self.database.connection.lock().unwrap();

        conn.execute(
            "INSERT INTO individuals (account_id) VALUES (?)",
            params![account_id],
        )?;

        Ok(())
    }
}
