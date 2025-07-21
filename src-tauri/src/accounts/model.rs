use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct BaseAccount {
    pub account_id: i64,
    pub account_name: String,
    pub account_type: String,
}
