use crate::controllers::users;
use actix_web::web;

use super::{
    about::get_about,
    users::{current_user, logout_user},
};

pub fn user_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .route("/register", web::post().to(users::register_user))
            .route("/login", web::post().to(users::login_user))
            .service(logout_user)
            .service(current_user),
    );
    cfg.service(get_about);
}
