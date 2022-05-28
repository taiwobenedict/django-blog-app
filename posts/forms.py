from django import forms
from django.forms import widgets
from .models import Comment, Post, Profile, Message



class ProfileForm (forms.ModelForm):
  class Meta:
    model = Profile
    exclude = ['owner','username']


class PostForm(forms.ModelForm):
  class Meta:
    model = Post
    exclude = ['likes']
    widgets = {
      'owner': widgets.HiddenInput()
    }


  
class CommentForm(forms.ModelForm):
  class Meta:
    model = Comment
    fields = ['body']

class MessageForm(forms.ModelForm):
  class Meta:
    model = Message
    fields = ['message']


