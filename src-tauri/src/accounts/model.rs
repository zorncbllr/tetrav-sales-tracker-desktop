use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub enum AccountType {
    Station,
    Office,
    Individual,
}

#[derive(Serialize, Deserialize)]
pub struct Account {
    pub account_id: i64,
    pub account_name: String,
    pub account_type: AccountType,
}
