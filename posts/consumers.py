import json
from channels.generic.websocket import WebsocketConsumer
from django.shortcuts import get_object_or_404
from .models import Post



class LikeConsumer(WebsocketConsumer):
  def connect(self): 
      self.accept()
      print('You are connected!')

      # self.send(text_data= json.dumps({
      #   'type': 'youre connected'
      # }))

  def receive(self, text_data):
      data = json.loads(text_data)
      post_id = data['likeId']
      user = self.scope['user']

      liked_post = get_object_or_404(Post, pk= post_id)
      liked = liked_post.likes.filter(id= user.id).exists()
      if liked:
          liked_post.likes.remove(user)
      else:
          liked_post.likes.add(user)
      
      total_likes = liked_post.likes.count()
      self.send(text_data= json.dumps({
        'total_likes': total_likes 
      }))
      