use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    pub user_id: i64,
    pub name: String,
    pub username: String,
    pub email: String,
    pub password: String,
    pub created_at: String,
}
