use std::env;

use bcrypt::verify;
use chrono::Utc;
use jsonwebtoken::{
    decode, encode, errors::ErrorKind, Algorithm, DecodingKey, EncodingKey, Header, Validation,
};
use rusqlite::types::Value;

use crate::{
    auth::models::{AuthError, AuthResponse, Claims},
    database::Database,
    users::service::UserService,
};

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

    pub fn attempt_login(
        &self,
        username: String,
        password: String,
    ) -> Result<AuthResponse, AuthError> {
        let user = self
            .user_service
            .get_user_where("username", Value::Text(username));

        match user {
            Ok(user) => {
                if verify(password, &user.password).unwrap() {
                    Ok(AuthResponse {
                        token: self.create_jwt(&user.user_id).unwrap(),
                        user_id: user.user_id,
                    })
                } else {
                    Err(AuthError {
                        username: None,
                        password: Some(String::from("Wrong credentials.")),
                    })
                }
            }
            Err(_) => Err(AuthError {
                username: Some(String::from("User not found.")),
                password: None,
            }),
        }
    }

    pub fn create_jwt(&self, user_id: &i64) -> Result<String, jsonwebtoken::errors::Error> {
        let now = Utc::now().timestamp() as usize;
        let expiration = now + (60 * 60 * 24 * 7);

        let claims = Claims {
            sub: user_id.to_owned(),
            exp: expiration,
            iat: now,
        };

        encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(env::var("SECRET_KEY").unwrap().as_bytes()),
        )
    }

    pub fn validate_jwt(&self, token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
        let claims = decode::<Claims>(
            token,
            &DecodingKey::from_secret(env::var("SECRET_KEY").unwrap().as_bytes()),
            &Validation::new(Algorithm::HS256),
        )
        .map(|data| data.claims)?;

        let user = self
            .user_service
            .get_user_where("user_id", Value::Integer(claims.sub));

        if let Ok(_) = user {
            Ok(claims)
        } else {
            Err(jsonwebtoken::errors::Error::from(ErrorKind::InvalidSubject))
        }
    }
}
