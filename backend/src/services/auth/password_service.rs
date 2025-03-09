use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
pub struct PasswordService;

impl PasswordService {
    // src/utils/mod.rs

    /// Hashes a password using Argon2.
    ///
    /// # Arguments
    /// * `password` - The plaintext password to hash.
    ///
    /// # Returns
    /// A `Result` containing the hashed password as a `String` or an error.
    pub fn hash_password(password: &str) -> String {
        // Generate a random salt
        let salt = SaltString::generate(&mut OsRng);

        // Configure Argon2
        let argon2 = Argon2::default();

        // Hash the password
        let password_hash = argon2
            .hash_password(password.as_bytes(), &salt)
            .unwrap()
            .to_string();
        password_hash
    }

    /// Verifies a password against a hash.
    ///
    /// # Arguments
    /// * `password` - The plaintext password to verify.
    /// * `hash` - The hashed password to compare against.
    ///
    /// # Returns
    /// A `Result` containing `true` if the password matches the hash, or an error.
    pub fn verify_password(password: &str, hash: &str) -> bool {
        // Parse the hash into a `PasswordHash` struct
        let parsed_hash = PasswordHash::new(hash).unwrap();

        // Verify the password
        let argon2 = Argon2::default();
        argon2
            .verify_password(password.as_bytes(), &parsed_hash)
            .is_ok()
    }
}
