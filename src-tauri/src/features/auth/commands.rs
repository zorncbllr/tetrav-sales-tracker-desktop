use super::{model::LoginRequest, repository::AuthRepository, service::AuthService};
use crate::{database::Database, error::AppError};
use tauri::State;

#[tauri::command]
pub async fn login(request: LoginRequest, db: State<'_, Database>) -> Result<String, AppError> {
    let repo = AuthRepository::new(&db);
    let service = AuthService::new(repo);
    service.login(request)
}
