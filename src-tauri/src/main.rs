mod player;
mod cmd;

use tauri::Manager;
use std::sync::Arc;

fn main() {
    tauri::Builder::default()
        .manage(cmd::AppState {
            player: Arc::new(player::AudioPlayer::new()),
        })
        .invoke_handler(tauri::generate_handler![
            cmd::load_audio,
            cmd::play_audio
        ])
        .run(tauri::generate_context!())
        .expect("SOFIANOS error");
}
