from flask import Flask, render_template, request, redirect
from flask_app import app
from flask_app.models.episode_review_model import EpisodeReview
    
@app.route("/episodes/<int:id>/reviews", methods=['GET', 'POST'])
def view_episode_reviews(id):
    if request.method == 'GET':
        return render_template("episode_review.html", episode_id=id, episode_reviews=EpisodeReview.get_all({"episode_id": id}))
    
    data = {
        'content': request.form['content'],
        'rating': request.form['rating'],
        'episode_id': id,
        'reviewer': request.form['reviewer'],
    }
    EpisodeReview.save(data)

    return redirect(f"/episodes/{id}/reviews")