// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::generate_handler;

#[tauri::command]
fn say_name(name: String) -> String {
  format!("Your name is {name}")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![say_name])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
