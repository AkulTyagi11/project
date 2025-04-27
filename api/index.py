from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from datetime import datetime
import uuid
import sys
import importlib.util

# Import the AITaskTrackerBot class from main.py
spec = importlib.util.spec_from_file_location("main", "main.py")
main_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(main_module)
AITaskTrackerBot = main_module.AITaskTrackerBot

# Create task_data directory if it doesn't exist
os.makedirs("task_data", exist_ok=True)

app = Flask(__name__)
CORS(app)  # Enable CORS

bot = AITaskTrackerBot()

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    if not user_message:
        return jsonify({"response": "No message provided"}), 400

    response = bot.ask(user_message)
    return jsonify({"response": response})

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    status = request.args.get("status")
    priority = request.args.get("priority")
    
    tasks = bot.tasks
    if status:
        tasks = {k: v for k, v in tasks.items() if v["status"] == status}
    if priority:
        tasks = {k: v for k, v in tasks.items() if v.get("priority") == priority}
        
    return jsonify(tasks)

@app.route("/api/tasks/<task_id>", methods=["GET"])
def get_task(task_id):
    if task_id not in bot.tasks:
        return jsonify({"error": "Task not found"}), 404
    return jsonify(bot.tasks[task_id])

@app.route("/api/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    if task_id not in bot.tasks:
        return jsonify({"error": "Task not found"}), 404
        
    data = request.get_json()
    status = data.get("status")
    progress = data.get("progress")
    note = data.get("note")
    
    bot.update_task(task_id, status, progress, note)
    return jsonify({"task": bot.tasks[task_id]})

@app.route("/api/fetch-email-tasks", methods=["POST"])
def fetch_email_tasks():
    result = bot.fetch_tasks_from_email()
    return jsonify({"message": result})

# For Vercel serverless function
handler = app