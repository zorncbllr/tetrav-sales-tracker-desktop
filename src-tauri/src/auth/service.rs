use bcrypt::verify;

use crate::{database::Database, users::service::UserService};

pub struct AuthService<'a> {
    database: &'a Database,
    user_service: UserService<'a>,
}

impl<'a> AuthService<'a> {
    pub fn new(database: &'a Database) -> AuthService<'a> {
        AuthService {
            database,
            user_service: UserService::new(database),
        }
    }

    pub fn attempt_login(&self, username: String, password: String) -> Result<String, String> {
        let user = self.user_service.get_user_by_username(&username);

        match user {
            Ok(user) => {
                if verify(password, &user.password).unwrap() {
                    Ok(String::from("User logged in successfully."))
                } else {
                    Err(String::from("Wrong credentials."))
                }
            }
            Err(_) => Err(String::from("User not found.")),
        }
    }
}
