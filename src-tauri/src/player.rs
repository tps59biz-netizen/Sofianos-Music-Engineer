use symphonia::core::audio::SampleFormat;
use symphonia::core::probe::Hint;
use symphonia::default::get_probe;
use cpal::traits::{DeviceTrait, HostTrait};
use std::sync::Arc;
use std::io::Cursor;

pub struct AudioPlayer {
    stream: Option<cpal::Stream>,
}

impl AudioPlayer {
    pub fn new() -> Self {
        Self { stream: None }
    }
    
    pub fn load_and_play(&mut self, data: Vec<u8>) -> Result<(), String> {
        // Test: makes a simple beep sound
        let host = cpal::default_host();
        let device = host.default_output_device().ok_or("no device".to_string())?;
        let config = device.default_output_config().map_err(|e| e.to_string())?;
        
        let stream = device.build_output_stream(
            &config.into(),
            |data: &mut [f32], _| {
                for sample in data.iter_mut() {
                    *sample = 0.3; // Beep tone
                }
            },
            |err| eprintln!("audio err: {:?}", err),
            None,
        ).map_err(|e| e.to_string())?;
        
        stream.play().map_err(|e| e.to_string())?;
        self.stream = Some(stream);
        Ok(())
    }
}
