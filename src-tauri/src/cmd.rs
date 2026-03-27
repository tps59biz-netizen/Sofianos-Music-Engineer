use tauri::State;
use std::sync::Arc;
use crate::player::AudioPlayer;

pub struct AppState {
    pub player: Arc<AudioPlayer>,
}

#[tauri::command]
pub fn load_audio(data: Vec<u8>, state: State<AppState>) -> Result<(), String> {
    let player = state.player.clone();
    player.load_and_play(data)
}

#[tauri::command]
pub fn play_audio() {
    // Play button
}
