from flask import Flask, render_template, request, redirect
from flask_app import app

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/episodes/<int:id>")
def view_episode(id):
    # We pass the id to our 'view_episode' page and then only use it to fetch the correct API data
    return render_template("view_episode.html", episode_id=id)