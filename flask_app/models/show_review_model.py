from flask_app.config.mysqlconnection import connectToMySQL

class ShowReview:
    def __init__( self , data ):
        self.id = data['id']
        self.content = data['content']
        self.rating = data['rating']
        self.show_id = data['show_id']
        self.reviewer = data['reviewer']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def get_all(cls, data):
        query = "SELECT * FROM show_reviews WHERE show_id=%(show_id)s ORDER BY rating DESC;"
        results = connectToMySQL('the-critic').query_db(query, data)

        show_reviews = []
        for row in results:
            show_reviews.append(cls(row))
        return show_reviews
    
    @classmethod
    def save(cls, data):
        query = """
            INSERT INTO show_reviews (content, rating, show_id, reviewer, created_at, updated_at) 
            VALUES (%(content)s, %(rating)s, %(show_id)s, %(reviewer)s, NOW(), NOW());
        """
        return connectToMySQL('the-critic').query_db(query, data)
