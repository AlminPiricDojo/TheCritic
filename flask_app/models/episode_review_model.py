from flask_app.config.mysqlconnection import connectToMySQL

class EpisodeReview:
    def __init__( self , data ):
        self.id = data['id']
        self.content = data['content']
        self.rating = data['rating']
        self.episode_id = data['episode_id']
        self.reviewer = data['reviewer']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def get_all(cls, data):
        query = "SELECT * FROM episode_reviews WHERE episode_id=%(episode_id)s"
        results = connectToMySQL('the-critic').query_db(query, data)

        episode_reviews = []
        for row in results:
            episode_reviews.append(cls(row))
        return episode_reviews
    
    @classmethod
    def save(cls, data):
        query = """
            INSERT INTO episode_reviews (content, rating, episode_id, reviewer, created_at, updated_at) 
            VALUES (%(content)s, %(rating)s, %(episode_id)s, %(reviewer)s, NOW(), NOW());
        """
        return connectToMySQL('the-critic').query_db(query, data)