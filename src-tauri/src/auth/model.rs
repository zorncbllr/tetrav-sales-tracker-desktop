use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    user_id: u64,
    name: String,
    username: String,
    email: String,
    password: String,
    created_at: String,
}
