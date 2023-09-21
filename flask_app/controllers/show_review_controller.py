from flask import Flask, render_template, request, redirect
from flask_app import app
from flask_app.models.show_review_model import ShowReview
    
@app.route("/shows/<int:id>/reviews", methods=['GET', 'POST'])
def view_show_reviews(id):
    if request.method == 'GET':
        return render_template("show_review.html", show_id=id, show_reviews=ShowReview.get_all({"show_id": id}))
    
    data = {
        'content': request.form['content'],
        'rating': request.form['rating'],
        'show_id': id,
        'reviewer': request.form['reviewer'],
    }
    ShowReview.save(data)

    return redirect(f"/shows/{id}/reviews")